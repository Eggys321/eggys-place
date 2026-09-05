import { createContext, useContext, useState, useEffect } from "react";
import { baseUrl } from "../config";

const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
    const [user, setUser] = useState(null);
    const [isLoading, setIsLoading] = useState(false);

  
    useEffect(() => {
        const checkUserStatus = async () => {
            try {
                setIsLoading(true);

              const token = localStorage.getItem("customerToken");
      
              if (!token) {
                setUser(null);
                return;
              }
      
              const response = await fetch(`${baseUrl}/api/auth/isloggedin`, {
                headers: { Authorization: `Bearer ${token}` },
              });
      
              const data = await response.json();
      
              if (!data.success) {
                localStorage.removeItem("customerToken");
                setUser(null);
              } else {
                setUser({ token, ...data.user });
              }
            } catch (error) {
              localStorage.removeItem("customerToken");
              setUser(null);
            }
            finally{
                setIsLoading(false);

            }
          };
          checkUserStatus()
    }, []);
  
    const login = (token, userData) => {
      localStorage.setItem("customerToken", token);
      setUser({ token, ...userData });
    };
  
    const logout = () => {
      localStorage.removeItem("customerToken");
      setUser(null);
    };
  
    return (
      <AuthContext.Provider value={{ user, login, logout ,isLoading}}>
        {children}
      </AuthContext.Provider>
    );
  };
export const useAuth = () => useContext(AuthContext);
