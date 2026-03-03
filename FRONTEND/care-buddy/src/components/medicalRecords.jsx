import React, { useState, useEffect } from "react";
import { Card, Button, Modal, Form, Row, Col, Table } from "react-bootstrap";
import axios from "axios";
import Select from "react-select";

export default function MedicalRecords() {
  const [show, setShow] = useState(false);
  const [editMode, setEditMode] = useState(false);
  const [records, setRecords] = useState([]);
  const [loading, setLoading] = useState(false);
  const [selectedRecord, setSelectedRecord] = useState(null);

  // Doctor states
  const [doctorList, setDoctors] = useState([]);
  const [selectedDoctor, setSelectedDoctor] = useState(null);

  // Form data
  const [formData, setFormData] = useState({
    petId: "",
    petName: "",
    doctorName: "",
    visitDate: "",
    diagnosis: "",
    symptoms: "",
    treatment: "",
    prescription: "",
    notes: "",
    nextVisitDate: "",
  });

  const API_URL = "http://localhost:8085/medical-record-service/medical-records";

  // Fetch doctors on load
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

  // Fetch medical records on load
  useEffect(() => {
    fetchRecords();
  }, []);

  const fetchRecords = async () => {
    setLoading(true);
    try {
      const response = await axios.get(API_URL);
      setRecords(response.data);
    } catch (err) {
      alert("Failed to fetch medical records. Make sure backend is running.");
    } finally {
      setLoading(false);
    }
  };

  // Fetch pet by ID and update petName
  const handlePetIdChange = async (e) => {
    const petId = e.target.value;
    setFormData(prev => ({ ...prev, petId }));

    if (!petId) {
      setFormData(prev => ({ ...prev, petName: "" }));
      return;
    }

    try {
      const response = await axios.get(`http://localhost:8084/pet-service/pets/${petId}`);
      if (response.data && response.data.name) {
        setFormData(prev => ({ ...prev, petName: response.data.name }));
      } else {
        setFormData(prev => ({ ...prev, petName: "" }));
      }
    } catch (err) {
      console.error("Pet not found", err);
      setFormData(prev => ({ ...prev, petName: "" }));
    }
  };

  // Handle other input changes
  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  // Add new record
  const handleAddNew = () => {
    setEditMode(false);
    setSelectedRecord(null);
    setSelectedDoctor(null);
    setFormData({
      petId: "",
      petName: "",
      doctorName: "",
      visitDate: "",
      diagnosis: "",
      symptoms: "",
      treatment: "",
      prescription: "",
      notes: "",
      nextVisitDate: "",
    });
    setShow(true);
  };

  // Edit record
  const handleEdit = (record) => {
    setEditMode(true);
    setSelectedRecord(record);
    setSelectedDoctor({ label: record.doctorName, value: record.doctorName });
    setFormData({
      petId: record.petId,
      petName: record.petName,
      doctorName: record.doctorName,
      visitDate: record.visitDate,
      diagnosis: record.diagnosis,
      symptoms: record.symptoms || "",
      treatment: record.treatment,
      prescription: record.prescription || "",
      notes: record.notes || "",
      nextVisitDate: record.nextVisitDate || "",
    });
    setShow(true);
  };

  // Submit form
  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      if (editMode) {
        await axios.put(`${API_URL}/${selectedRecord.id}`, formData);
        alert("Medical record updated successfully!");
      } else {
        await axios.post(API_URL, formData);
        alert("Medical record created successfully!");
      }
      setShow(false);
      fetchRecords();
    } catch (err) {
      alert("Failed to save medical record. Please check all fields.");
    }
  };

  // Delete record
  const handleDelete = async (id) => {
    if (window.confirm("Are you sure you want to delete this medical record?")) {
      try {
        await axios.delete(`${API_URL}/${id}`);
        alert("Medical record deleted successfully!");
        fetchRecords();
      } catch (err) {
        alert("Failed to delete medical record.");
      }
    }
  };

  return (
    <div className="container-fluid">
      <h2 className="fw-bold mb-4" style={{ color: "#1E3A5F" }}>Medical Records</h2>

      {/* Top Card */}
      <Card className="shadow-sm rounded-3 p-4 mb-4" style={{ background: "#F4EFE6", border: "2px solid #1E3A5F" }}>
        <div className="d-flex justify-content-between align-items-center">
          <h5 className="fw-semibold" style={{ color: "#1E3A5F" }}>Manage Medical Records</h5>
          <Button className="fw-bold" style={{ background: "#1E3A5F", border: "none" }} onClick={handleAddNew}>
            + Add New Record
          </Button>
        </div>
      </Card>

      {/* Records Table */}
      <Card className="shadow-sm rounded-3 p-4 mb-4" style={{ background: "#FFFFFF" }}>
        <h5 className="fw-semibold mb-3" style={{ color: "#1E3A5F" }}>Medical Records List</h5>

        {loading ? (
          <div className="text-center py-4">Loading medical records...</div>
        ) : records.length === 0 ? (
          <p className="text-center text-muted py-3">No records found</p>
        ) : (
          <Table bordered hover className="text-center">
            <thead style={{ background: "#F4EFE6" }}>
              <tr>
                <th>ID</th>
                <th>Pet Name</th>
                <th>Doctor</th>
                <th>Visit Date</th>
                <th>Diagnosis</th>
                <th>Treatment</th>
                <th>Next Visit</th>
                <th>Actions</th>
              </tr>
            </thead>
            <tbody>
              {records.map(record => (
                <tr key={record.id}>
                  <td>{record.id}</td>
                  <td>{record.petName}</td>
                  <td>{record.doctorName}</td>
                  <td>{record.visitDate}</td>
                  <td>{record.diagnosis}</td>
                  <td>{record.treatment}</td>
                  <td>{record.nextVisitDate || "N/A"}</td>
                  <td className="d-flex justify-content-center gap-2">
                    <Button size="sm" variant="primary" onClick={() => handleEdit(record)}>Edit</Button>
                    <Button size="sm" variant="danger" onClick={() => handleDelete(record.id)}>Delete</Button>
                  </td>
                </tr>
              ))}
            </tbody>
          </Table>
        )}
      </Card>

      {/* Modal */}
      <Modal show={show} onHide={() => setShow(false)} centered size="lg">
        <Modal.Header closeButton>
          <Modal.Title style={{ color: "#1E3A5F" }}>{editMode ? "Edit Medical Record" : "Add New Medical Record"}</Modal.Title>
        </Modal.Header>

        <Modal.Body style={{ background: "#F9F5EB" }}>
          <Form onSubmit={handleSubmit}>
            <Row>
              <Col md={6}>
                <Form.Group className="mb-3">
                  <Form.Label className="fw-semibold">Pet ID *</Form.Label>
                  <Form.Control
                    type="number"
                    name="petId"
                    value={formData.petId}
                    onChange={handlePetIdChange}
                    required
                  />
                </Form.Group>
              </Col>
              <Col md={6}>
                <Form.Group className="mb-3">
                  <Form.Label className="fw-semibold">Pet Name *</Form.Label>
                  <Form.Control
                    type="text"
                    name="petName"
                    value={formData.petName}
                    readOnly
                    required
                  />
                </Form.Group>
              </Col>
            </Row>

            {/* Doctor select */}
            <Form.Group className="mb-3">
              <Form.Label className="fw-semibold" style={{ color: "#1E3A5F" }}>Doctor *</Form.Label>
              <Select
                options={doctorList.map(d => ({ label: d.name, value: d.name }))}
                value={selectedDoctor}
                onChange={selected => {
                  setSelectedDoctor(selected);
                  setFormData(prev => ({ ...prev, doctorName: selected.label }));
                }}
              />
            </Form.Group>

            <Row>
              <Col md={6}>
                <Form.Group className="mb-3">
                  <Form.Label className="fw-semibold">Visit Date *</Form.Label>
                  <Form.Control type="date" name="visitDate" value={formData.visitDate} onChange={handleInputChange} required />
                </Form.Group>
              </Col>
            </Row>

            <Form.Group className="mb-3">
              <Form.Label className="fw-semibold">Diagnosis *</Form.Label>
              <Form.Control as="textarea" rows={2} name="diagnosis" value={formData.diagnosis} onChange={handleInputChange} required />
            </Form.Group>

            <Form.Group className="mb-3">
              <Form.Label className="fw-semibold">Symptoms</Form.Label>
              <Form.Control as="textarea" rows={2} name="symptoms" value={formData.symptoms} onChange={handleInputChange} />
            </Form.Group>

            <Form.Group className="mb-3">
              <Form.Label className="fw-semibold">Treatment *</Form.Label>
              <Form.Control as="textarea" rows={2} name="treatment" value={formData.treatment} onChange={handleInputChange} required />
            </Form.Group>

            <Form.Group className="mb-3">
              <Form.Label className="fw-semibold">Prescription</Form.Label>
              <Form.Control as="textarea" rows={2} name="prescription" value={formData.prescription} onChange={handleInputChange} />
            </Form.Group>

            <Form.Group className="mb-3">
              <Form.Label className="fw-semibold">Notes</Form.Label>
              <Form.Control as="textarea" rows={2} name="notes" value={formData.notes} onChange={handleInputChange} />
            </Form.Group>

            <Form.Group className="mb-3">
              <Form.Label className="fw-semibold">Next Visit Date</Form.Label>
              <Form.Control type="date" name="nextVisitDate" value={formData.nextVisitDate} onChange={handleInputChange} />
            </Form.Group>

            <div className="d-flex justify-content-end gap-2">
              <Button variant="secondary" onClick={() => setShow(false)}>Cancel</Button>
              <Button type="submit" style={{ background: "#1E3A5F", border: "none" }}>
                {editMode ? "Update Record" : "Create Record"}
              </Button>
            </div>
          </Form>
        </Modal.Body>
      </Modal>
    </div>
  );
}
