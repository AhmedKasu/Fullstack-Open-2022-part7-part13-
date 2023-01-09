import { Diagnosis } from '../types';
import diagnosesData from '../../data/diagnoses.json';

const getDiagnoses = (): Diagnosis[] => {
  return diagnosesData;
};

export default { getDiagnoses };
