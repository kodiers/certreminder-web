import * as UserCertActions from './user-certifications.actions';
import {UserCertification} from '../models/user-certification.model';
import {Vendor} from '../../shared/models/vendor.model';
import {UserExam} from '../models/user-exam.model';


export interface CertState {
  userCertifications: [UserCertification],
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
    default:
      return state;
  }
}
