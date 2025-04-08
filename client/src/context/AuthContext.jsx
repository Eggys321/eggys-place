import { createContext, useContext, useState, useEffect } from "react";

const AuthContext = createContext();

const baseUrl = import.meta.env.VITE_API_URL;

export const AuthProvider = ({ children }) => {
    const [user, setUser] = useState(null);
  
    useEffect(() => {
        const checkUserStatus = async () => {
            try {
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
              console.error("Error checking user status:", error);
              localStorage.removeItem("customerToken");
              setUser(null);
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
      <AuthContext.Provider value={{ user, login, logout }}>
        {children}
      </AuthContext.Provider>
    );
  };
export const useAuth = () => useContext(AuthContext);
