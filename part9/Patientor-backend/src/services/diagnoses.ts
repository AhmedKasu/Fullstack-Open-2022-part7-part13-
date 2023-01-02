import { Diagnose } from '../types';
import diagnosesData from '../../data/diagnoses.json';

const getDiagnoses = (): Diagnose[] => {
  return diagnosesData;
};

export default { getDiagnoses };
