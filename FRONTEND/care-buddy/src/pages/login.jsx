import { Container, Row, Col, Card, Form, Button } from "react-bootstrap";
import { Link, useNavigate } from "react-router-dom";
import logo from "../images/logo.png";
import axios from "axios";
import { useState } from "react";

function Login() {

  const navigate = useNavigate();

  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");

  const handleSubmit = async (e) => {
  e.preventDefault();

  let loginSuccess = false;

  if (username === "receptionist" && password === "1234") {
    loginSuccess = true;
    localStorage.setItem("role", "receptionist"); 
    navigate("/recep-dashboard/home");
    return; 
  }

  try {
    const response = await axios.post("http://localhost:8081/owner-service/owners/login", {
      username: username,
      password: password,
    });

    const user = response.data;
    console.log(user);

    if (user && user.ownerId) {
      loginSuccess = true;
      localStorage.setItem("ownerId", user.ownerId);
      navigate("/dashboard/home");
      return;
    }
  } catch (error) {
    
    if (error.response && error.response.data) {
      alert(error.response.data);  
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
        className=" d-flex flex-row"
        style={{
          width: "100%",
          maxWidth: "1200px",
          height: "600px",
          overflow: "hidden",
          borderRadius: "12px"
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

          {/* RIGHT FORM */}
          <Col
            md={6}
            className="p-5 d-flex flex-column justify-content-center"
            style={{ height: "100%" }}
          >
            <h2 className="text-center mb-4" style={{ fontSize: "32px", fontWeight: "700" }}>
              Login
            </h2>

            <Form style={{ fontSize: "18px" }} onSubmit={handleSubmit}>
              <Form.Group className="mb-4">
                <Form.Label>Username</Form.Label>
                <Form.Control 
                  type="text" 
                  placeholder="Enter your username"
                  style={{ height: "50px", fontSize: "16px" }}
                  value={username}
                  onChange={(e) => setUsername(e.target.value)}
                />
              </Form.Group>

              <Form.Group className="mb-4">
                <Form.Label>Password</Form.Label>
                <Form.Control 
                  type="password" 
                  placeholder="Enter your password"
                  style={{ height: "50px", fontSize: "16px" }}
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                />
              </Form.Group>

              <Button 
                style={{
                  backgroundColor: "#F9F5EB",
                  borderColor: "#F9F5EB",
                  color: "black",
                  fontWeight: "600",
                  height: "50px",
                  fontSize: "18px"
                }}
                className="w-100"
                type="submit"
              >
                Login
              </Button>
            </Form>

            <div className="text-center mt-4" style={{ fontSize: "16px" }}>
              Don't have an account? <Link to="/sign-up">Sign Up</Link>
            </div>
          </Col>

        </Row>
      </Card>
    </Container>
  );
}

export default Login;
