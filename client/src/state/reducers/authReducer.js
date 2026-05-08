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

export const initialState = {
  accessToken: null,
  email: null,
  registerData: null,
  loginData: null,
  verifyEmailData: null,
  loading: false,
  error: null,
};

export function reducer(state, action) {
  switch (action.type) {
    case GET_LOGIN_START:
      return {
        ...state,
        loading: true,
        error: null,
      };
    case GET_LOGIN_SUCCESS:
      return {
        ...state,
        loading: false,
        error: null,
        loginData: action.payload,
      };
    case GET_LOGIN_ERROR:
      return {
        ...state,
        loading: false,
        error: action.payload,
        loginData: null,
      };
    case LOGIN_START:
      return {
        ...state,
        loading: true,
        error: null,
      };
    case LOGIN_SUCCESS:
      return {
        ...state,
        loading: false,
        error: null,
        email: action.payload.email,
      };
    case LOGIN_ERROR:
      return {
        ...state,
        loading: false,
        error: action.payload,
        email: null,
      };
    case GET_VERIFY_START:
      return {
        ...state,
        loading: true,
        error: null,
        verifyEmailData: null,
      };
    case GET_VERIFY_SUCCESS:
      return {
        ...state,
        loading: false,
        error: null,
        verifyEmailData: action.payload,
      };
    case GET_VERIFY_ERROR:
      return {
        ...state,
        loading: false,
        error: action.payload,
        verifyEmailData: null,
      };
    case VERIFY_START:
      return {
        ...state,
        loading: true,
        error: null,
        accessToken: null,
      };
    case VERIFY_SUCCESS:
      return {
        ...state,
        loading: false,
        error: null,
        accessToken: action.payload.accessToken,
      };
    case VERIFY_ERROR:
      return {
        ...state,
        loading: false,
        error: action.payload,
        accessToken: null,
      };
    case GET_AUTH_FROM_LOCAL_STORAGE:
      return {
        ...state,
        loading: false,
        error: false,
        email: action.payload.email,
        accessToken: action.payload.accessToken,
      };
    default:
      return state;
  }
}
