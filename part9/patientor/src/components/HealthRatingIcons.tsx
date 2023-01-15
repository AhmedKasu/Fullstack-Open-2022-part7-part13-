import { HealthCheckRating } from '../types';
import FavoriteIcon from '@mui/icons-material/Favorite';

import assertNever from '../utils/exhaustiveTypeHelper';

interface Props {
  rating: HealthCheckRating;
}

const HealthRatingIcons = ({ rating }: Props) => {
  switch (rating) {
    case HealthCheckRating.Healthy:
      return <FavoriteIcon color='success' />;
    case HealthCheckRating.LowRisk:
      return <FavoriteIcon style={{ color: 'yellowgreen' }} />;
    case HealthCheckRating.HighRisk:
      return <FavoriteIcon style={{ color: 'yellow' }} />;
    case HealthCheckRating.CriticalRisk:
      return <FavoriteIcon color='error' />;
    default:
      return assertNever(rating);
  }
};

export default HealthRatingIcons;
