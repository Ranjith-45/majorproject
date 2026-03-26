import { createContext, useContext, useState } from "react";

const AuthContext = createContext();

export function AuthProvider({ children }) {
  const [user, setUser] = useState(null);
  const logout = () => {
  setUser(null);
  localStorage.removeItem("user");
  localStorage.removeItem("token");
  toast.success("Logged out successfully");
};

  return (
    <AuthContext.Provider value={{ user,setUser, logout }}>
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth() {
  return useContext(AuthContext);
}