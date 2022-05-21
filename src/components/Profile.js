import React, { useState } from "react";
import { Card, Button, Alert } from "react-bootstrap";
import { useAuth } from "../contexts/AuthContext";
import { Link, useNavigate } from "react-router-dom";

export default function Profile() {
  const [error, setError] = useState("");
  const { currentUser, logout, updateUserName } = useAuth();
  const navigate = useNavigate();

  async function handleLogout() {
    setError("");

    try {
      await logout();
      navigate("/login");
    } catch {
      setError("Failed to log out");
    }
  }
  console.log(currentUser ? true : false);

  // if (!currentUser.displayName) {
  //   //const promises = []
  //   setError("");
  //   console.log("updating demo user name");
  //   //promises.push(updateEmail(emailRef.current.value))
  //   updateUserName("Demo User")
  //     .then(() => {
  //       navigate("/");
  //     })
  //     .catch(() => {
  //       setError("failed to update demo account");
  //     });
  // }

  return (
    <div className="centered-container">
      <Card className="card">
        <Card.Body>
          <h2 className="text-center mb-4 card">Profile</h2>
          {error && <Alert variant="danger">{error}</Alert>}
          <strong>Email:</strong> {currentUser.email}
          <Link to="/update-profile" className="btn btn-primary w-100 mt-3">
            Update Profile
          </Link>
        </Card.Body>
      </Card>
      <div className="w-100 text-center mt-2">
        <Button variant="link" onClick={handleLogout}>
          Log Out
        </Button>
      </div>
    </div>
  );
}
