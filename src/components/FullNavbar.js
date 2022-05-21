import React, { useState } from "react";
//import { Link } from "react-scroll";
import { useIssues } from "../contexts/IssuesContext";
import { Link } from "react-router-dom";
import {
  faTimes,
  faHome,
  faClipboard,
  faPlusSquare,
  faUser
} from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

const FullNavbar = ({ navClass, linkClassName }) => {
  return (
    <NavComponent
      navClass={navClass}
      linkClassName={linkClassName}
      onClick={() => null}
    />
  );
};

export const NavComponent = ({ onClick, navClass, linkClassName }) => {
  const { setDisplayIssue } = useIssues();
  const handleClick = () => {
    setDisplayIssue(null);
    onClick();
  };
  return (
    <nav className={navClass}>
      {[
        ["Home", faHome],
        ["Issues", faClipboard],
        ["Add Issue", faPlusSquare],
        ["Profile", faUser]
      ].map(([page, icon]) => (
        <Link
          key={page}
          to={`/${page.split(" ").join("-")}`}
          className={linkClassName}
          onClick={handleClick}
        >
          <div
            style={{
              width: "2rem",
              display: "inline-flex",
              justifyContent: "center",
              marginRight: "0.75rem"
            }}
          >
            <FontAwesomeIcon icon={icon} style={{ fontSize: "1.5rem" }} />
          </div>
          <span>{page}</span>
        </Link>
      ))}
    </nav>
  );
};
export default FullNavbar;
