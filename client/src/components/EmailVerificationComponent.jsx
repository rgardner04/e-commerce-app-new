import { useState, useEffect } from "react";
import { useAuthContext } from "../contexts/AuthContext";
import { useAuthActions } from "../hooks/useAuthActions";
import { useNavigate } from "react-router";
import styles from "../styles/EmailVerificationComponent.module.css";

export default function EmailVerificationComponent() {
  const navigate = useNavigate();
  const { state } = useAuthContext();
  const { verifyUser } = useAuthActions();
  const [verificationCode, setVerificationCode] = useState(null);

  async function handleEmailVerificationFormSubmit(e) {
    e.preventDefault();

    if (
      !state?.email ||
      !verificationCode ||
      verificationCode.length < 6 ||
      isNaN(verificationCode)
    )
      return;

    await verifyUser({
      email: state?.email,
      verificationCode: parseInt(verificationCode),
    });
  }

  useEffect(() => {
    if (state?.email) return;

    navigate("/auth/login", { replace: true });
  }, [state?.email, navigate]);

  return (
    <form
      className={styles.emailVerificationForm}
      onSubmit={(e) => handleEmailVerificationFormSubmit(e)}
    >
      <h1 className={styles.emailVerificationFormMainHeader}>
        Verify your Email
      </h1>
      <p className={styles.emailVerificationFormSubHeader}>
        {`An email has been sent to ${state?.email}`}
      </p>
      <input
        className={styles.emailVerificationFormInput}
        type="text"
        minLength={6}
        maxLength={6}
        onChange={(e) => setVerificationCode(e.target.value)}
      />
      <button
        className={styles.emailVerificationFormButton}
        type="submit"
        disabled={state?.loading}
      >
        Verify
      </button>
    </form>
  );
}
