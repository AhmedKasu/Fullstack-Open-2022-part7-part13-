import {
  OccupationalHealthcareEntry as OccupationalHealthcareEntryType,
  Diagnosis,
} from '../../types';

import Accordion from '@mui/material/Accordion';
import AccordionSummary from '@mui/material/AccordionSummary';
import AccordionDetails from '@mui/material/AccordionDetails';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import Typography from '@mui/material/Typography';
import WorkIcon from '@mui/icons-material/Work';

type Props = {
  entry: OccupationalHealthcareEntryType;
  diagnoses: { [code: string]: Diagnosis };
};

const OccupationalHealthcareEntry = ({ entry, diagnoses }: Props) => {
  return (
    <>
      <Accordion>
        <AccordionSummary
          expandIcon={<ExpandMoreIcon />}
          aria-controls='panel1a-content'
          id='panel1a-header'>
          <Typography>
            {entry.date} <WorkIcon />
          </Typography>
        </AccordionSummary>
        <AccordionDetails>
          <Typography>{entry.description}</Typography>
          <Typography>Employee: {entry.employerName}</Typography>

          <Typography> diagnose by {entry.specialist}</Typography>
        </AccordionDetails>
        <Accordion>
          <AccordionSummary
            expandIcon={<ExpandMoreIcon />}
            aria-controls='panel1a-content'
            id='panel1a-header'>
            <Typography>Diagnoses</Typography>
          </AccordionSummary>
          <AccordionDetails>
            {entry.diagnosisCodes?.map((code) => (
              <ul key={code}>
                <li>{diagnoses[code]?.name} </li>
              </ul>
            ))}
            <Typography></Typography>
            <Typography>Description: {entry.description}</Typography>
          </AccordionDetails>
        </Accordion>
        <Accordion>
          <AccordionSummary
            expandIcon={<ExpandMoreIcon />}
            aria-controls='panel1a-content'
            id='panel1a-header'>
            <Typography>Sick Leave</Typography>
          </AccordionSummary>
          <AccordionDetails>
            <Typography>Start date: {entry.sickLeave?.startDate}</Typography>
            <Typography>End date: {entry.sickLeave?.endDate}</Typography>
          </AccordionDetails>
        </Accordion>
      </Accordion>
    </>
  );
};

export default OccupationalHealthcareEntry;
