
import React, { createContext, useContext, useState, useEffect, ReactNode } from "react";

interface User {
  name: string;
  email: string;
  role: "admin" | "user";
}

interface AuthContextType {
  user: User | null;
  isAuthenticated: boolean;
  isLoading: boolean;
  login: (email: string, password: string) => Promise<void>;
  register: (name: string, email: string, password: string) => Promise<void>;
  logout: () => void;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const AuthProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  const [user, setUser] = useState<User | null>(null);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    // Check if user is stored in localStorage
    const storedUser = localStorage.getItem("user");
    if (storedUser) {
      setUser(JSON.parse(storedUser));
    }
    setIsLoading(false);
  }, []);

  const login = async (email: string, password: string) => {
    // This would typically make an API call
    // For demo purposes, we'll simulate authentication
    
    return new Promise<void>((resolve, reject) => {
      setTimeout(() => {
        if (email === "admin@example.com" && password === "password") {
          const adminUser = { email, name: "Admin User", role: "admin" as const };
          setUser(adminUser);
          localStorage.setItem("user", JSON.stringify(adminUser));
          resolve();
        } else if (email && password) {
          // Simple validation for demo
          const regularUser = { email, name: "Regular User", role: "user" as const };
          setUser(regularUser);
          localStorage.setItem("user", JSON.stringify(regularUser));
          resolve();
        } else {
          reject(new Error("Invalid credentials"));
        }
      }, 1000);
    });
  };

  const register = async (name: string, email: string, password: string) => {
    // This would typically make an API call to register the user
    return new Promise<void>((resolve, reject) => {
      setTimeout(() => {
        if (name && email && password) {
          const newUser = { name, email, role: "user" as const };
          setUser(newUser);
          localStorage.setItem("user", JSON.stringify(newUser));
          resolve();
        } else {
          reject(new Error("Please fill in all fields"));
        }
      }, 1000);
    });
  };

  const logout = () => {
    setUser(null);
    localStorage.removeItem("user");
  };

  return (
    <AuthContext.Provider
      value={{
        user,
        isAuthenticated: !!user,
        isLoading,
        login,
        register,
        logout
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error("useAuth must be used within an AuthProvider");
  }
  return context;
};
