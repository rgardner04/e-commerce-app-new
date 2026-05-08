import {
  LOGIN_START,
  LOGIN_SUCCESS,
  LOGIN_ERROR,
  VERIFY_START,
  VERIFY_SUCCESS,
  VERIFY_ERROR,
  GET_AUTH_FROM_LOCAL_STORAGE,
} from "../types/authTypes";

export function loginStart() {
  return {
    type: LOGIN_START,
    payload: {},
  };
}

export function loginSuccess({ email }) {
  return {
    type: LOGIN_SUCCESS,
    payload: { email },
  };
}

export function loginError(error) {
  return {
    type: LOGIN_ERROR,
    payload: error,
  };
}

export function verifyStart() {
  return {
    type: VERIFY_START,
    payload: {},
  };
}

export function verifySuccess({ accessToken, refreshToken }) {
  return {
    type: VERIFY_SUCCESS,
    payload: { accessToken, refreshToken },
  };
}

export function verifyError(error) {
  return {
    type: VERIFY_ERROR,
    payload: error,
  };
}

export function getAuthFromLocalStorage(userAuthCredentials) {
  return {
    type: GET_AUTH_FROM_LOCAL_STORAGE,
    payload: userAuthCredentials,
  };
}
