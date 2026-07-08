import { createContext, useState } from "react";

export const Context = createContext();

const AppContext = ({ children }) => {
  const storedUser = localStorage.getItem("user");
  const [user, setUser] = useState(storedUser ? JSON.parse(storedUser) : {});
  const [isAuthenticated, setIsAuthenticated] = useState(Boolean(localStorage.getItem("token")));

  return (
    <Context.Provider
      value={{
        isAuthenticated,
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
