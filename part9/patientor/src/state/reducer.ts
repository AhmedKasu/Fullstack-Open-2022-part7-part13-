import { State } from './state';
import { Patient, PatientInfo, Diagnosis, Entry } from '../types';

export type Action =
  | {
      type: 'SET_PATIENT_LIST';
      payload: Patient[];
    }
  | {
      type: 'ADD_PATIENT';
      payload: Patient;
    }
  | {
      type: 'SET_PATIENT_DETAILS';
      payload: PatientInfo;
    }
  | {
      type: 'SET_DIAGNOSES';
      payload: Diagnosis[];
    }
  | {
      type: 'ADD_ENTRY';
      payload: { entry: Entry[]; patientId: string };
    };

export const setPatientList = (patientList: Patient[]): Action => {
  return {
    type: 'SET_PATIENT_LIST',
    payload: patientList,
  };
};

export const addPatient = (patient: Patient): Action => {
  return {
    type: 'ADD_PATIENT',
    payload: patient,
  };
};

export const setPatientDetails = (patient: PatientInfo): Action => {
  return {
    type: 'SET_PATIENT_DETAILS',
    payload: patient,
  };
};

export const setDiagnoses = (diagnoses: Diagnosis[]): Action => {
  return {
    type: 'SET_DIAGNOSES',
    payload: diagnoses,
  };
};

export const addEntry = (entry: Entry[], patientId: string): Action => {
  return {
    type: 'ADD_ENTRY',
    payload: { entry, patientId },
  };
};

export const reducer = (state: State, action: Action): State => {
  switch (action.type) {
    case 'SET_PATIENT_LIST':
      return {
        ...state,
        patients: {
          ...action.payload.reduce(
            (memo, patient) => ({ ...memo, [patient.id]: patient }),
            {}
          ),
          ...state.patients,
        },
      };
    case 'ADD_PATIENT':
      return {
        ...state,
        patients: {
          ...state.patients,
          [action.payload.id]: action.payload,
        },
      };
    case 'SET_PATIENT_DETAILS':
      return {
        ...state,
        patients: {
          ...state.patients,
          [action.payload.id]: action.payload,
        },
      };
    case 'SET_DIAGNOSES':
      return {
        ...state,
        diagnoses: {
          ...action.payload.reduce(
            (memo, diagnosis) => ({ ...memo, [diagnosis.code]: diagnosis }),
            {}
          ),
          ...state.diagnoses,
        },
      };
    case 'ADD_ENTRY':
      return {
        ...state,
        patients: {
          ...state.patients,
          [action.payload.patientId]: {
            ...state.patients[action.payload.patientId],
            entries: action.payload.entry,
          },
        },
      };

    default:
      return state;
  }
};
