import React from 'react';
import axios from 'axios';
import { apiBaseUrl } from '../constants';
import { Entry, Diagnosis } from '../types';
import { useStateValue, setDiagnoses } from '../state';

import HealthCheckEntry from './HealthCheckEntry';
import HospitalEntry from './HospitalEntry';
import OccupationalHealthcareEntry from './OccupationalHealthcareEntry';

import assertNever from '../utils/exhaustiveTypeHelper';
interface Props {
  entry: Entry;
}

const Entries = ({ entry }: Props) => {
  const [{ diagnoses }, dispatch] = useStateValue();

  React.useEffect(() => {
    const getDiagnoses = async () => {
      try {
        const { data: diagnoses } = await axios.get<Diagnosis[]>(
          `${apiBaseUrl}/diagnoses`
        );

        dispatch(setDiagnoses(diagnoses));
        console.log('diagnoses fetched');
      } catch (e) {
        console.error(e);
      }
    };
    if (Object.keys(diagnoses).length === 0) void getDiagnoses();
  }, [dispatch]);

  switch (entry?.type) {
    case 'HealthCheck':
      return <HealthCheckEntry entry={entry} />;
    case 'Hospital':
      return <HospitalEntry entry={entry} diagnoses={diagnoses} />;
    case 'OccupationalHealthcare':
      return (
        <OccupationalHealthcareEntry entry={entry} diagnoses={diagnoses} />
      );
    default:
      return assertNever(entry);
  }
};

export default Entries;
