
import React, { createContext, useContext, useState, useEffect } from "react";
import axios from "../utils/axios";
const AuthContext = createContext();

export function useAuth() {
  return useContext(AuthContext);
}

export function AuthProvider({ children }) {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [account, setAccount] = useState(null);
  const [token, setToken] = useState(localStorage.getItem("token") || null);

  const register = (formData = {}) =>
    new Promise((resolve, reject) => {
      axios
        .post("api/auth/register", formData)
        .then(({ data: { data: accountData, token: accessToken } }) => {
          setAccount(accountData);
          setToken(accessToken);
          setIsLoggedIn(true);
          resolve(true);
        })
        .catch((error) => {

          reject(error?.response?.data?.message || error.message);
        });
    });

  const login = (formData = {}) =>
    new Promise((resolve, reject) => {
      axios
        .post('api/auth/login', formData)
        .then(({ data: { data: accountData, token: accessToken } }) => {
          setAccount(accountData);
          setToken(accessToken);
          setIsLoggedIn(true);
          resolve(true);
        })
        .catch((error) => {

          reject(error?.response?.data?.message || error.message);
        });
    });

  const logout = () => {
    setIsLoggedIn(false);
    setAccount(null);
    setToken(null);
  };

  const getAccount = async () => {
    try {
      const {
        data: { data: accountData, token: accessToken },
      } = await axios.get("api/auth/getAccount", {
        headers: {
          authorization: `Bearer ${token}`,
        },
      });

      setAccount(accountData);
      setToken(accessToken);
      setIsLoggedIn(true);
    } catch (error) {
      if (error?.response?.statusCode === 401) setToken(null);
    }
  };

  const changePassword = async (formData) => {
    try {
      await axios.post('api/auth/changePassword', formData, {
        headers: {
          authorization: `Bearer ${token}`,
        },
      });
      return 'success';
    } catch (error) {
      return (error)
    }
  }

  const changeAccount = async (formData) => {
    try {
      const response = await axios.post('api/auth/changeAccount', formData, {
        headers: {
          authorization: `Bearer ${token}`,
        },
      });

      setAccount(response.data.data);
      setToken(response.data.token);
      setIsLoggedIn(true);
      return response.data.message;
    } catch (error) {
      return (error);
    }
  }
  useEffect(() => {
    if (token) {
      localStorage.setItem("token", token);
    } else {
      localStorage.removeItem("token");
    }
  }, [token]);

  useEffect(() => {
    if (!isLoggedIn && !account && token)
      getAccount();
  }, [isLoggedIn, account, token]); // eslint-disable-line react-hooks/exhaustive-deps

  return (
    <AuthContext.Provider
      value={{
        isLoggedIn,
        account,
        token,
        register,
        login,
        logout,
        changeAccount,
        changePassword,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
}
