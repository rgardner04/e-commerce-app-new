import { Outlet } from "react-router";
import styles from "../styles/MainComponent.module.css";

export default function MainComponent() {
  return (
    <main className={styles.container}>
      <Outlet />
    </main>
  );
}
