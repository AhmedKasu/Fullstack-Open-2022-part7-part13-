import React from 'react';
import { useParams } from 'react-router-dom';
import axios from 'axios';
import { apiBaseUrl } from '../constants';
import { useStateValue, setPatientDetails, addEntry } from '../state';
import { Entry, PatientInfo, EntryFormValues } from '../types';

import GenderIcons from '../components/GenderIcons';
import Entries from './Entries';

import Card from '@mui/material/Card';
import CardActions from '@mui/material/CardActions';
import CardContent from '@mui/material/CardContent';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import { isFetched } from '../utils/patientDetailsHelper';

import AddEntryModal from '../AddEntryModal';
import { valuesToSubmit } from '../utils/addEntryFormHelper';

const PatientDetails = () => {
  const [{ patients }, dispatch] = useStateValue();
  const [modalOpen, setModalOpen] = React.useState<boolean>(false);
  const [error, setError] = React.useState<string>();
  const { id } = useParams<{ id: string }>();

  if (!id) return null;
  const patient = patients[id];

  React.useEffect(() => {
    const getPatientDetails = async (id: string) => {
      try {
        const { data: patientDetails } = await axios.get<PatientInfo>(
          `${apiBaseUrl}/patients/${id}`
        );
        dispatch(setPatientDetails(patientDetails));
        console.log('patient details fetched');
      } catch (e) {
        console.error(e);
      }
    };
    if (patient && !isFetched(patient)) void getPatientDetails(id);
  }, [id, patient, dispatch]);

  const openModal = (): void => setModalOpen(true);
  const closeModal = (): void => {
    setModalOpen(false);
  };

  const submitNewEntry = async (values: EntryFormValues) => {
    const newValues = valuesToSubmit(values);
    console.log('submitting new entry', newValues);

    try {
      const { data: newEntry } = await axios.post<Entry>(
        `${apiBaseUrl}/patients/${id}/entries`,
        newValues
      );
      const updatedEntries = patient.entries
        ? patient.entries.concat(newEntry)
        : [newEntry];
      dispatch(addEntry(updatedEntries, id));
      closeModal();
    } catch (e: unknown) {
      if (axios.isAxiosError(e)) {
        console.error(e?.response?.data || 'Unrecognized axios error');
        setError(
          String(e?.response?.data?.error) || 'Unrecognized axios error'
        );
      } else {
        console.error('Unknown error', e);
        setError('Unknown error');
      }
    }
  };

  if (
    !patients ||
    (Object.keys(patients).length === 0 && patients.constructor === Object) ||
    !isFetched(patient)
  )
    return null;

  return (
    <>
      <Card sx={{ minWidth: 275, marginTop: '2em' }}>
        <CardContent>
          <Typography variant='h5' component='div'>
            {patient.name} <GenderIcons patient={patient} />
          </Typography>

          <Typography style={{ marginTop: '1em' }} variant='body2'>
            ssn: {patient.ssn}
          </Typography>

          <Typography style={{ marginBottom: '1em' }} variant='body2'>
            {' '}
            occupation: {patient.occupation}
          </Typography>
        </CardContent>
      </Card>
      <Card sx={{ minWidth: 275, marginTop: '2em' }}>
        <CardContent>
          <Typography
            style={{ marginBottom: '0.5em' }}
            variant='h6'
            component='div'>
            Entries
          </Typography>
          <Entries entries={patient.entries} />
        </CardContent>
      </Card>
      <Card sx={{ minWidth: 275, marginTop: '2em' }}>
        <CardActions>
          <AddEntryModal
            modalOpen={modalOpen}
            onSubmit={submitNewEntry}
            onClose={closeModal}
            error={error}
          />
          <Button variant='contained' onClick={() => openModal()}>
            Add new entry
          </Button>
        </CardActions>
      </Card>
    </>
  );
};

export default PatientDetails;
