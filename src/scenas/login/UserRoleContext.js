import React, { createContext, useContext, useState } from 'react';

const UserRoleContext = createContext();

export const useUserRole = () => useContext(UserRoleContext);

export const UserRoleProvider = ({ children }) => {
  const [userRole, setUserRole] = useState('usuario'); // Establece un valor predeterminado, puedes ajustar el valor inicial según sea necesario

  return (
    <UserRoleContext.Provider value={{ userRole, setUserRole }}>
      {children}
    </UserRoleContext.Provider>
  );
};
