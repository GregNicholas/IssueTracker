import React, { useState, useEffect, createContext, useContext } from "react";
import { useAuth } from "./AuthContext";
import { db } from "../firebase";

const IssuesContext = createContext([]);

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
      console.log("ISSUES DATA: ", issuesData);
      setIssues(issuesData);
    };

    if (currentUser) {
      fetchData();
    }
  }, [currentUser]);

  const updateIssues = (newIssue) => {
    setIssues((prevIssues) => {
      if (
        prevIssues.some((prevIssue) => prevIssue.issueID === newIssue.issueID)
      ) {
        const newIssues = prevIssues.map((prevIssue) => {
          return prevIssue.issueID === newIssue.issueID ? newIssue : prevIssue;
        });
        return newIssues;
      } else {
        return [newIssue, ...prevIssues];
      }
    });
  };

  const removeIssue = (id) => {
    setIssues((prevIssues) => {
      return prevIssues.filter((i) => i.issueID !== id);
    });
  };

  const showNewComment = (issueID, comment) => {
    console.log("SHOWNEWCOMMENT:", comment);
    setIssues((prevIssues) => {
      return prevIssues.map((issue) => {
        if (issue.issueID === issueID) {
          const updatedComments = {};
          updatedComments.comments = [...issue.comments, comment];
          console.log("UPDATEDISSUE in comments: ", updatedComments);
          return { ...issue, ...updatedComments };
        } else {
          return issue;
        }
      });
    });
  };

  // const removeComment = (issueID, commentID) => {
  //   setIssues((prevIssues) => {
  //     return prevIssues.map((issue) => {
  //       if (issue.issueID === issueID) {
  //         const updatedComments = issue.comments.filter((comment) => {
  //           return comment.commentID !== commentID;
  //         });
  //         return { ...issue, ...updatedComments };
  //       } else {
  //         return issue;
  //       }
  //     });
  //   });
  // };

  const refreshComments = (issueID, updatedComments) => {
    setIssues((prevIssues) => {
      const newIssues = prevIssues.map((issue) => {
        if (issue.issueID === issueID) {
          console.log(issue.issueID, issueID);
          return { ...issue, comments: updatedComments };
        } else {
          return issue;
        }
      });
      return newIssues;
    });
  };

  return (
    <IssuesContext.Provider
      value={{
        displayIssue,
        setDisplayIssue,
        issues,
        setIssues,
        updateIssues,
        removeIssue,
        showNewComment,
        // removeComment,
        refreshComments
      }}
    >
      {children}
    </IssuesContext.Provider>
  );
}

export { IssuesContextProvider, IssuesContext, useIssues };
