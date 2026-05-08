import { Route } from "react-router";
import LoginComponent from "./components/LoginComponent";
import EmailVerificationComponent from "./components/EmailVerificationComponent";
import { Routes } from "react-router";
import PrivateComponent from "./components/PrivateComponent";
import PublicComponent from "./components/PublicComponent";

export default function App() {
  return (
    <>
      <Routes>
        <Route element={<PublicComponent />}>
          <Route path="/auth/login" element={<LoginComponent />} />
          <Route
            path="/auth/verify-email"
            element={<EmailVerificationComponent />}
          />
        </Route>
        <Route element={<PrivateComponent />}>
          <Route index element={<div>Welcome to the Dashboard!</div>} />
        </Route>
      </Routes>
    </>
  );
}
