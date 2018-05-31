import {Action} from '@ngrx/store';
import {Profile} from '../../shared/models/profile.model';

export const TRY_SIGNUP = 'TRY_SIGNUP';
export const SIGNUP = 'SIGNUP';
export const TRY_SIGNIN = 'TRY_SIGNIN';
export const SIGNIN = 'SIGNIN';
export const LOGOUT = 'LOGOUT';
export const SET_TOKEN = 'SET_TOKEN';
export const GET_PROFILE = 'GET_PROFILE';
export const HAS_VALID_TOKEN = 'HAS_VALID_TOKEN';
export const SIGNUP_FAILURE = 'SIGNUP_FAILURE';
export const SIGNIN_FAILURE = 'SIGNIN_FAILURE';

export class TrySignup implements Action {
  readonly type = TRY_SIGNUP;

  constructor(public payload: {username: string, password: string, confirm_password: string}) {}
}

export class TrySignin implements Action {
  readonly type = TRY_SIGNIN;

  constructor(public payload: {username: string, password: string}) {}
}

export class Signup implements Action {
  readonly type = SIGNUP;
}

export class Signin implements Action {
  readonly type = SIGNIN;
}

export class Logout implements Action {
  readonly type = LOGOUT;
}

export class SetToken implements Action {
  readonly type = SET_TOKEN;

  constructor(public payload: string) {}
}

export class GetProfile implements Action {
  readonly type = GET_PROFILE;

  constructor(public payload: Profile) {}
}

export class HasValidToken implements Action {
  readonly type = HAS_VALID_TOKEN;
}

export class SignupFailure implements Action {
  readonly type = SIGNUP_FAILURE;

  constructor(public payload: any) {}
}

export class SigninFailure implements Action {
  readonly type = SIGNIN_FAILURE;

  constructor(public payload: any) {}

}

export type AuthActions = Signup | Signin | Logout | SetToken | TrySignup | TrySignin | GetProfile | HasValidToken
  | SigninFailure | SignupFailure;
