import * as UserCertActions from './user-certifications.actions';
import {UserCertification} from '../models/user-certification.model';

export interface State {
  userCertifications: [UserCertification],
  errorMessage: any
}

const initialState: State = {
  userCertifications: null,
  errorMessage: null
};

export function userCertReducer(state = initialState, action: UserCertActions.UserCertActions) {
  switch (action.type) {
    case (UserCertActions.GET_ALL_USER_CERTS):
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
      }
  }
}
