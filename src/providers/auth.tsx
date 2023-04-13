import React from "react";

interface Auth {
  isTokenSet: boolean;
  getToken: () => string | null;
  setToken: (token: string) => void;
  clearToken: () => void;
}
const TOKEN = "TOKEN";
export const AuthContext = React.createContext<Auth>({
  isTokenSet: false,
  getToken: () => {
    return null;
  },
  setToken: () => {},
  clearToken: () => {},
});

export interface AuthProps {
  children?: React.ReactNode;
}

export const AuthProvider = React.memo<AuthProps>((authProps) => {
  const [isTokenSet, setIsTokenSet] = React.useState<boolean>(false);

  React.useEffect(() => {
    if (localStorage.getItem(TOKEN)) {
      setIsTokenSet(true);
    } else {
      setIsTokenSet(false);
    }
  }, []);

  const value = React.useMemo<Auth>(() => {
    return {
      isTokenSet: isTokenSet,
      getToken: () => {
        return localStorage.getItem(TOKEN);
      },
      setToken: (token: string) => {
        localStorage.setItem(TOKEN, token);
        setIsTokenSet(true);
      },
      clearToken: () => {
        localStorage.removeItem(TOKEN);
        setIsTokenSet(false);
      },
    };
  }, [isTokenSet]);

  return (
    <AuthContext.Provider value={value}>
      {authProps.children}
    </AuthContext.Provider>
  );
});

export const useAuth = () => React.useContext(AuthContext);
