import React, { useState, useEffect, useContext } from "react";
import IssuesContext from "../contexts/IssuesContext";
import { useAuth } from "../contexts/AuthContext";
import { db } from "../firebase";

const RoleContext = React.createContext();

export function useRoles() {
  return useContext(RoleContext);
}

export function RoleContextProvider({ children }) {
  const [userRoles, setUserRoles] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [isLoggedIn, setIsLoggedIn] = useState();
  const { currentUser } = useAuth();

  useEffect(() => {
    const fetchData = async () => {
      let roleData = await db.collection("UserRoles").get();
      roleData = roleData.docs.map((doc) => doc.data());
      setUserRoles(roleData);
      setIsLoading(false);
    };

    if (currentUser) {
      fetchData();
    }
  }, [currentUser]);

  function getAdmins() {
    const admins = userRoles[0].admin.map((a) => a);
    return admins;
  }

  function getDevelopers() {
    const developers = userRoles[0].developers.map((d) => d);
    return developers;
  }

  function isAdmin(uid) {
    return userRoles[0].admin.find((a) => a.uid === uid);
  }

  return (
    <RoleContext.Provider
      value={{
        userRoles,
        getAdmins,
        getDevelopers,
        isAdmin,
        isLoading
      }}
    >
      {children}
    </RoleContext.Provider>
  );
}

//export { RoleContextProvider, RoleContext };
