// context/ResponseContext.js
// context/LightCalculatorContext.js
import React, { createContext, useState, useEffect } from "react";

export const UserProfileContext = createContext();

export const UserProfileProvider = ({ children }) => {
  const [result, setResult] = useState(() => {
    if (typeof window !== "undefined") {
      const storedResult = localStorage.getItem("userResult");
      return storedResult ? JSON.parse(storedResult) : null;
    }
    return null;
  });

  useEffect(() => {
    if (typeof window !== "undefined" && result) {
      localStorage.setItem("userResult", JSON.stringify(result));
    }
  }, [result]);

  return (
    <UserProfileContext.Provider value={{ result, setResult }}>
      {children}
    </UserProfileContext.Provider>
  );
};
