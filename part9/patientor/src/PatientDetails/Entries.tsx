import React from 'react';
import { Entry } from '../types';

interface Props {
  entries: Entry[];
}

const Entries = ({ entries }: Props) => {
  if (!entries) return null;

  const renderEntries = () => {
    return (
      <>
        <p>
          {entry.date} {entry.description}
        </p>
        {entry.diagnosisCodes?.map((dc) => (
          <ul key={dc}>
            <li>{dc}</li>
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
