import React, { useRef, useState, useContext } from "react";
import { Form, Button, Card, Alert } from "react-bootstrap";
import { useAuth } from "../../contexts/AuthContext";
//import IssuesContext from "../../contexts/IssuesContext";
import CenteredContainer from "./CenteredContainer";
import { Link, useNavigate } from "react-router-dom";

export default function Login() {
  const emailRef = useRef();
  const passwordRef = useRef();
  const {
    login,
    currentUser,
    updateUserName,
    isLoggedIn,
    setIsLoggedIn
  } = useAuth();
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();
  //const [isLoggedIn, setIsLoggedIn] = useState(false);

  async function handleSubmit(e) {
    e.preventDefault();

    try {
      setError("");
      setLoading(true);
      await login(emailRef.current.value, passwordRef.current.value);
      setIsLoggedIn(true);
      navigate("/");
    } catch {
      setError("Failed to log in");
    }

    setLoading(false);
  }

  async function handleDemo(e) {
    e.preventDefault();

    try {
      setError("");
      setLoading(true);
      await login("demo@demo.com", "demouser");
      setIsLoggedIn(true);
      navigate("/");
    } catch {
      setError("Failed to log in");
    }

    setLoading(false);
  }

  return (
    <CenteredContainer>
      <Card>
        <Card.Body>
          <h2 className="text-center mb-4">Log In</h2>
          {error && <Alert variant="danger">{error}</Alert>}
          <Form onSubmit={handleSubmit}>
            <Form.Group id="email">
              <Form.Label className="form-label">Email</Form.Label>
              <Form.Control
                className="form-control"
                type="email"
                ref={emailRef}
                required
              />
            </Form.Group>
            <Form.Group id="password">
              <Form.Label className="form-label">Password</Form.Label>
              <Form.Control
                className="form-control"
                type="password"
                ref={passwordRef}
                required
              />
            </Form.Group>
            <Button
              disabled={loading}
              className="w-100"
              type="submit"
              style={{ margin: "1rem 0" }}
            >
              Log In
            </Button>
            <Button
              disabled={loading}
              variant="info"
              className="w-100"
              type="button"
              onClick={handleDemo}
            >
              Demo Log In
            </Button>
          </Form>
          <div className="w-100 text-center mt-3">
            <Link to="/forgot-password">Forgot Password?</Link>
          </div>
        </Card.Body>
      </Card>
      <div className="w-100 text-center mt-2">
        Need an account? <Link to="/signup">Sign Up</Link>
      </div>
    </CenteredContainer>
  );
}
