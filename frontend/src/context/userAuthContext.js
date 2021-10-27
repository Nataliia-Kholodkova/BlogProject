/* eslint-disable react/jsx-filename-extension */
import React, { useState, useEffect, createContext } from 'react';
import { getMe } from '../utils/processData';

const AuthContext = createContext();

// eslint-disable-next-line react/prop-types
const AuthContextProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [logedIn, setLogedIn] = useState(false);
  useEffect(() => {
    const fetch = async () => {
      try {
        const data = await getMe();
        if (data.data.user) {
          setUser(data.data.user);
        }
      } catch {
        return false;
      }
      return true;
    };
    fetch();
  }, [user?._id, logedIn]);

  return (
    <AuthContext.Provider
      value={{ currentUser: user, setCurrentUser: setUser, setLogedIn }}
    >
      {children}
    </AuthContext.Provider>
  );
};

export { AuthContext, AuthContextProvider };
