import React, { useContext, useState, useEffect } from "react";
import { auth } from "../firebase";

const AuthContext = React.createContext();

export function useAuth() {
  return useContext(AuthContext);
}

export function AuthProvider({ children }) {
  const [currentUser, setCurrentUser] = useState();
  const [isLoggedIn, setIsLoggedIn] = useState();
  const [loading, setLoading] = useState(true);

  const signup = (email, password, name) => {
    return auth.createUserWithEmailAndPassword(email, password).then((res) => {
      const user = auth.currentUser;
      return user.updateProfile({
        displayName: name
      });
    });
  };

  const login = (email, password) => {
    console.log("login");
    return auth.signInWithEmailAndPassword(email, password);
  };

  const anonLogin = () => {
    console.log("anonymous");
    return auth.signInAnonymously();
  };

  const logout = () => {
    return auth.signOut();
  };

  const resetPassword = (email) => {
    return auth.sendPasswordResetEmail(email);
  };

  const updateEmail = (email) => {
    return currentUser.updateEmail(email);
  };

  const updatePassword = (password) => {
    return currentUser.updatePassword(password);
  };

  const updateUserName = (username) => {
    return currentUser.updateProfile({
      displayName: username
    });
  };

  useEffect(() => {
    const unsubscribe = auth.onAuthStateChanged((user) => {
      setCurrentUser(user);
      setLoading(false);
    });

    return unsubscribe;
  }, []);

  const value = {
    currentUser,
    login,
    anonLogin,
    signup,
    logout,
    resetPassword,
    updateEmail,
    updatePassword,
    updateUserName,
    isLoggedIn,
    setIsLoggedIn
  };

  return (
    <AuthContext.Provider value={value}>
      {!loading && children}
    </AuthContext.Provider>
  );
}
