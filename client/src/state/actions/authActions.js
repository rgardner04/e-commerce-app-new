import {
  GET_LOGIN_START,
  GET_LOGIN_SUCCESS,
  GET_LOGIN_ERROR,
  LOGIN_START,
  LOGIN_SUCCESS,
  LOGIN_ERROR,
  GET_VERIFY_START,
  GET_VERIFY_SUCCESS,
  GET_VERIFY_ERROR,
  VERIFY_START,
  VERIFY_SUCCESS,
  VERIFY_ERROR,
  GET_AUTH_FROM_LOCAL_STORAGE,
} from "../types/authTypes";

export function getLoginStart() {
  return {
    type: GET_LOGIN_START,
    payload: {},
  };
}

export function getLoginSuccess(loginData) {
  return {
    type: GET_LOGIN_SUCCESS,
    payload: loginData,
  };
}

export function getLoginError(error) {
  return {
    type: GET_LOGIN_ERROR,
    payload: error,
  };
}

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

export function getVerifyStart() {
  return {
    type: GET_VERIFY_START,
    payload: {},
  };
}

export function getVerifySuccess(verifyEmailData) {
  return {
    type: GET_VERIFY_SUCCESS,
    payload: verifyEmailData,
  };
}

export function getVerifyError(error) {
  return {
    type: GET_VERIFY_ERROR,
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
