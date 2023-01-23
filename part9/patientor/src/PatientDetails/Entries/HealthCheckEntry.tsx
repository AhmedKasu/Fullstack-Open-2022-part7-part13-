import { HealthCheckEntry as HealthCheckEntryType } from '../../types';

import Accordion from '@mui/material/Accordion';
import AccordionSummary from '@mui/material/AccordionSummary';
import AccordionDetails from '@mui/material/AccordionDetails';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import Typography from '@mui/material/Typography';
import MedicalServicesIcon from '@mui/icons-material/MedicalServices';

import HealthRatingIcons from '../../components/HealthRatingIcons';

interface Props {
  entry: HealthCheckEntryType;
}

const HealthCheckEntry = ({ entry }: Props): JSX.Element => {
  return (
    <>
      <Accordion>
        <AccordionSummary
          expandIcon={<ExpandMoreIcon />}
          aria-controls='panel1a-content'
          id='panel1a-header'>
          <Typography>
            {entry.date} <MedicalServicesIcon />
          </Typography>
        </AccordionSummary>
        <AccordionDetails>
          <Typography>{entry.description}</Typography>
          <HealthRatingIcons rating={entry.healthCheckRating} />
          <Typography> diagnose by {entry.specialist}</Typography>
        </AccordionDetails>
      </Accordion>
    </>
  );
};

export default HealthCheckEntry;
