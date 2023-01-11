import React from 'react';
import { useParams } from 'react-router-dom';
import axios from 'axios';
import { apiBaseUrl } from '../constants';
import { useStateValue, setPatientDetails } from '../state';
import { Patient, PatientInfo } from '../types';

import GenderIcons from './GenderIcons';
import Entries from './Entries';

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
        console.log('patient details fetched');
      } catch (e) {
        console.error(e);
      }
    };
    if (patient && !isFetched(patient)) void getPatientDetails(id);
  }, [id, patient, dispatch]);

  if (
    !patients ||
    (Object.keys(patients).length === 0 && patients.constructor === Object)
  )
    return null;

  const patientDetails = patients[id] as PatientInfo;
  return (
    <div>
      <h2>
        {patientDetails.name} <GenderIcons patient={patient} />
      </h2>
      <p>ssn: {patientDetails.ssn}</p>
      <p>occupation: {patientDetails.occupation}</p>
      <Entries entries={patientDetails.entries} />
    </div>
  );
};

export default PatientDetails;
