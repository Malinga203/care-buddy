import React, { useState, useEffect } from "react";
import { Card, Button, Form, Modal } from "react-bootstrap";
import Select from "react-select";
import axios from "axios";

export default function Appointments() {
  const [show, setShow] = useState(false);
  const [appointments, setAppointments] = useState([]);
  const [doctorList, setDoctors] = useState([]);
  const [selectedDoctor, setSelectedDoctor] = useState(null);

  const pets = ["Buddy", "Max", "Bella", "Charlie"];
  const petOptions = pets.map((p) => ({ label: p, value: p }));
  const [selectedPet, setSelectedPet] = useState(null);

  const [date, setDate] = useState("");
  const [time, setTime] = useState("");

  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);

  useEffect(() => {
    const fetchAppointments = async () => {
      try {
        const response = await axios.get("http://localhost:8082/appointment-service/appointments");
        setAppointments(response.data);
      } catch (error) {
        console.error("Error fetching appointments:", error);
        alert("Failed to load appointments from server.");
      }
    };
    fetchAppointments();
  }, []);

  useEffect(() => {
    const fetchDoctors = async () => {
      try {
        const response = await axios.get("http://localhost:8083/doctor-service/doctors");
        setDoctors(response.data);
      } catch (error) {
        console.error("Error fetching Doctors", error);
        alert("Failed to load Doctors from server.");
      }
    };
    fetchDoctors();
  }, []);

  // CANCEL APPOINTMENT WITH CONFIRMATION
  const cancelAppointment = async (id) => {
    const confirmCancel = window.confirm("Are you sure you want to cancel this appointment?");
    if (!confirmCancel) return; // Exit if user clicks Cancel

    try {
      await axios.delete(`http://localhost:8082/appointment-service/appointments/${id}`);

      // Remove from frontend state
      const updated = appointments.filter((a) => a.id !== id);
      setAppointments(updated);

      alert("Appointment canceled successfully");
    } catch (error) {
      console.error("Error canceling appointment:", error);
      alert("Failed to cancel appointment");
    }
  };

  // CHANGE DATE MODAL
  const [showDateModal, setShowDateModal] = useState(false);
  const [newDate, setNewDate] = useState("");
  const [selectedIndex, setSelectedIndex] = useState(null);

  const openDateModal = (index) => {
    setSelectedIndex(index);
    setNewDate(appointments[index].date);
    setShowDateModal(true);
  };

  return (
    <div className="container-fluid">
      <h2 className="fw-bold mb-4" style={{ color: "#1E3A5F" }}>Appointments</h2>

      {/* APPOINTMENTS TABLE */}
      <Card className="shadow-sm rounded-3 p-4 mb-4" style={{ background: "#FFFFFF" }}>
        <h5 className="fw-semibold mb-3" style={{ color: "#1E3A5F" }}>Appointments</h5>

        <table className="table table-bordered text-center">
          <thead style={{ background: "#F4EFE6" }}>
            <tr>
              <th>Appointment ID</th>
              <th>Doctor</th>
              <th>Pet</th>
              <th>Date</th>
              <th>Time</th>
              <th>Actions</th>
            </tr>
          </thead>

          <tbody>
            {appointments.length === 0 ? (
              <tr>
                <td colSpan="6" className="py-3 text-muted">
                  No appointments available
                </td>
              </tr>
            ) : (
              appointments.map((a, i) => {
                const appointmentDateTime = new Date(`${a.date}T${a.time}`);
                const now = new Date();
                const isPast = appointmentDateTime <= now;

                return (
                  <tr key={i}>
                    <td>{a.id}</td>
                    <td>{a.doctor}</td>
                    <td>{a.pet}</td>
                    <td>{a.date}</td>
                    <td>{a.time}</td>
                    <td className="d-flex gap-2 justify-content-center">
                      {isPast ? (
                        <span className="text-success fw-bold">Completed</span>
                      ) : (
                        <>
                          <Button size="sm" variant="primary" onClick={() => openDateModal(i)}>Edit</Button>
                          <Button size="sm" variant="danger" onClick={() => cancelAppointment(a.id)}>Cancel</Button>
                        </>
                      )}
                    </td>
                  </tr>
                );
              })
            )}
          </tbody>
        </table>
      </Card>

      {/* EDIT APPOINTMENT MODAL */}
      <Modal show={showDateModal} onHide={() => setShowDateModal(false)} centered>
        <Modal.Header closeButton>
          <Modal.Title style={{ color: "#1E3A5F" }}>Edit Appointment</Modal.Title>
        </Modal.Header>
        <Modal.Body style={{ background: "#F9F5EB" }}>
          {selectedIndex !== null && (
            <>
              <p><strong>Appointment ID:</strong> {appointments[selectedIndex].id}</p>

              <Form.Group className="mb-3">
                <Form.Label className="fw-semibold" style={{ color: "#1E3A5F" }}>Doctor</Form.Label>
                <Select
                  options={doctorList.map(doc => ({ label: doc.name, value: doc.id }))}
                  value={{
                    label: appointments[selectedIndex].doctor,
                    value: appointments[selectedIndex].id
                  }}
                  onChange={(selected) => {
                    const updated = [...appointments];
                    updated[selectedIndex].doctor = selected.label;
                    setAppointments(updated);
                  }}
                />
              </Form.Group>

              <Form.Group className="mb-3">
                <Form.Label className="fw-semibold" style={{ color: "#1E3A5F" }}>Pet</Form.Label>
                <Select
                  options={petOptions}
                  value={{
                    label: appointments[selectedIndex].pet,
                    value: appointments[selectedIndex].pet
                  }}
                  onChange={(selected) => {
                    const updated = [...appointments];
                    updated[selectedIndex].pet = selected.value;
                    setAppointments(updated);
                  }}
                />
              </Form.Group>

              <Form.Group className="mb-3">
                <Form.Label className="fw-semibold" style={{ color: "#1E3A5F" }}>Date</Form.Label>
                <Form.Control
                  type="date"
                  value={appointments[selectedIndex].date}
                  onChange={(e) => {
                    const updated = [...appointments];
                    updated[selectedIndex].date = e.target.value;
                    setAppointments(updated);
                  }}
                />
              </Form.Group>

              <Form.Group className="mb-3">
                <Form.Label className="fw-semibold" style={{ color: "#1E3A5F" }}>Time</Form.Label>
                <Form.Control
                  type="time"
                  value={appointments[selectedIndex].time}
                  onChange={(e) => {
                    const updated = [...appointments];
                    updated[selectedIndex].time = e.target.value;
                    setAppointments(updated);
                  }}
                />
              </Form.Group>
            </>
          )}
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={() => setShowDateModal(false)}>Cancel</Button>
          <Button
            onClick={() => {
              const apt = appointments[selectedIndex];
              axios.put(`http://localhost:8082/appointment-service/appointments`, apt)
                .then(() => {
                  alert("Appointment updated successfully");
                  setShowDateModal(false);
                })
                .catch((err) => {
                  console.error(err);
                  alert("Failed to update appointment");
                });
            }}
            style={{ background: "#1E3A5F", border: "none" }}
          >
            Update Appointment
          </Button>
        </Modal.Footer>
      </Modal>
    </div>
  );
}
