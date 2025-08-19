import { createContext, useState } from 'react';

export const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(() => {
    const saved = localStorage.getItem('user');
    return saved ? JSON.parse(saved) : null;
  });

  const userlogin = (userData) => {
    localStorage.setItem('user', JSON.stringify(userData));
    setUser(userData);
  };

  const userlogout = () => {
    localStorage.removeItem('user');
    setUser(null);
  };

  const [company, setCompany] = useState(() => {
    const saved = localStorage.getItem('company');
    return saved ? JSON.parse(saved) : null;
  });

  const companylogin = (userData) => {
    localStorage.setItem('company', JSON.stringify(userData));
    setCompany(userData);
  };

  const companylogout = () => {
    localStorage.removeItem('company');
    setCompany(null);
  };

  const [store, setStore] = useState(() => {
    const saved = localStorage.getItem('store');
    return saved ? JSON.parse(saved) : null;
  });

  const storelogin = (userData) => {
    localStorage.setItem('store', JSON.stringify(userData));
    setStore(userData);
  };

  const storelogout = () => {
    localStorage.removeItem('store');
    setStore(null);
  };

  const [register, setRegister] = useState(() => {
    const saved = localStorage.getItem('register');
    return saved ? JSON.parse(saved) : null;
  });

  const registerlogin = (userData) => {
    localStorage.setItem('register', JSON.stringify(userData));
    setRegister(userData);
  };

  const registerlogout = () => {
    localStorage.removeItem('register');
    setRegister(null);
  };

  return (
    <AuthContext.Provider value={{ user, userlogin, userlogout, company, companylogin, companylogout, store, storelogin, storelogout, register, registerlogin, registerlogout}}>
      {children}
    </AuthContext.Provider>
  );
};
