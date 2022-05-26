import React, {
  useState,
  useEffect,
  createContext,
  useContext,
  useReducer
} from "react";
import issuesReducer from "./reducers/issuesReducer";
import { useAuth } from "./AuthContext";
import { db } from "../firebase";

const initialState = {
  issues: []
};
const IssuesContext = createContext(initialState);

function useIssues() {
  return useContext(IssuesContext);
}

function IssuesContextProvider({ children }) {
  const { currentUser } = useAuth();
  const [displayIssue, setDisplayIssue] = useState(null);
  const [issues, setIssues] = useState([]);
  const [state, dispatch] = useReducer(issuesReducer, initialState);

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
    dispatch({
      type: "UPDATE_ISSUES",
      payload: {
        issues: issuesData
      }
    });
    setIssues(issuesData);
  };

  useEffect(() => {
    if (currentUser) {
      fetchData();
    }
  }, [currentUser]);

  const addIssue = (newIssue, isEditing) => {
    let updatedIssues;
    if (isEditing) {
      updatedIssues = state.issues.map((issue) => {
        if (issue.issueID !== newIssue.issueID) {
          return issue;
        } else {
          return newIssue;
        }
      });
    } else {
      updatedIssues = [newIssue, ...state.issues];
    }
    dispatch({
      type: "UPDATE_ISSUES",
      payload: {
        issues: updatedIssues
      }
    });
  };

  const removeIssue = (id) => {
    const updatedIssues = state.issues.filter((i) => i.issueID !== id);
    dispatch({
      type: "UPDATE_ISSUES",
      payload: {
        issues: updatedIssues
      }
    });
  };

  const refreshComments = (issueID, updatedComments) => {
    const updatedIssues = state.issues.map((issue) => {
      if (issue.issueID !== issueID) {
        return issue;
      } else {
        return { ...issue, comments: [...updatedComments] };
      }
    });
    dispatch({
      type: "UPDATE_ISSUES",
      payload: {
        issues: updatedIssues
      }
    });
  };

  return (
    <IssuesContext.Provider
      value={{
        displayIssue,
        setDisplayIssue,
        issues,
        setIssues,
        addIssue,
        removeIssue,
        refreshComments,
        rIssues: state.issues
      }}
    >
      {children}
    </IssuesContext.Provider>
  );
}

export { IssuesContextProvider, IssuesContext, useIssues };
