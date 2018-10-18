import {Profile} from '../../shared/models/profile.model';
import * as AuthActions from './auth.actions';

export interface State {
  token: string;
  authenticated: boolean;
  profile: Profile;
  errorMessage: any;
}

export function getInitialAuthState(): State {
  let token = localStorage.getItem('cert_token');
  return {
    token: token,
    authenticated: false,
    profile: null,
    errorMessage: null
  }
}

export function authReducer(state = getInitialAuthState(), action: AuthActions.AuthActions) {
  switch (action.type) {
    case (AuthActions.HAS_VALID_TOKEN):
    case (AuthActions.SIGNUP):
    case (AuthActions.SIGNIN):
      return {
        ...state,
        authenticated: true,
        profile: null,
        errorMessage: null
      };
    case (AuthActions.LOGOUT):
      return {
        ...state,
        authenticated: false,
        token: null,
        profile: null
      };
    case (AuthActions.SET_TOKEN):
      return {
        ...state,
        token: action.payload
      };
    case (AuthActions.GET_PROFILE):
      return {
        ...state,
        profile: action.payload,
        token: action.payload.token
      };
    case (AuthActions.SIGNUP_FAILURE):
      return {
        ...state,
        authenticated: false,
        errorMessage: "Error when register new user"
      };
    case (AuthActions.SIGNIN_FAILURE):
      return {
        ...state,
        authenticated: false,
        errorMessage: "Incorrect login/password"
      };
    case (AuthActions.VERIFY_TOKEN):
      return {
        ...state,
        token: action.payload.token
      };
    default:
      return state;
  }

}
