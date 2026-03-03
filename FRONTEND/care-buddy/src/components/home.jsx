import { Row, Col, Card } from "react-bootstrap";
import { useState,useEffect } from "react";
import axios from "axios";

export default function Home() {

  const [aptCount, setAppointmentCount] = useState("");
  const [petCount, setPetCount] = useState("");
  const [doctorCount, setDoctorCount] = useState("");
  const [appointments, setAppointments] = useState([]);

    // Fetch today's appointments
  useEffect(() => {
    const fetchAppointments = async () => {
      try {
        const response = await axios.get(
          `http://localhost:8081/owner-service/owners/${localStorage.getItem("ownerId")}/appointments/today`
        );
        setAppointments(response.data);
      } catch (error) {
        console.log(error);
        alert("Error loading appointments");
      }
    };

    fetchAppointments(); 
  }, []); 

  // Fetch appointment count
  useEffect(() => {
    const fetchCount = async () => {
      try {
        const response = await axios.get(
          `http://localhost:8081/owner-service/owners/${localStorage.getItem("ownerId")}/appointments/count`
        );
        setAppointmentCount(response.data);
      } catch (error) {
        console.log(error);
        alert("Error loading Count");
      }
    };

    fetchCount();
  }, []);

  //fetch Pets count
    useEffect(() => {
    const fetchCount = async () => {
      try {
        const response = await axios.get(
          `http://localhost:8081/owner-service/owners/${localStorage.getItem("ownerId")}/pets/count`
        );
        setPetCount(response.data);
      } catch (error) {
        console.log(error);
        alert("Error loading Count");
      }
    };

    fetchCount();
  }, []);

  //Fetch doctor count
      useEffect(() => {
    const fetchCount = async () => {
      try {
        const response = await axios.get(
          "http://localhost:8083/doctor-service/doctors/count"
        );
        setDoctorCount(response.data);
      } catch (error) {
        console.log(error);
        alert("Error loading Count");
      }
    };

    fetchCount();
  }, []);
  return (
    <>
      <h2 className="mb-4 fw-bold">Dashboard Overview</h2>

      <Row>
        <Col md={4} className="mb-3">
          <Card className="dashboard-card" style={{ borderLeft: "6px solid #1E3A5F" }}>
            <h5 className="text-purple fw-bold" style={{color:"#1E3A5F"}}>Total Pets</h5><br/>
            <h2>{petCount}</h2>
          </Card>
        </Col>

        <Col md={4} className="mb-3">
          <Card className="dashboard-card" style={{ borderLeft: "6px solid #1E3A5F" }}>
            <h5 className="text-purple fw-bold" style={{color:"#1E3A5F"}}>Upcoming Appointments</h5><br/>
            <h2>{aptCount}</h2>
          </Card>
        </Col>

        <Col md={4} className="mb-3">
          <Card className="dashboard-card" style={{ borderLeft: "6px solid #1E3A5F" }}>
            <h5 className="text-purple fw-bold" style={{color:"#1E3A5F"}}>Doctors</h5><br/>
            <h2>{doctorCount}</h2>
          </Card>
        </Col>
      </Row>

       <Card className="dashboard-card mt-4" style={{ borderTop: "5px solid #1E3A5F" }}>
        <h4 style={{ color: "#1E3A5F" }}>Today's Appointments</h4>
        <br />

        {/* Display fetched appointments */}
        <ul style={{ fontSize: "1.1rem" }}>
          {appointments.length === 0 ? (
            <li>No appointments today</li>
          ) : (
            appointments.map((apt) => (
              <li key={apt.id}>
                {apt.pet} - {apt.doctor} - {apt.time}
              </li>
            ))
          )}
        </ul>
      </Card>
    </>
  )
}
