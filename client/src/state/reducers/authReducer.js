import {
  LOGIN_START,
  LOGIN_SUCCESS,
  LOGIN_ERROR,
  VERIFY_START,
  VERIFY_SUCCESS,
  VERIFY_ERROR,
  GET_AUTH_FROM_LOCAL_STORAGE,
} from "../types/authTypes";

export const initialState = {
  accessToken: null,
  refreshToken: null,
  email: null,
  loading: false,
  error: null,
};

export function reducer(state, action) {
  switch (action.type) {
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
    case VERIFY_START:
      return {
        ...state,
        loading: true,
        error: null,
        accessToken: null,
        refreshToken: null,
      };
    case VERIFY_SUCCESS:
      return {
        ...state,
        loading: false,
        error: null,
        accessToken: action.payload.accessToken,
        refreshToken: action.payload.refreshToken,
      };
    case VERIFY_ERROR:
      return {
        ...state,
        loading: false,
        error: action.payload,
        accessToken: null,
        refreshToken: null,
      };
    case GET_AUTH_FROM_LOCAL_STORAGE:
      return {
        ...state,
        loading: false,
        error: false,
        email: action.payload.email,
        accessToken: action.payload.accessToken,
        refreshToken: action.payload.refreshToken,
      };
    default:
      return state;
  }
}
