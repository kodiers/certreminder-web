import {Profile} from '../../shared/models/profile.model';
import * as AuthActions from './auth.actions';

export interface State {
  token: string;
  authenticated: boolean;
  profile: Profile;
}

const initialState: State = {
  token: null,
  authenticated: false,
  profile: null
};

export function authReducer(state = initialState, action: AuthActions.AuthActions) {
  switch (action.type) {
    case (AuthActions.SIGNUP):
    case (AuthActions.SIGNIN):
      return {
        ...state,
        authenticated: true,
        profile: null
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
    default:
      return state;
  }

}
