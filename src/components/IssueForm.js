import React, { useState } from "react";
import { useAuth } from "../contexts/AuthContext";
import { useIssues } from "../contexts/IssuesContext";
import { useRoles } from "../contexts/RoleContext";
import { Alert } from "react-bootstrap";
import { db } from "../firebase";
import DatePicker from "react-datepicker";
import { useNavigate } from "react-router-dom";
import "react-datepicker/dist/react-datepicker.css";

const IssueForm = (props) => {
  const { currentUser } = useAuth();
  const [error, setError] = useState("");
  const [issueSubmitted, setIssueSubmitted] = useState();
  const { issues, setIssues } = useIssues();
  const { getDevelopers } = useRoles();
  const developers = getDevelopers();
  const editIssue = props.issue
    ? issues.find((iss) => iss.issueID === props.issue.issueID)
    : null;

  let navigate = useNavigate();
  const [issue, setIssue] = useState(() => {
    return {
      issueID: editIssue ? editIssue.issueID : uniqueID(),
      uid: editIssue ? editIssue.uid : currentUser.uid,
      author: editIssue ? editIssue.author : currentUser.displayName,
      subject: editIssue ? editIssue.subject : "",
      description: editIssue ? editIssue.description : "",
      issueType: editIssue ? editIssue.issueType : "bug",
      priority: editIssue ? editIssue.priority : "normal",
      category: editIssue ? editIssue.category : "front end",
      dateCreated: editIssue ? editIssue.dateCreated : new Date(),
      dueDate: editIssue ? new Date(editIssue.dueDate[0]) : new Date(),
      assignee: editIssue ? editIssue.assignee : "",
      status: editIssue ? editIssue.status : "open",
      comments: editIssue?.comments ? editIssue.comments : []
    };
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setIssue((prevState) => ({ ...prevState, [name]: value }));
  };

  function uniqueID() {
    function chr4() {
      return Math.random().toString(16).slice(-4);
    }
    return (
      chr4() +
      chr4() +
      "-" +
      chr4() +
      "-" +
      chr4() +
      "-" +
      chr4() +
      "-" +
      chr4() +
      chr4() +
      chr4()
    );
  }

  const handleSubmit = (e) => {
    e.preventDefault();
    const currentDate = new Date();
    const currentDateFormatted = formatDate(currentDate, true);
    const dueDateFormatted = formatDate(issue.dueDate);
    const formattedIssue = formatIssue(
      currentDate,
      currentDateFormatted,
      issue.dueDate,
      dueDateFormatted
    );

    try {
      setError("");
      setIssueSubmitted(true);

      uploadIssue(issue.issueID, formattedIssue);
      setIssues((prevIssues) => {
        if (
          prevIssues.some((prevIssue) => prevIssue.issueID === issue.issueID)
        ) {
          const newIssues = prevIssues.map((prevIssue) => {
            return prevIssue.issueID === issue.issueID
              ? formattedIssue
              : prevIssue;
          });
          return newIssues;
        } else {
          return [formattedIssue, ...prevIssues];
        }
      });

      navigate("/issues");
    } catch {
      setError("Issue not submitted");
    }
  };

  const formatIssue = (
    currentDate,
    currentDateFormatted,
    dueDate,
    dueDateFormatted
  ) => {
    if (props.issue) {
      return {
        issueID: issue.issueID,
        uid: issue.uid,
        updatedBy: currentUser.displayName,
        author: issue.author,
        subject: issue.subject,
        description: issue.description,
        issueType: issue.issueType,
        priority: issue.priority,
        category: issue.category,
        dateCreated: issue.dateCreated,
        dateUpdated: [currentDate.getTime(), currentDateFormatted],
        dueDate: [dueDate.getTime(), dueDateFormatted],
        assignee: issue.assignee,
        status: issue.status ? issue.status : "open",
        comments: issue.comments
      };
    } else {
      return {
        issueID: issue.issueID,
        uid: currentUser.uid,
        author: currentUser.displayName,
        subject: issue.subject,
        description: issue.description,
        issueType: issue.issueType,
        priority: issue.priority,
        category: issue.category,
        dateCreated: [currentDate.getTime(), currentDateFormatted],
        dueDate: [dueDate.getTime(), dueDateFormatted],
        assignee: issue.assignee,
        status: issue.status ? issue.status : "open"
      };
    }
  };

  const uploadIssue = async (issueID, formattedIssue) => {
    if (props.issue) {
      await db.collection("issues").doc(issueID).update(formattedIssue);
    } else {
      await db.collection("issues").doc(issueID).set(formattedIssue);
    }
  };

  const formatDate = (d, time) => {
    const months = [
      "Jan",
      "Feb",
      "Mar",
      "Apr",
      "May",
      "Jun",
      "Jul",
      "Aug",
      "Sep",
      "Oct",
      "Nov",
      "Dec"
    ];
    const month = months[d.getMonth()];
    const day = d.getDate();
    const year = d.getFullYear();
    const hour = d.getHours();
    const minute = (d.getMinutes() < 10 ? "0" : "") + d.getMinutes();
    return time
      ? `${month} ${day}, ${year} ${hour}:${minute}`
      : `${month} ${day}, ${year}`;
  };

  const assigneeOptions = developers.map((d) => {
    return (
      <option key={d.name} value={d.name} selected={issue.assignee === d.name}>
        {d.name}
      </option>
    );
  });

  const selectAssignee = (
    <div className="form-section">
      <label htmlFor="assignee" style={{ display: "block" }}>
        Assignee
      </label>
      <select name="assignee" onChange={handleChange}>
        <option key={"default"} value={""}>
          
        </option>
        {assigneeOptions}
      </select>
    </div>
  );

  const selectStatus = !props.issue ? (
    ""
  ) : (
    <div className="form-section">
      <label htmlFor="status" style={{ display: "block" }}>
        Status
      </label>
      <select name="status" onChange={handleChange}>
        <option value="open" selected={issue.status === "open"}>
          Open
        </option>
        <option value="in progress" selected={issue.status === "in progress"}>
          In Progress
        </option>
        <option value="closed" selected={issue.status === "closed"}>
          Closed
        </option>
      </select>
    </div>
  );

  return (
    <div className="issue-form">
      {error && <Alert variant="danger">{error}</Alert>}
      {issueSubmitted && <Alert variant="success">Issue Submitted!</Alert>}
      <form onSubmit={handleSubmit}>
        <div className="form-section">
          <label htmlFor="subject" style={{ display: "block" }}>
            Subject
          </label>
          <input
            placeholder="Subject..."
            name="subject"
            type="text"
            id="subject"
            maxLength="30"
            value={issue.subject}
            onChange={handleChange}
            required
          />
        </div>
        <div className="form-section">
          <label htmlFor="description" style={{ display: "block" }}>
            Description
          </label>
          <textarea
            placeholder="Description..."
            name="description"
            id="description"
            value={issue.description}
            onChange={handleChange}
            required
          />
        </div>
        <div className="form-section">
          <label htmlFor="issueType" style={{ display: "block" }}>
            Issue Type
          </label>
          <select name="issueType" onChange={handleChange}>
            <option value="bug" selected={issue.issueType === "bug"}>
              Bug
            </option>
            <option
              value="new feature"
              selected={issue.issueType === "new feature"}
            >
              New Feature
            </option>
            <option value="style" selected={issue.issueType === "style"}>
              Style
            </option>
          </select>
        </div>
        <div className="form-section">
          <label htmlFor="priority" style={{ display: "block" }}>
            Priority:
          </label>
          <div>
            <input
              type="radio"
              id="normal"
              name="priority"
              value="normal"
              checked={issue.priority === "normal"}
              onChange={handleChange}
            />
            <label htmlFor="normal" className="radio-label">
              <span>
                <span></span>
              </span>
              Normal
            </label>
          </div>
          <div>
            <input
              type="radio"
              id="low"
              name="priority"
              value="low"
              checked={issue.priority === "low"}
              onChange={handleChange}
            />
            <label htmlFor="low" className="radio-label">
              <span>
                <span></span>
              </span>
              Low
            </label>
          </div>
          <div>
            <input
              type="radio"
              id="high"
              name="priority"
              value="high"
              checked={issue.priority === "high"}
              onChange={handleChange}
            />
            <label htmlFor="high" className="radio-label">
              <span>
                <span></span>
              </span>
              High
            </label>
          </div>
        </div>
        <div className="form-section">
          <label htmlFor="category" style={{ display: "block" }}>
            Category
          </label>
          <select name="category" onChange={handleChange}>
            <option value="front end" selected={issue.category === "front end"}>
              Front End
            </option>
            <option value="back end" selected={issue.category === "back end"}>
              Back End
            </option>
            <option value="other" selected={issue.category === "other"}>
              Other
            </option>
          </select>
        </div>
        {selectAssignee}
        {selectStatus}
        <label htmlFor="dueDate" style={{ display: "block" }}>
          Due Date
        </label>
        <DatePicker
          name="dueDate"
          selected={issue.dueDate}
          onChange={(d) =>
            setIssue((prevState) => ({ ...prevState, dueDate: d }))
          }
        />

        <input className="submit-btn issue-btn" type="submit" value="Submit" />
        <input
          className="cancel-btn issue-btn"
          type="button"
          value="Cancel"
          onClick={() => navigate("/issues")}
        />
      </form>
    </div>
  );
};

export default IssueForm;
