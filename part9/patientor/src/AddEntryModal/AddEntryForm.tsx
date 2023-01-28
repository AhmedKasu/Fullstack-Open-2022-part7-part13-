import React from 'react';
import { Grid, Button } from '@material-ui/core';
import { Field, Formik, Form } from 'formik';

import {
  TextField,
  SelectField,
  TypeOption,
  RatingOption,
  DiagnosisSelection,
} from '../AddEntryModal/EntryFormField';
import { EntryType, HealthCheckRating, EntryFormValues } from '../types';
import { useStateValue } from '../state';
import { FormError, validateEntryInputs } from '../utils/addEntryFormHelper';

interface Props {
  onSubmit: (values: EntryFormValues) => void;
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
        healthCheckRating: 0,
        type: EntryType.HealthCheck,
        discharge: {
          date: '',
          criteria: '',
        },
        employerName: '',
        sickLeave: {
          startDate: '',
          endDate: '',
        },
      }}
      onSubmit={onSubmit}
      validate={(values): FormError => validateEntryInputs(values)}>
      {({ isValid, dirty, setFieldValue, setFieldTouched, values }) => {
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
            <DiagnosisSelection
              setFieldValue={setFieldValue}
              setFieldTouched={setFieldTouched}
              diagnoses={Object.values(diagnoses)}
            />
            <SelectField label='Entry type' name='type' options={typeOptions} />
            {values.type === EntryType.HealthCheck && (
              <SelectField
                label='Rating'
                name='healthCheckRating'
                options={ratingOptions}
              />
            )}

            {values.type === EntryType.Hospital && (
              <>
                <Field
                  label='Discharge Date'
                  placeholder='YYYY-MM-DD'
                  name='discharge.date'
                  component={TextField}
                />
                <Field
                  label='Discharge Criteria'
                  placeholder='Must have atleast 5 characters'
                  name='discharge.criteria'
                  component={TextField}
                />
              </>
            )}
            {values.type === EntryType.OccupationalHealthcare && (
              <>
                <Field
                  label='Employer Name'
                  placeholder='Employer name'
                  name='employerName'
                  component={TextField}
                />
                <Field
                  label='Sick Leave Start Date'
                  placeholder='YYYY-MM-DD'
                  name='sickLeave.startDate'
                  component={TextField}
                />
                <Field
                  label='Sick Leave End Date'
                  placeholder='YYYY-MM-DD'
                  name='sickLeave.endDate'
                  component={TextField}
                />
              </>
            )}
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
