import React from 'react';
import { useParams } from 'react-router-dom';
import axios from 'axios';
import { apiBaseUrl } from '../constants';
import { useStateValue, setPatientDetails } from '../state';
import { Patient, PatientInfo } from '../types';

import { Male, Female } from '@mui/icons-material';

const PatientDetails = () => {
  const [{ patients }, dispatch] = useStateValue();
  const { id } = useParams<{ id: string }>();

  if (!id) return null;
  const patient = patients[id];

  React.useEffect(() => {
    const isFetched = (patient: Patient): patient is PatientInfo => {
      return (
        Object.keys(patient).includes('entries') &&
        Object.keys(patient).includes('ssn')
      );
    };

    const getPatientDetails = async (id: string) => {
      try {
        const { data: patientDetails } = await axios.get<PatientInfo>(
          `${apiBaseUrl}/patients/${id}`
        );
        dispatch(setPatientDetails(patientDetails));
        console.log('patient fetched');
      } catch (e) {
        console.error(e);
      }
    };
    if (patient && !isFetched(patient)) void getPatientDetails(id);
  }, [id, patient, dispatch]);

  const genderIcons = () => {
    const { gender } = patient;
    if (gender === 'male') {
      return <Male />;
    } else if (gender === 'female') {
      return <Female />;
    }
  };

  if (
    !patients ||
    (Object.keys(patients).length === 0 && patients.constructor === Object)
  )
    return null;

  return (
    <div>
      <h2>
        {patient.name} {genderIcons()}
      </h2>
      <p>ssn: {patient.ssn}</p>
      <p>occupation: {patient.occupation}</p>
    </div>
  );
};

export default PatientDetails;
