import React, { useState } from "react";
import { NavComponent } from "./FullNavbar";
import OutsideClickHandler from "react-outside-click-handler";

const SmallNavbar = () => {
  let [translate, setTranslate] = useState(true);
  return (
    <OutsideClickHandler onOutsideClick={() => setTranslate(true)}>
      <div>
        <button
          className="hamburger-btn"
          onClick={() => setTranslate(!translate)}
        >
          {translate ? <span>&#9776;</span> : <span>&times;</span>}
        </button>
        <div
          id="sidebar-list"
          className={`${translate ? "addTransiton" : "removeTransition"}`}
        >
          <NavComponent
            navClass="nav-small"
            linkClassName="nav-small-link"
            onClick={() => setTranslate(true)} //set translate to true to hide the sidebar list
          />
        </div>
      </div>
    </OutsideClickHandler>
  );
};
export default SmallNavbar;
