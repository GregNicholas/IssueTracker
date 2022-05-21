import React from "react";
import { Button } from "react-bootstrap";

export default function ConfirmPopup({ handleDelete, setPopup }) {
  return (
    <>
      <div className="popup-overlay"></div>
      <div className="confirm-popup">
        <div className="popup-body">
          <p>This issue will be permanently deleted.</p>
          <p>Are you sure?</p>
          <Button
            variant="secondary"
            onClick={() => setPopup(false)}
            style={{ position: "relative", float: "right" }}
          >
            cancel
          </Button>
          <Button
            variant="danger"
            onClick={handleDelete}
            style={{ position: "relative", float: "left" }}
          >
            DELETE
          </Button>
        </div>
      </div>
    </>
  );
}
