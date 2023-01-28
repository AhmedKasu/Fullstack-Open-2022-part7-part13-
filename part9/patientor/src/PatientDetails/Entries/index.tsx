import React from 'react';
import axios from 'axios';
import { apiBaseUrl } from '../../constants';
import { Entry, Diagnosis, EntryType } from '../../types';
import { useStateValue, setDiagnoses } from '../../state';

import HealthCheckEntry from './HealthCheckEntry';
import HospitalEntry from './HospitalEntry';
import OccupationalHealthcareEntry from './OccupationalHealthcareEntry';

import assertNever from '../../utils/exhaustiveTypeHelper';
interface Props {
  entries: Entry[];
}

const Entries = ({ entries }: Props) => {
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

  if (entries.length > 0) {
    return (
      <>
        {entries.map((entry) => {
          switch (entry?.type) {
            case EntryType.HealthCheck:
              return <HealthCheckEntry key={entry.id} entry={entry} />;
            case EntryType.Hospital:
              return (
                <HospitalEntry
                  key={entry.id}
                  entry={entry}
                  diagnoses={diagnoses}
                />
              );
            case EntryType.OccupationalHealthcare:
              return (
                <OccupationalHealthcareEntry
                  key={entry.id}
                  entry={entry}
                  diagnoses={diagnoses}
                />
              );
            default:
              return assertNever(entry);
          }
        })}
      </>
    );
  } else {
    return <>No available entries</>;
  }
};

export default Entries;
