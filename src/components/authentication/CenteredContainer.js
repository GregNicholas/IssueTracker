import React from "react";
import Container from "react-bootstrap/Container";

const CenteredContainer = ({ children }) => {
  return (
    <Container
      className="d-flex justify-content-center"
      style={{ minHeight: "100vh", marginTop: "4rem" }}
    >
      <div className="w-100" style={{ maxWidth: "450px" }}>
        {children}
      </div>
    </Container>
  );
};

export default CenteredContainer;
