import { call, put, takeEvery } from 'redux-saga/effects';
import * as actions from '../actions/auth';
import * as userActions from '../actions/user';
import * as types from '../constants/actions';
import { push } from 'connected-react-router';
import { logoutUser, loginUser, signupUser } from '../api/auth';
import { fetchUser } from './user';


export function* fetchLogout() {
  try {
    yield call(logoutUser);
    sessionStorage.clear();
    yield put(userActions.resetUser());
  } catch (e) {
    yield put(actions.failLogout('Oups! Error occurs, please try again later.'));
  }
}

export function* fetchLogoutSaga() {
  yield takeEvery(types.FETCH_LOGOUT, fetchLogout);
}


export function* fetchLogin({ payload: { email, password } }) {
  try {
    yield call(loginUser, email, password);
    yield call(fetchUser);
    yield put(push('/wallets'));
  } catch (e) {
    yield put(actions.failLogin('Oops! Error occurred on Sign In, please try again later.'));
  }
}

export function* fetchLoginSaga() {
  yield takeEvery(types.FETCH_LOGIN, fetchLogin);
}

export function* fetchSignup({ payload: { email, password } }) {
  try {
    yield call(signupUser, email, password);
    yield call(fetchUser);
    yield put(push('/wallets'));
  } catch (e) {
    yield put(actions.failLogin('Oops! Error occurred on Sign Up, please try again later.'));
  }
}

export function* fetchSignupSaga() {
  yield takeEvery(types.FETCH_SIGNUP, fetchSignup);
}
