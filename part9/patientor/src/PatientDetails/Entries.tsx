import React from 'react';
import axios from 'axios';
import { apiBaseUrl } from '../constants';
import { Entry, Diagnosis } from '../types';
import { useStateValue, setDiagnoses } from '../state';
interface Props {
  entries: Entry[];
}

const Entries = ({ entries }: Props) => {
  if (!entries) return null;

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
    if (!diagnoses) void getDiagnoses();
  }, [dispatch]);

  const renderEntries = () => {
    return (
      <>
        <p>
          {entry.date} {entry.description}
        </p>
        {entry.diagnosisCodes?.map((dc) => (
          <ul key={dc}>
            <li>
              {dc} {diagnoses[dc]?.name}
            </li>
          </ul>
        ))}
      </>
    );
  };

  const entry = entries[0];

  return (
    <div>
      <h3>entries</h3>
      {entries.length === 0 ? <p> No available entries!</p> : renderEntries()}
    </div>
  );
};

export default Entries;
