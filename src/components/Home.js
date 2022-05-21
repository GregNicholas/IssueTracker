import React from "react";
import { useAuth } from "../contexts/AuthContext";
import { useIssues } from "../contexts/IssuesContext";
import { PieChart } from "react-minimal-pie-chart";
import { Link } from "react-router-dom";

export default function Home() {
  const { issues } = useIssues();
  const numOpen = issues.filter((item) => {
    return item.status === "open";
  }).length;
  const numInProgress = issues.filter((item) => {
    return item.status === "inProgress";
  }).length;
  const numClosed = issues.filter((item) => {
    return item.status === "closed";
  }).length;

  const numBug = issues.filter((item) => {
    return item.issueType === "bug";
  }).length;
  const numNewFeature = issues.filter((item) => {
    return item.issueType === "new feature";
  }).length;
  const numStyle = issues.filter((item) => {
    return item.issueType === "style";
  }).length;

  return (
    <div className="centered-container">
      <Link
        style={{
          textDecoration: "none"
        }}
        to={"/Issues"}
        className="home-link"
      >
        <div>View Issues Table</div>
      </Link>

      <div
        style={{
          display: "flex",
          padding: "0 0.5rem",
          margin: "0 auto",
          gap: "1rem"
        }}
      >
        <div className="pie-chart-card">
          <PieChart
            data={[
              { title: "Open", value: numOpen, color: "#000db5" },
              { title: "In Progress", value: numInProgress, color: "#f50060" },
              { title: "Closed", value: numClosed, color: "#ffa600" }
            ]}
            label={({ dataEntry }) => dataEntry.value}
          />
          <h3>Status</h3>
          <ul>
            <li>Open</li>
            <li>In Progress</li>
            <li>Closed</li>
          </ul>
        </div>
        <div className="pie-chart-card">
          <PieChart
            data={[
              { title: "Bug", value: numBug, color: "#000db5" },
              { title: "New Feature", value: numNewFeature, color: "#f50060" },
              { title: "Style", value: numStyle, color: "#ffa600" }
            ]}
            label={({ dataEntry }) => dataEntry.value}
          />
          <h3>Issue Type</h3>
          <ul>
            <li>Bug</li>
            <li>New Feature</li>
            <li>Style</li>
          </ul>
        </div>
      </div>
    </div>
  );
}
