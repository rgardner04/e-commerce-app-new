import { useEffect } from "react";
import { useNavigate } from "react-router";
import { useAuthContext } from "../contexts/AuthContext";
import MainComponent from "./MainComponent";
import styles from "../styles/PublicComponent.module.css";
import { useAuthActions } from "../hooks/useAuthActions";

export default function PublicComponent() {
  const navigate = useNavigate();
  const { state } = useAuthContext();
  const { getAuthFromLocal } = useAuthActions();

  const isAuthenticated =
    state?.accessToken && state?.refreshToken && state?.email;

  useEffect(() => {
    getAuthFromLocal();
  }, []);

  useEffect(() => {
    if (isAuthenticated) {
      navigate("/", { replace: true });
    }
  }, [isAuthenticated, navigate]);

  return (
    <div className={styles.container}>
      <MainComponent />
    </div>
  );
}
