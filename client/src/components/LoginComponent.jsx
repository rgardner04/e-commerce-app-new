import { useState, useEffect } from "react";
import { useAuthActions } from "../hooks/useAuthActions";
import { useNavigate } from "react-router";
import { useAuthContext } from "../contexts/AuthContext";
import styles from "../styles/LoginComponent.module.css";
import { ShoppingCart } from "lucide-react";

export default function LoginComponent() {
  const { getLogin, loginUser } = useAuthActions();
  const [formState, setFormState] = useState({
    email: null,
    password: null,
  });
  const navigate = useNavigate();
  const { state } = useAuthContext();

  function handleLoginFormInput(value, name) {
    setFormState((prev) => {
      return {
        ...prev,
        [name]: value,
      };
    });
  }

  async function handleLoginFormSubmit(e) {
    e.preventDefault();

    if (!formState.email || !formState.password) return;

    await loginUser(formState);
  }

  useEffect(() => {
    if (!state?.email || state?.error) return;

    navigate("/auth/verify-email");
  }, [state?.email, state?.error, navigate]);

  useEffect(() => {
    if (state?.loginData) return;

    getLogin();
  }, [state?.loginData]);

  const emailInputField = state?.loginData?.inputFields["email"] || {};
  const passwordInputField = state?.loginData?.inputFields["password"] || {};

  return (
    <>
      <div className={styles.brandContainer}>
        <ShoppingCart className={styles.brandIcon} />
        <h1 className={styles.brandName}>shoplify</h1>
      </div>
      <form
        className={styles.loginForm}
        onSubmit={(e) => handleLoginFormSubmit(e)}
      >
        <h1 className={styles.loginFormMainHeader}>
          {state?.loginData?.loginFormMainHeader}
        </h1>
        <p className={styles.loginFormSubHeader}>
          {state?.loginData?.loginFormSubHeader}
        </p>
        <label className={styles.loginFormLabel} htmlFor="email">
          {emailInputField.label}
        </label>
        <input
          className={styles.loginFormInput}
          required={emailInputField.required}
          id="email"
          type={emailInputField.type}
          placeholder={emailInputField.placeholder}
          onChange={(e) => handleLoginFormInput(e.target.value, "email")}
        />
        <label className={styles.loginFormLabel} htmlFor="password">
          {passwordInputField.label}
        </label>
        <input
          className={styles.loginFormInput}
          required={passwordInputField.required}
          id="password"
          type={passwordInputField.type}
          placeholder={passwordInputField.placeholder}
          onChange={(e) => handleLoginFormInput(e.target.value, "password")}
        />
        {state?.error && (
          <p className={styles.errorMessage}>
            {state?.error || "An error occurred during login"}
          </p>
        )}
        <button
          className={styles.loginFormButton}
          type="submit"
          disabled={state?.loading}
        >
          {state?.loginData?.loginFormButtonText}
        </button>
      </form>
    </>
  );
}
