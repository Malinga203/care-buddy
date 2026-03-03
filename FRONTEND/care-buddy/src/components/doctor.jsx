import React, { useState, useEffect } from "react";
import { Card, Button, Form, Modal } from "react-bootstrap";
import axios from "axios";

export default function Doctors() {
  const [showAdd, setShowAdd] = useState(false);
  const [showEdit, setShowEdit] = useState(false);

  const [doctorName, setDoctorName] = useState("");
  const [specialization, setSpecialization] = useState("");
  const [email, setEmail] = useState("");
  const [telephone, setTelephone] = useState("");

  const [doctors, setDoctors] = useState([]);
  const [selectedDoctor, setSelectedDoctor] = useState(null);

  // Load doctors
  useEffect(() => {
    const fetchDoctors = async () => {
      try {
        const response = await axios.get(
          "http://localhost:8083/doctor-service/doctors"
        );
        setDoctors(response.data);
      } catch (error) {
        if (error.response && error.response.data) {
      alert(error.response.data.message); 
    } else {
      alert("Something went wrong"); 
    }
      }
    };

    fetchDoctors();
  }, []);


  // OPEN ADD MODAL
  const openAddModal = () => {
    setDoctorName("");
    setSpecialization("");
    setEmail("");
    setTelephone("");
    setSelectedDoctor(null);

    setShowAdd(true);
  };


  // OPEN EDIT MODAL
  const openEditModal = (doc) => {
    setSelectedDoctor(doc);

    setDoctorName(doc.name);
    setSpecialization(doc.specialization);
    setEmail(doc.email);
    setTelephone(doc.telephone);

    setShowEdit(true);
  };


  // ADD DOCTOR
  const addDoctor = async () => {
    if (!doctorName || !specialization || !email || !telephone) {
      alert("Please fill all fields!");
      return;
    }

    const newDoctor = {
      name: doctorName,
      specialization,
      email,
      telephone,
    };

    try {
      const response = await axios.post(
        "http://localhost:8083/doctor-service/doctors",
        newDoctor
      );

      setDoctors([...doctors, response.data]);
      setShowAdd(false);
    } catch (error) {
      if (error.response && error.response.data) {
      alert(error.response.data.message); 
    } else {
      alert("Something went wrong"); 
    }
    }
  };


  // UPDATE DOCTOR (PUT)
  const updateDoctor = async () => {
    if (!selectedDoctor) return;

    const updatedDoctor = {
      id:selectedDoctor.id,
      name: doctorName,
      specialization,
      email,
      telephone,
    };

    try {
      await axios.put(
        `http://localhost:8083/doctor-service/doctors`,
        updatedDoctor
      );

      const newList = doctors.map((d) =>
        d.id === selectedDoctor.id ? { ...updatedDoctor, id: d.id } : d
      );

      setDoctors(newList);
      setShowEdit(false);
    } catch (error) {
      if (error.response && error.response.data) {
      alert(error.response.data.message); 
    } else {
      alert("Something went wrong"); 
    }
    }
  };

 
  // DELETE DOCTOR
  const deleteDoctor = async (id) => {
    if (!window.confirm("Delete this doctor?")) return;

    try {
      await axios.delete(`http://localhost:8083/doctor-service/doctors/${id}`);
      setDoctors(doctors.filter((d) => d.id !== id));
    } catch (error) {
     if (error.response && error.response.data) {
      alert(error.response.data.message); 
    } else {
      alert("Something went wrong"); 
    }
    }
  };

  return (
    <div className="container-fluid">
      <h2 className="fw-bold mb-4" style={{ color: "#1E3A5F" }}>
        Doctors
      </h2>

      <Card
        className="shadow-sm rounded-3 p-4 mb-4"
        style={{ background: "#F4EFE6", border: "2px solid #1E3A5F" }}
      >
        <div className="d-flex justify-content-between align-items-center">
          <h5 className="fw-semibold" style={{ color: "#1E3A5F" }}>
            Manage Doctors
          </h5>

          <Button
            onClick={openAddModal}
            className="fw-bold"
            style={{ background: "#1E3A5F", border: "none" }}
          >
            Add Doctor
          </Button>
        </div>
      </Card>

      <Card className="shadow-sm rounded-3 p-4 mb-4" style={{ background: "#FFFFFF" }}>
  <h5 className="fw-semibold mb-3" style={{ color: "#1E3A5F" }}>
    All Doctors
  </h5>

  <table className="table table-bordered text-center">
    <thead style={{ background: "#F4EFE6" }}>
      <tr>
        <th>ID</th>
        <th>Name</th>
        <th>Specialization</th>
        <th>Email</th>
        <th>Telephone</th>
        <th>Actions</th>
      </tr>
    </thead>

    <tbody>
      {doctors.length === 0 ? (
        <tr>
          <td colSpan="6" className="py-3 text-muted">
            No doctors available
          </td>
        </tr>
      ) : (
        doctors.map((doc) => (
          <tr key={doc.id}>
            <td>{doc.id}</td>
            <td>{doc.name}</td>
            <td>{doc.specialization}</td>
            <td>{doc.email}</td>
            <td>{doc.telephone}</td>

            <td>
              <Button
                size="sm"
                className="me-2"
                style={{ background: "#1E3A5F", border: "none" }}
                onClick={() => openEditModal(doc)}
              >
                Edit
              </Button>

              <Button
                size="sm"
                variant="danger"
                onClick={() => deleteDoctor(doc.id)}
              >
                Delete
              </Button>
            </td>
          </tr>
        ))
      )}
    </tbody>
  </table>
</Card>


      {/* ADD MODAL */}
      <Modal show={showAdd} onHide={() => setShowAdd(false)} centered>
        <Modal.Header closeButton>
          <Modal.Title style={{ color: "#1E3A5F" }}>Add Doctor</Modal.Title>
        </Modal.Header>

        <Modal.Body style={{ background: "#F9F5EB" }}>
          <Form>
            <Form.Group className="mb-3">
              <Form.Label>Doctor Name</Form.Label>
              <Form.Control
                type="text"
                value={doctorName}
                onChange={(e) => setDoctorName(e.target.value)}
              />
            </Form.Group>

            <Form.Group className="mb-3">
              <Form.Label>Specialization</Form.Label>
              <Form.Control
                type="text"
                value={specialization}
                onChange={(e) => setSpecialization(e.target.value)}
              />
            </Form.Group>

            <Form.Group className="mb-3">
              <Form.Label>Email</Form.Label>
              <Form.Control
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
              />
            </Form.Group>

            <Form.Group className="mb-3">
              <Form.Label>Telephone</Form.Label>
              <Form.Control
                type="text"
                value={telephone}
                onChange={(e) => setTelephone(e.target.value)}
              />
            </Form.Group>
          </Form>
        </Modal.Body>

        <Modal.Footer>
          <Button variant="secondary" onClick={() => setShowAdd(false)}>
            Cancel
          </Button>
          <Button
            style={{ background: "#1E3A5F", border: "none" }}
            onClick={addDoctor}
          >
            Add
          </Button>
        </Modal.Footer>
      </Modal>

      {/* EDIT MODAL */}
      <Modal show={showEdit} onHide={() => setShowEdit(false)} centered>
        <Modal.Header closeButton>
          <Modal.Title style={{ color: "#1E3A5F" }}>Edit Doctor</Modal.Title>
        </Modal.Header>

        <Modal.Body style={{ background: "#F9F5EB" }}>
          <Form>
            <Form.Group className="mb-3">
              <Form.Label>Doctor ID</Form.Label>
              <p className="fw-bold">{selectedDoctor?.id}</p>
            </Form.Group>

            <Form.Group className="mb-3">
              <Form.Label>Doctor Name</Form.Label>
              <Form.Control
                type="text"
                value={doctorName}
                onChange={(e) => setDoctorName(e.target.value)}
              />
            </Form.Group>

            <Form.Group className="mb-3">
              <Form.Label>Specialization</Form.Label>
              <Form.Control
                type="text"
                value={specialization}
                onChange={(e) => setSpecialization(e.target.value)}
              />
            </Form.Group>

            <Form.Group className="mb-3">
              <Form.Label>Email</Form.Label>
              <Form.Control
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
              />
            </Form.Group>

            <Form.Group className="mb-3">
              <Form.Label>Telephone</Form.Label>
              <Form.Control
                type="text"
                value={telephone}
                onChange={(e) => setTelephone(e.target.value)}
              />
            </Form.Group>
          </Form>
        </Modal.Body>

        <Modal.Footer>
          <Button variant="secondary" onClick={() => setShowEdit(false)}>
            Cancel
          </Button>
          <Button
            style={{ background: "#1E3A5F", border: "none" }}
            onClick={updateDoctor}
          >
            Update
          </Button>
        </Modal.Footer>
      </Modal>
    </div>
  );
}
