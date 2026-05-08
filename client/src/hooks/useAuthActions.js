import { useContext } from "react";
import { AuthContext } from "../contexts/AuthContext";
import {
  getLoginStart,
  getLoginSuccess,
  getLoginError,
  loginStart,
  loginSuccess,
  loginError,
  verifyStart,
  verifySuccess,
  verifyError,
  getAuthFromLocalStorage,
  getVerifyStart,
  getVerifyError,
  getVerifySuccess,
} from "../state/actions/authActions";
import { useAxios } from "./useAxios";

const ACCESS_TOKEN_KEY = "e-commerce-access-token-key";
const EMAIL_KEY = "e-commerce-email-key";

export function useAuthActions() {
  const { dispatch } = useContext(AuthContext);
  const { sendRequest } = useAxios();

  async function getLogin() {
    dispatch(getLoginStart());

    const { data, error } = await sendRequest("GET", null, "/api/auth/login");

    if (error) {
      dispatch(getLoginError(error));
      return;
    }

    dispatch(getLoginSuccess(data.data));
  }

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

  async function getVerifyEmail() {
    dispatch(getVerifyStart());

    const { data, error } = await sendRequest(
      "GET",
      null,
      "/api/auth/verify-email",
    );

    if (error) {
      dispatch(getVerifyError(error));
      return;
    }

    dispatch(getVerifySuccess(data.data));
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

    dispatch(
      verifySuccess({
        accessToken: data.data.accessToken,
      }),
    );
  }

  function getAuthFromLocal() {
    const userAuthCredentials = {
      email: localStorage.getItem(EMAIL_KEY),
      accessToken: localStorage.getItem(ACCESS_TOKEN_KEY),
    };

    if (
      !userAuthCredentials ||
      !userAuthCredentials.email ||
      !userAuthCredentials.accessToken
    )
      return;

    dispatch(getAuthFromLocalStorage(userAuthCredentials));
  }

  return { getLogin, loginUser, getVerifyEmail, verifyUser, getAuthFromLocal };
}
