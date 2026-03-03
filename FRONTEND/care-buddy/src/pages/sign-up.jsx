import React, { useState } from "react";
import { Container, Row, Col, Card, Form, Button } from "react-bootstrap";
import { Link } from "react-router-dom";
import axios from "axios";
import logo from "../images/logo.png";

function SignUp() {
  const [name, setName] = useState("");
  const [type, setRole] = useState("");
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");

// Submit handler
const handleSubmit = async (e) => {
  e.preventDefault();

  // Basic validation
  if (!name || !username || !password || !confirmPassword) {
    alert("Please fill all the fields");
    return;
  }

  if (password !== confirmPassword) {
    alert("Passwords do not match!");
    return;
  }

  if (username === "receptionist") {
    alert("This username is reserved for official purposes");
    return;
  }

  const url = "http://localhost:8081/owner-service/owners";

  try {
    const response = await axios.post(url, {
      name,
      username,
      password,
    });

    if (response.data && response.data.ownerId) {
      alert("Owner registered successfully!");
    } else {
      alert("Owner registered!");
    }
  } catch (error) {

    if (error.response && error.response.data) {
      alert(error.response.data.message); 
    } else {
      alert("Something went wrong"); 
    }
  }
};

  return (
    <Container
      fluid
      className="d-flex justify-content-center align-items-center"
      style={{ minHeight: "100vh", padding: "0" }}
    >
      <Card
        className="d-flex flex-row"
        style={{
          width: "100%",
          maxWidth: "1200px",
          height: "700px",
          overflow: "hidden",
          borderRadius: "12px",
        }}
      >
        <Row className="g-0 w-100 h-100">
          {/* LEFT IMAGE */}
          <Col
            md={6}
            style={{
              height: "100%",
              backgroundImage: `url(${logo})`,
              backgroundSize: "cover",
              backgroundPosition: "center",
            }}
          ></Col>

          {/* RIGHT FORM*/}
          <Col
            md={6}
            className="p-5 d-flex flex-column justify-content-center"
            style={{ height: "100%" }}
          >
            <h2 className="text-center mb-4" style={{ fontSize: "32px", fontWeight: "700" }}>
              Sign Up
            </h2>

            <Form onSubmit={handleSubmit} style={{ fontSize: "18px" }}>
              <Form.Group className="mb-4">
                <Form.Label>Full Name</Form.Label>
                <Form.Control
                  type="text"
                  placeholder="Enter your full name"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  style={{ height: "50px", fontSize: "16px" }}
                />
              </Form.Group>

              <Form.Group className="mb-4">
                <Form.Label>Username</Form.Label>
                <Form.Control
                  type="text"
                  placeholder="Enter username"
                  value={username}
                  onChange={(e) => setUsername(e.target.value)}
                  style={{ height: "50px", fontSize: "16px" }}
                />
              </Form.Group>

              <Form.Group className="mb-4">
                <Form.Label>Password</Form.Label>
                <Form.Control
                  type="password"
                  placeholder="Enter password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  style={{ height: "50px", fontSize: "16px" }}
                />
              </Form.Group>

              <Form.Group className="mb-4">
                <Form.Label>Confirm Password</Form.Label>
                <Form.Control
                  type="password"
                  placeholder="Confirm password"
                  value={confirmPassword}
                  onChange={(e) => setConfirmPassword(e.target.value)}
                  style={{ height: "50px", fontSize: "16px" }}
                />
              </Form.Group>

              <Button
                style={{
                  backgroundColor: "#F9F5EB",
                  borderColor: "#F9F5EB",
                  color: "black",
                  fontWeight: "600",
                  height: "50px",
                  fontSize: "18px",
                }}
                className="w-100"
                type="submit"
              >
                Sign Up
              </Button>
            </Form>

            <div className="text-center mt-4" style={{ fontSize: "16px" }}>
              Already have an account? <Link to="/login">Login</Link>
            </div>
          </Col>
        </Row>
      </Card>
    </Container>
  );
}

export default SignUp;
