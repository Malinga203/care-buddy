import React from "react";
import { Container, Row, Col, Card, Nav } from "react-bootstrap";
import "./Dashboard.css"; 
import logo from "../images/logo.png";
import { Link } from "react-router-dom";
import Home from "../components/home";
import {Routes,Route } from 'react-router-dom'
import Pets from "../components/pet";
import Appointments from "../components/appointment";



export default function Dashboard() {
  
  return (
    <Container fluid>
      <Row>

        {/* --- LEFT NAVIGATION PANEL --- */}
        <Col
          xs={12}
          md={3}
          lg={2}
          className="vh-100 p-0 sidebar"
          style={{ background: "#F9F5EB" }}
        >
          <Nav className="flex-column p-3">
            <div className="d-flex justify-content-center align-items-center mb-4">
            <img
              src={logo}
              alt="logo"
              style={{ height: "120px", width: "120px" }}
            />
         
          </div>


            <div className="nav-item-div mb-2">
              <Nav.Link as={Link}to="/dashboard/home" className="fw-semibold" style={{color:"#1E3A5F"}}>
                Home
              </Nav.Link>
            </div>
            <div className="nav-item-div mb-2">
              <Nav.Link as={Link}to="/dashboard/pets" className="fw-semibold" style={{color:"#1E3A5F"}}>
                Pets
              </Nav.Link>
            </div>
            <div className="nav-item-div mb-2">
              <Nav.Link as={Link}to="/dashboard/appointments" className="fw-semibold" style={{color:"#1E3A5F"}}>
                Appointments
              </Nav.Link>
            </div>
            
            

            <div className="nav-item-div mt-4">
              <Nav.Link href="/login" className="text-danger fw-bold">
                Logout
              </Nav.Link>
            </div>
          </Nav>
        </Col>

        {/* --- MAIN CONTENT AREA --- */}
        <Col xs={12} md={9} lg={10} className="p-4">
          <Routes>
          <Route path="home" element={<Home/>} />
          <Route path="pets" element={<Pets/>} />
          <Route path="appointments" element={<Appointments/>} />
        </Routes>
        </Col>
      </Row>
    </Container>
  );
}
