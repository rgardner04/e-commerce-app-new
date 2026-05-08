import { useState, useEffect } from "react";
import { useAuthActions } from "../hooks/useAuthActions";
import { useNavigate } from "react-router";
import { useAuthContext } from "../contexts/AuthContext";
import styles from "../styles/LoginComponent.module.css";

export default function LoginComponent() {
  const { loginUser } = useAuthActions();
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
    if (!state?.email) return;

    navigate("/auth/verify-email");
  }, [state?.email, navigate]);

  return (
    <form
      className={styles.loginForm}
      onSubmit={(e) => handleLoginFormSubmit(e)}
    >
      <h1 className={styles.loginFormMainHeader}>Welcome back</h1>
      <p className={styles.loginFormSubHeader}>
        Enter your credentials to continue
      </p>
      <label className={styles.loginFormLabel} htmlFor="email">
        Email
      </label>
      <input
        className={styles.loginFormInput}
        required={true}
        id="email"
        type="email"
        placeholder="jane.doe@example.com"
        onChange={(e) => handleLoginFormInput(e.target.value, "email")}
      />
      <label className={styles.loginFormLabel} htmlFor="password">
        Password
      </label>
      <input
        className={styles.loginFormInput}
        required={true}
        id="password"
        type="password"
        placeholder="Enter your password"
        onChange={(e) => handleLoginFormInput(e.target.value, "password")}
      />
      <button
        className={styles.loginFormButton}
        type="submit"
        disabled={state?.loading}
      >
        Sign in
      </button>
    </form>
  );
}
