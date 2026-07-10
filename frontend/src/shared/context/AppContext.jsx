import { createContext, useEffect, useState } from "react";
import api from "../api/httpClient.jsx";

export const Context = createContext();

const AppContext = ({ children }) => {
  const [user, setUser] = useState({});
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [isAuthLoading, setIsAuthLoading] = useState(true);

  useEffect(() => {
    api.get("/user/session")
      .then(({ data }) => {
        setUser(data?.data || {});
        setIsAuthenticated(Boolean(data?.data));
      })
      .catch(() => {
        localStorage.removeItem("token");
        localStorage.removeItem("user");
        setUser({});
        setIsAuthenticated(false);
      })
      .finally(() => setIsAuthLoading(false));
  }, []);

  return (
    <Context.Provider
      value={{
        isAuthenticated,
        isAuthLoading,
        setIsAuthenticated,
        user,
        setUser,
      }}
    >
      {children}
    </Context.Provider>
  );
};

export default AppContext;
