import { useContext } from "react";
import { AuthContext } from "../contexts/AuthContext";
import {
  loginStart,
  loginSuccess,
  loginError,
  verifyStart,
  verifySuccess,
  verifyError,
  getAuthFromLocalStorage,
} from "../state/actions/authActions";
import { useAxios } from "./useAxios";

const ACCESS_TOKEN_KEY = "e-commerce-access-token-key";
const REFRESH_TOKEN_KEY = "e-commerce-refresh-token-key";
const EMAIL_KEY = "e-commerce-email-key";

export function useAuthActions() {
  const { dispatch } = useContext(AuthContext);
  const { sendRequest } = useAxios();

  async function loginUser({ email, password }) {
    dispatch(loginStart());

    const { _, error } = await sendRequest(
      "POST",
      { email, password },
      "/api/auth/login",
    );

    if (error) {
      dispatch(loginError(error));
      return;
    }

    localStorage.setItem(EMAIL_KEY, email);

    dispatch(
      loginSuccess({
        email,
      }),
    );
  }

  async function verifyUser({ email, verificationCode }) {
    dispatch(verifyStart());
    const { data, error } = await sendRequest(
      "POST",
      { email, verificationCode },
      "/api/auth/verify-email",
    );

    if (error) {
      dispatch(verifyError(error));
      return;
    }

    localStorage.setItem(ACCESS_TOKEN_KEY, data.data.accessToken);
    localStorage.setItem(REFRESH_TOKEN_KEY, data.data.refreshToken);

    dispatch(
      verifySuccess({
        accessToken: data.data.accessToken,
        refreshToken: data.data.refreshToken,
      }),
    );
  }

  function getAuthFromLocal() {
    const userAuthCredentials = {
      email: localStorage.getItem(EMAIL_KEY),
      accessToken: localStorage.getItem(ACCESS_TOKEN_KEY),
      refreshToken: localStorage.getItem(REFRESH_TOKEN_KEY),
    };

    if (
      !userAuthCredentials ||
      !userAuthCredentials.email ||
      !userAuthCredentials.accessToken ||
      !userAuthCredentials.refreshToken
    )
      return;

    dispatch(getAuthFromLocalStorage(userAuthCredentials));
  }

  return { loginUser, verifyUser, getAuthFromLocal };
}
