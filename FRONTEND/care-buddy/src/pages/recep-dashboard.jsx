import React from "react";
import { Container, Row, Col, Card, Nav } from "react-bootstrap";
import "./Dashboard.css"; 
import logo from "../images/logo.png";
import { Link } from "react-router-dom";
import Home from "../components/home-recep";
import {Routes,Route } from 'react-router-dom'
import Doctors from "../components/doctor";
import Appointments from "../components/appointment-recep";
import MedicalRecords from "../components/medicalRecords";
import Pets from "../components/recep-pets";

export default function RecepDashboard() {
  return (
    <Container fluid>
      <Row>

        {/*LEFT NAVIGATION PANEL */}
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
              <Nav.Link as={Link}to="/recep-dashboard/home" className="fw-semibold" style={{color:"#1E3A5F"}}>
                Home
              </Nav.Link>
            </div>
            <div className="nav-item-div mb-2">
              <Nav.Link as={Link}to="/recep-dashboard/appointments" className="fw-semibold" style={{color:"#1E3A5F"}}>
                Appointments
              </Nav.Link>
            </div>
            <div className="nav-item-div mb-2">
              <Nav.Link href="/recep-dashboard/doctors" className="fw-semibold" style={{color:"#1E3A5F"}}>
                Doctors
              </Nav.Link>
            </div>
            <div className="nav-item-div mb-2">
              <Nav.Link href="/recep-dashboard/pets" className="fw-semibold" style={{color:"#1E3A5F"}}>
                Pets
              </Nav.Link>
            </div>
            <div className="nav-item-div mb-2">
              <Nav.Link as={Link}to="/recep-dashboard/medical-records" className="fw-semibold" style={{color:"#1E3A5F"}}>
                Medical Records
              </Nav.Link>
            </div>

            <div className="nav-item-div mt-4">
              <Nav.Link href="/login" className="text-danger fw-bold">
                Logout
              </Nav.Link>
            </div>
          </Nav>
        </Col>

        {/* MAIN CONTENT AREA*/}
        <Col xs={12} md={9} lg={10} className="p-4">
          <Routes>
          <Route path="doctors" element={<Doctors/>} />
          <Route path="home" element={<Home/>} />
          <Route path="appointments" element={<Appointments/>} />
          <Route path="medical-records" element={<MedicalRecords/>} />
          <Route path="pets" element={<Pets/>} />
        </Routes>
        </Col>
      </Row>
    </Container>
  );

}
