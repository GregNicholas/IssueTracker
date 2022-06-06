import React, { useEffect, useState } from "react";
import { useIssues } from "../contexts/IssuesContext";
import IssueTable from "./IssueTable";
import Issue from "./Issue";
import ReactTooltip from "react-tooltip";
import { faQuestion } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

const Issues = () => {
  const { displayIssue, setDisplayIssue, rIssues } = useIssues();
  const columns = React.useMemo(
    () => [
      {
        Header: "Issue Table",
        Footer: "Click on an item for details",
        columns: [
          {
            Header: "Assignee",
            accessor: "col0"
          },
          {
            Header: "Subject",
            accessor: "col1"
          },
          {
            Header: "IssueType",
            accessor: "col2"
          },
          {
            Header: "Category",
            accessor: "col3"
          }
        ]
      }
    ],
    []
  );

  const data = React.useMemo(
    () =>
      rIssues?.map((issue) => {
        return {
          col0: issue.assignee,
          col1: issue.subject,
          col2: issue.issueType,
          col3: issue.category,
          priority: issue.priority,
          status: issue.status,
          id: issue.issueID
        };
      }),
    [rIssues]
  );

  const handleClick = (e) => {
    if (displayIssue === null) {
      const issue = rIssues.filter((i) => i.issueID === e.target.id)[0];

      setDisplayIssue(issue);
    } else {
      setDisplayIssue(null);
    }
  };

  return (
    <div className="centered-container">
      <h2 className="page-title">Issues</h2>
      {!displayIssue && (
        <>
          <ReactTooltip
            id="help"
            place="bottom"
            backgroundColor="black"
            textColor="white"
          >
            <ul className="issue-table-instructions">
              <li>enter text in search field to filter</li>
              <li>click a column title to sort</li>
              <li>click inside a row to see details for that issue</li>
            </ul>
          </ReactTooltip>
          <div data-tip data-for="help" className="help">
            <span>help</span>
            <FontAwesomeIcon icon={faQuestion} />
          </div>
        </>
      )}
      {displayIssue ? (
        <Issue
          {...displayIssue}
          id={displayIssue.issueID}
          setDisplayIssue={setDisplayIssue}
          handleClick={handleClick}
          className="issue"
        />
      ) : rIssues?.length > 0 ? (
        <>
          <IssueTable columns={columns} data={data} handleClick={handleClick} />
        </>
      ) : (
        <p className="message">Waiting for data</p>
      )}
    </div>
  );
};

export default Issues;
