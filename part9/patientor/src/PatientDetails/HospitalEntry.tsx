import { HospitalEntry as HospitalEntryType, Diagnosis } from '../types';

import Accordion from '@mui/material/Accordion';
import AccordionSummary from '@mui/material/AccordionSummary';
import AccordionDetails from '@mui/material/AccordionDetails';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import Typography from '@mui/material/Typography';
import LocalHospitalIcon from '@mui/icons-material/LocalHospital';

interface Props {
  entry: HospitalEntryType;
  diagnoses: { [code: string]: Diagnosis };
}

const HospitalEntry = ({ entry, diagnoses }: Props) => {
  return (
    <>
      <Accordion>
        <AccordionSummary
          expandIcon={<ExpandMoreIcon />}
          aria-controls='panel1a-content'
          id='panel1a-header'>
          <Typography>
            {entry.date} <LocalHospitalIcon />
          </Typography>
        </AccordionSummary>
        <AccordionDetails>
          <Typography>{entry.description}</Typography>
          <Typography> diagnose by {entry.specialist}</Typography>
        </AccordionDetails>
        <Accordion>
          <AccordionSummary
            expandIcon={<ExpandMoreIcon />}
            aria-controls='panel1a-content'
            id='panel1a-header'>
            <Typography>DIagnoses</Typography>
          </AccordionSummary>
          <AccordionDetails>
            {entry.diagnosisCodes?.map((code) => (
              <ul key={code}>
                <li>{diagnoses[code]?.name} </li>
              </ul>
            ))}
            <Typography>Description: {entry.description}</Typography>
          </AccordionDetails>
        </Accordion>
        <Accordion>
          <AccordionSummary
            expandIcon={<ExpandMoreIcon />}
            aria-controls='panel1a-content'
            id='panel1a-header'>
            <Typography>Discharge</Typography>
          </AccordionSummary>
          <AccordionDetails>
            <Typography> Date: {entry.discharge.date}</Typography>
            <Typography>Criteria: {entry.discharge.criteria}</Typography>
          </AccordionDetails>
        </Accordion>
      </Accordion>
    </>
  );
};

export default HospitalEntry;
