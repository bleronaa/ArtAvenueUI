// src/context/AuthContext.js
import React, { createContext, useState, useEffect, useContext } from 'react';
import axiosInstance from './src/Axios';

const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [data, setData] = useState({});

  useEffect(() => {
    const token = localStorage.getItem("token");

    const fetchData = async () => {
      if (token) {
        try {
          const response = await axiosInstance.get('/Client/getCurrentlyloggedInClientUsername');
          setData(response.data);
        } catch (error) {
          console.error('Error fetching user data:', error);
        }
      }
    };

    fetchData();
  }, []);

  // Function to update user data
  const updateUserData = async () => {
    const token = localStorage.getItem("token");
    if (token) {
      try {
        const response = await axiosInstance.get('/Client/getCurrentlyloggedInClientUsername');
        setData(response.data);
      } catch (error) {
        console.error('Error updating user data:', error);
      }
    }
  };

  return (
    <AuthContext.Provider value={{ data, updateUserData }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => useContext(AuthContext);
