import React, { useState } from "react";
import Button from "react-bootstrap/Button";
import { useAuth } from "../../contexts/AuthContext";
import { useNavigate } from "react-router-dom";
//import IssuesContext from "../../contexts/IssuesContext";

export default function Logout() {
  const { login, currentUser, logout, isLoggedIn, setIsLoggedIn } = useAuth();
  const [error, setError] = useState("");
  //const { currentUser, logout } = useAuth();
  const navigate = useNavigate();
  //const { isLoggedIn, setIsLoggedIn } = useContext(IssuesContext);

  async function handleLogout() {
    setError("");

    try {
      await logout();
      navigate("/login");
    } catch {
      setError("Failed to log out");
    }
  }

  return (
    <>
      <div className="w-100 text-center mt-2">
        <Button variant="link" onClick={handleLogout}>
          Log Out
        </Button>
      </div>
    </>
  );
}
