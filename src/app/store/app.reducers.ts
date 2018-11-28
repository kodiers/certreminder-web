import {ActionReducerMap} from '@ngrx/store';

import * as fromAuth from '../auth/store/auth.reducers';
import {authReducer} from '../auth/store/auth.reducers';
import * as fromUserCerts from '../user-certifications/store/user-certifications.reducers';
import {userCertReducer} from '../user-certifications/store/user-certifications.reducers';
import * as fromCerts from '../certifications/store/certifications.reducers';
import {certReducer} from '../certifications/store/certifications.reducers';

export interface AppState {
  auth: fromAuth.State,
  userCerts: fromUserCerts.UserCertState,
  certifications: fromCerts.CertState
}

export const reducers: ActionReducerMap<AppState> = {
  auth: authReducer,
  userCerts: userCertReducer,
  certifications: certReducer
};
