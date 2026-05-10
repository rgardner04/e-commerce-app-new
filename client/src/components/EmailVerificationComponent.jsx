import { useState, useEffect } from "react";
import { useAuthContext } from "../contexts/AuthContext";
import { useAuthActions } from "../hooks/useAuthActions";
import { useNavigate } from "react-router";
import styles from "../styles/EmailVerificationComponent.module.css";
import { ShoppingCart } from "lucide-react";

export default function EmailVerificationComponent() {
  const navigate = useNavigate();
  const { state } = useAuthContext();
  const { getVerifyEmail, verifyUser } = useAuthActions();
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

  useEffect(() => {
    if (state?.verifyEmailData) return;

    getVerifyEmail();
  }, [state?.verifyEmailData]);

  const verificationCodeInputField =
    state?.verifyEmailData?.inputFields["verificationCode"] || {};

  return (
    <>
      <div className={styles.brandContainer}>
        <ShoppingCart className={styles.brandIcon} />
        <h1 className={styles.brandName}>shoplify</h1>
      </div>
      <form
        className={styles.emailVerificationForm}
        onSubmit={(e) => handleEmailVerificationFormSubmit(e)}
      >
        <h1 className={styles.emailVerificationFormMainHeader}>
          {state?.verifyEmailData?.emailVerificationFormMainHeader}
        </h1>
        <p className={styles.emailVerificationFormSubHeader}>
          {`${state?.verifyEmailData?.emailVerificationFormSubHeader} ${state?.email}`}
        </p>
        <input
          className={styles.emailVerificationFormInput}
          type={verificationCodeInputField.type}
          minLength={verificationCodeInputField.verificationCodeLength}
          maxLength={verificationCodeInputField.verificationCodeLength}
          onChange={(e) => setVerificationCode(e.target.value)}
        />
        <button
          className={styles.emailVerificationFormButton}
          type="submit"
          disabled={state?.loading}
        >
          {state?.verifyEmailData?.emailVerificationFormButtonText}
        </button>
      </form>
    </>
  );
}
