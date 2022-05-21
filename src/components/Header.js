import React from "react";
import FullNavbar from "./FullNavbar";
import { Link } from "react-scroll";
import SmallNavbar from "./SmallNavbar";
import { useWindowWidthAndHeight } from "../customHooks/CustomHooks";
import { faBug } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

const Header = () => {
  const [width] = useWindowWidthAndHeight();
  return (
    <header>
      <div className="header-inner">
        <Link
          to="Home"
          className="logo nav-link"
          style={{
            fontSize: "1.5rem",
            fontWeight: "bold",
            fontStyle: "italic"
          }}
        >
          <FontAwesomeIcon
            icon={faBug}
            style={{ fontSize: "1.5rem", marginRight: ".5rem" }}
          />
          ISSUE TRACKER
        </Link>
        {width > 1000 ? (
          <FullNavbar navClass="nav-big" linkClassName="nav-big-link" />
        ) : (
          <SmallNavbar navClass="nav-small" linkClassName="nav-small-link" />
        )}
      </div>
    </header>
  );
};

export default Header;
