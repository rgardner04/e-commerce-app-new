import { createContext, useContext, useReducer } from "react";
import { initialState, reducer } from "../state/reducers/authReducer";

export const AuthContext = createContext(null);

export function useAuthContext() {
  return useContext(AuthContext);
}

export function AuthProvider({ children }) {
  const [state, dispatch] = useReducer(reducer, initialState);
  return <AuthContext value={{ state, dispatch }}>{children}</AuthContext>;
}
