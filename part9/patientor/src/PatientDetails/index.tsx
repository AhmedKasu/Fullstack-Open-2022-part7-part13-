import React from 'react';
import { useParams } from 'react-router-dom';
import axios from 'axios';
import { apiBaseUrl } from '../constants';
import { useStateValue, setPatientDetails } from '../state';
import { PatientInfo } from '../types';

import GenderIcons from '../components/GenderIcons';
import Entries from './Entries';

import Card from '@mui/material/Card';
import CardActions from '@mui/material/CardActions';
import CardContent from '@mui/material/CardContent';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import { isFetched } from '../utils/patientDetailsHelper';

const PatientDetails = () => {
  const [{ patients }, dispatch] = useStateValue();
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
          {patient.entries.length < 1
            ? 'No available entries'
            : patient.entries.map((entry) => (
                <Entries key={entry.id} entry={entry} />
              ))}
        </CardContent>
      </Card>
      <Card sx={{ minWidth: 275, marginTop: '2em' }}>
        <CardActions>
          <Button variant='contained'>Add new entry</Button>
        </CardActions>
      </Card>
    </>
  );
};

export default PatientDetails;
