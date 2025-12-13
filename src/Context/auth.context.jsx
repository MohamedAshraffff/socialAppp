import { createContext, useEffect, useState } from "react";

export const auth = createContext(null);

export default function AutoContextProvider({ children }) {
  const [isLogin, setLogin] = useState(null);
  const [user, setUser] = useState(null);

  useEffect(() => {
    if (localStorage.getItem("token")) setLogin(localStorage.getItem("token"));
  }, []);

  return (
    <auth.Provider value={{ isLogin, setLogin, user, setUser }}>
      {children}
    </auth.Provider>
  );
}
