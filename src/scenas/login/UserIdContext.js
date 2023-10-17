import React, { createContext, useContext, useState } from 'react';

const UserIdContext = createContext();

export const useUserId = () => useContext(UserIdContext);

export const UserIdProvider = ({ children }) => {
  const [userId, setUserId] = useState(null); // Establece un valor predeterminado, puedes ajustar el valor inicial según sea necesario

  return (
    <UserIdContext.Provider value={{ userId, setUserId }}>
      {children}
    </UserIdContext.Provider>
  );
};
