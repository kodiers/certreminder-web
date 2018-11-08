import * as UserCertActions from './user-certifications.actions';
import {UserCertification} from '../models/user-certification.model';
import {Vendor} from '../../shared/models/vendor.model';
import {UserExam} from '../models/user-exam.model';
import {deleteItemFromArray} from '../../shared/helpers/functions';


export interface CertState {
  userCertifications: UserCertification[],
  errorMessage: string,
  vendors: Vendor[],
  choosedUserCertification: UserCertification,
  choosedUserCertExams: UserExam[]
}

const initialCertState: CertState = {
  userCertifications: null,
  errorMessage: null,
  vendors: null,
  choosedUserCertification: null,
  choosedUserCertExams: null
};

export function userCertReducer(state = initialCertState, action: UserCertActions.UserCertActions) {
  switch (action.type) {
    case (UserCertActions.SET_ALL_USER_CERTS):
      return {
        ...state,
        userCertifications: action.payload,
        errorMessage: null
      };
    case (UserCertActions.GET_ALL_USER_CERTS_FAILED):
      return {
        ...state,
        userCertifications: null,
        errorMessage: action.payload
      };
    case (UserCertActions.SET_ALL_VENDORS):
      return {
        ...state,
        vendors: action.payload
      };
    case (UserCertActions.GET_ALL_VENDORS_FAILED):
      return {
        ...state,
        vendors: null,
        errorMessage: action.payload
      };
    case (UserCertActions.CHOOSE_USER_CERTIFICATION):
      return {
        ...state,
        choosedUserCertification: action.payload
      };
    case (UserCertActions.GET_CHOOSED_USER_CERT_EXAMS_FAILED):
      return {
        ...state,
        errorMessage: action.payload
      };
    case (UserCertActions.SET_CHOOSED_USER_CERT_EXAMS):
      return {
        ...state,
        choosedUserCertExams: action.payload
      };
    case (UserCertActions.DELETE_USER_CERT):
      const userCerts = deleteItemFromArray(state.userCertifications, action.payload) as UserCertification[];
      return {
        ...state,
        choosedUserCertification: null,
        userCertifications: userCerts
      };
    case (UserCertActions.DELETE_USER_CERT_EXAM):
      const choosedCertExams = deleteItemFromArray(state.choosedUserCertExams, action.payload) as UserExam[];
      return {
        ...state,
        choosedUserCertExams: choosedCertExams
      };
    case (UserCertActions.UPDATE_USER_EXAM):
      const exams = state.choosedUserCertExams.slice();
      const examIndex = exams.findIndex(exam => exam.id === action.payload.id);
      exams[examIndex] = action.payload;
      return {
        ...state,
        choosedUserCertExams: exams
      };
    case (UserCertActions.START_ADD_NEW_CERT):
      return {
        ...state,
        choosedUserCertification: null,
        choosedUserCertExams: null
      };
    case (UserCertActions.ADD_NEW_USER_EXAM):
      let userExams = state.choosedUserCertExams.slice();
      userExams.push(action.payload);
      return {
        ...state,
        choosedUserCertExams: userExams
      };
    default:
      return state;
  }
}
