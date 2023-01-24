import { Grid, Button } from '@material-ui/core';
import { Field, Formik, Form } from 'formik';

import {
  TextField,
  SelectField,
  TypeOption,
  RatingOption,
  DiagnosisSelection,
} from '../AddEntryModal/EntryFormField';
import { Entry, EntryType, HealthCheckRating } from '../types';
import { useStateValue } from '../state';
import { validateHealthCheckEntry } from '../utils/addEntryFormHelper';

export type HealthCheckEntryFormValues = Omit<Entry, 'id'>;

interface Props {
  onSubmit: (values: HealthCheckEntryFormValues) => void;
  onCancel: () => void;
}

const typeOptions: TypeOption[] = [
  { value: EntryType.HealthCheck, label: 'HealthCheck' },
  { value: EntryType.Hospital, label: 'Hospital' },
  { value: EntryType.OccupationalHealthcare, label: 'OccupationalHealthcare' },
];

const ratingOptions: RatingOption[] = [
  { value: HealthCheckRating.Healthy, label: 'Healthy' },
  { value: HealthCheckRating.LowRisk, label: 'LowRisk' },
  { value: HealthCheckRating.HighRisk, label: 'HighRisk' },
  { value: HealthCheckRating.CriticalRisk, label: 'CriticalRisk' },
];

const AddEntryForm = ({ onSubmit, onCancel }: Props) => {
  const [{ diagnoses }] = useStateValue();
  return (
    <Formik
      initialValues={{
        description: '',
        date: '',
        specialist: '',
        diagnosisCodes: [],
        type: EntryType.HealthCheck,
        healthCheckRating: 0,
      }}
      onSubmit={onSubmit}
      validate={(values) => validateHealthCheckEntry(values)}>
      {({ isValid, dirty, setFieldValue, setFieldTouched }) => {
        return (
          <Form className='form ui'>
            <Field
              label='Description'
              placeholder='Must be at least 5 characters'
              name='description'
              component={TextField}
            />
            <Field
              label='Date'
              placeholder='YYYY-MM-DD'
              name='date'
              component={TextField}
            />
            <Field
              label='Specialist'
              placeholder='Must have atleast 3 characters'
              name='specialist'
              component={TextField}
            />
            <SelectField label='Entry type' name='type' options={typeOptions} />
            <SelectField
              label='Rating'
              name='healthCheckRating'
              options={ratingOptions}
            />
            <DiagnosisSelection
              setFieldValue={setFieldValue}
              setFieldTouched={setFieldTouched}
              diagnoses={Object.values(diagnoses)}
            />
            <Grid>
              <Grid item>
                <Button
                  color='secondary'
                  variant='contained'
                  style={{ float: 'left' }}
                  type='button'
                  onClick={onCancel}>
                  Cancel
                </Button>
              </Grid>
              <Grid item>
                <Button
                  style={{
                    float: 'right',
                  }}
                  type='submit'
                  variant='contained'
                  disabled={!dirty || !isValid}>
                  Add
                </Button>
              </Grid>
            </Grid>
          </Form>
        );
      }}
    </Formik>
  );
};

export default AddEntryForm;
