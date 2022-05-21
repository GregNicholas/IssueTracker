import React, { useState, useEffect, useContext } from "react";
import { useAuth } from "./AuthContext";
import { db } from "../firebase";

const IssuesContext = React.createContext();

function useIssues() {
  return useContext(IssuesContext);
}

function IssuesContextProvider({ children }) {
  const { currentUser } = useAuth();
  const [displayIssue, setDisplayIssue] = useState(null);
  const [issues, setIssues] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      let issuesData = await db.collection("issues").get();
      issuesData = issuesData.docs.map((doc) => doc.data());
      issuesData.sort((a, b) =>
        a.dateCreated[0] < b.dateCreated[0]
          ? 1
          : b.dateCreated[0] < a.dateCreated[0]
          ? -1
          : 0
      );
      setIssues(issuesData);
    };
    console.log("fetching data");
    if (currentUser) {
      fetchData();
    }
  }, [currentUser]);

  return (
    <IssuesContext.Provider
      value={{
        displayIssue,
        setDisplayIssue,
        issues,
        setIssues
      }}
    >
      {children}
    </IssuesContext.Provider>
  );
}

export { IssuesContextProvider, IssuesContext, useIssues };
