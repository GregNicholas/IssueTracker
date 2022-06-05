import React from "react";
import { Link } from "react-router-dom";
import ReactTooltip from "react-tooltip";
import { faUser } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

export default function Home() {
  return (
    <div className="centered-container">
      <div className="page-thumbnails">
        <div className="thumbnail issues-page-thumbnail">
          <ReactTooltip id="issues-page">
            <span>View table with all issues</span>
          </ReactTooltip>
          <Link
            data-tip
            data-for="issues-page"
            style={{
              textDecoration: "none"
            }}
            to={"/issues"}
            className="home-link"
          >
            <img
              src={
                "https://res.cloudinary.com/mobyd/image/upload/v1654444100/table-thumb_pqxccj.png"
              }
              alt="thumbnail for issues page"
            />
          </Link>
        </div>
        <div className="thumbnail stats-page-thumbnail">
          <ReactTooltip id="stats-page">
            <span>View charts with issues stats</span>
          </ReactTooltip>
          <Link
            data-tip
            data-for="stats-page"
            style={{
              textDecoration: "none"
            }}
            to={"/stats"}
            className="home-link"
          >
            <img
              src={
                "https://res.cloudinary.com/mobyd/image/upload/v1654444100/stats-thumb_mibpc0.png"
              }
              alt="thumbnail for stats page"
            />
          </Link>
        </div>
        <div className="thumbnail add-page-thumbnail">
          <ReactTooltip id="add-page">
            <span>Open form to add a new issue</span>
          </ReactTooltip>
          <Link
            data-tip
            data-for="add-page"
            style={{
              textDecoration: "none"
            }}
            to={"/add-issue"}
            className="home-link"
          >
            <img
              src={
                "https://res.cloudinary.com/mobyd/image/upload/v1654444100/add-thumb_grhrrb.png"
              }
              alt="thumbnail for add-issue page"
            />
          </Link>
        </div>

        <Link
          data-tip
          data-for="profile-page"
          style={{
            textDecoration: "none"
          }}
          to={"/profile"}
          className="home-link"
        >
          <div className="thumbnail thumbnail-icon profile-page-thumbnail">
            <ReactTooltip id="profile-page">
              <span>View your profile page</span>
            </ReactTooltip>
            <FontAwesomeIcon icon={faUser} />
          </div>
        </Link>
      </div>
    </div>
  );
}
