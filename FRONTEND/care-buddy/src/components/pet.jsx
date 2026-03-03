import React, { useState, useEffect } from "react";
import { Card, Button, Modal, Form, Row, Col, Table } from "react-bootstrap";
import axios from "axios";

export default function Pets() {
  const [showAdd, setShowAdd] = useState(false);
  const [showEdit, setShowEdit] = useState(false);
  const [showRecords, setShowRecords] = useState(false);

  const [pets, setPets] = useState([]);
  const [records, setRecords] = useState([]);
  const [loadingRecords, setLoadingRecords] = useState(false);

  const [newPet, setNewPet] = useState({
    name: "",
    type: "",
    breed: "",
    age: "",
    ownerID: localStorage.getItem("ownerId")
  });

  const [editPet, setEditPet] = useState({
    id: null,
    name: "",
    type: "",
    breed: "",
    age: "",
  });

  // Fetch pets
  const fetchPets = async () => {
    try {
      const response = await axios.get(
        `http://localhost:8081/owner-service/owners/${localStorage.getItem("ownerId")}/pets`
      );
      setPets(response.data);
    } catch (error) {
      console.error("Error fetching pets:", error);
      alert("Failed to load pets from the database!");
    }
  };

  useEffect(() => {
    fetchPets();
  }, []);

  // Add pet
  const handleAddPet = async () => {
    if (!newPet.name || !newPet.age || !newPet.breed || !newPet.type) {
      alert("Please fill in all the fields");
      return;
    }
    try {
      const response = await axios.post(
        "http://localhost:8084/pet-service/pets",
        newPet
      );
      setPets([...pets, response.data]);
      setNewPet({ name: "", type: "", breed: "", age: "", ownerID: localStorage.getItem("ownerId") });
      setShowAdd(false);
      alert("Pet added successfully!");
    } catch (error) {
      console.error("Error adding pet:", error);
      alert("Failed to add pet!");
    }
  };

  // Delete Pet
const handleDeletePet = async (id) => {
  const confirmDelete = window.confirm("Are you sure you want to delete this pet?");
  if (!confirmDelete) return; 

  try {
    await axios.delete(`http://localhost:8084/pet-service/pets/${id}`);
    await fetchPets();
    setShowEdit(false);
    alert("Pet deleted successfully!");
  } catch (error) {
    console.error("Error deleting pet:", error);
    alert("Failed to delete pet");
  }
};


  // Edit pet
  const openEditModal = (pet) => {
    setEditPet(pet);
    setShowEdit(true);
  };

  const handleUpdatePet = async () => {
    if (!editPet.name || !editPet.age || !editPet.breed || !editPet.type) {
      alert("Please fill in all the fields");
      return;
    }
    try {
      await axios.put("http://localhost:8084/pet-service/pets", editPet);
      await fetchPets();
      setShowEdit(false);
      alert("Pet updated successfully!");
    } catch (error) {
      console.error("Error updating pet:", error);
      alert("Failed to update pet");
    }
  };

  // Fetch medical records for a pet
  const fetchMedicalRecords = async (pet) => {
    setLoadingRecords(true);
    try {
      const response = await axios.get(
        `http://localhost:8084/pet-service/pets/${pet.id}/medical-records`
      );
      setRecords(response.data);
      setShowRecords(true);
    } catch (error) {
      console.error("Error fetching medical records:", error);
      alert("Failed to fetch medical records!");
    } finally {
      setLoadingRecords(false);
    }
  };

  return (
    <div className="p-3">
      <h2 className="fw-bold mb-4" style={{ color: "#1E3A5F" }}>Pets</h2>

      {/* PET CARDS */}
      <Row xs={1} sm={2} md={3} lg={4} className="g-4">
        {pets.map((pet) => (
          <Col key={pet.id}>
            <Card
              className="shadow-sm rounded-3 p-2"
              style={{
                border: "none",
                borderLeft: "6px solid #1E3A5F",
                background: "#F4EFE6",
                height: "240px",
                cursor: "pointer",
              }}
              onClick={() => openEditModal(pet)}
            >
              <Card.Body>
                <Card.Title className="fw-semibold" style={{ color: "#1E3A5F" }}>
                  {pet.name}
                </Card.Title>
                <Card.Text>Type: {pet.type}</Card.Text>
                <Card.Text>Breed: {pet.breed}</Card.Text>
                <Card.Text>Age: {pet.age}</Card.Text>

                {/* Medical Records Button */}
                <Button
                  className="mt-2"
                  style={{ background: "#1E3A5F", border: "none", width: "100%", fontWeight: "500" }}
                  onClick={(e) => {
                    e.stopPropagation();
                    fetchMedicalRecords(pet);
                  }}
                >
                  Medical Records
                </Button>
              </Card.Body>
            </Card>
          </Col>
        ))}

        {/* ADD PET CARD */}
        <Col>
          <Card
            className="shadow-sm rounded-3 p-3 d-flex justify-content-center align-items-center"
            style={{ border: "2px dashed #1E3A5F", cursor: "pointer", background: "#F4EFE6", height: "240px" }}
            onClick={() => setShowAdd(true)}
          >
            <h5 className="fw-semibold" style={{ color: "#1E3A5F" }}>+ Add New Pet</h5>
          </Card>
        </Col>
      </Row>

      {/* ADD PET MODAL */}
      <Modal show={showAdd} onHide={() => setShowAdd(false)} centered>
        <Modal.Header closeButton>
          <Modal.Title>Add Pet</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Form>
            <Form.Group className="mb-3">
              <Form.Label>Pet Name</Form.Label>
              <Form.Control type="text" value={newPet.name} onChange={(e) => setNewPet({ ...newPet, name: e.target.value })} />
            </Form.Group>
            <Form.Group className="mb-3">
              <Form.Label>Pet Type</Form.Label>
              <Form.Control type="text" value={newPet.type} onChange={(e) => setNewPet({ ...newPet, type: e.target.value })} />
            </Form.Group>
            <Form.Group className="mb-3">
              <Form.Label>Breed</Form.Label>
              <Form.Control type="text" value={newPet.breed} onChange={(e) => setNewPet({ ...newPet, breed: e.target.value })} />
            </Form.Group>
            <Form.Group className="mb-3">
              <Form.Label>Age</Form.Label>
              <Form.Control type="number" value={newPet.age} onChange={(e) => setNewPet({ ...newPet, age: e.target.value })} />
            </Form.Group>
          </Form>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={() => setShowAdd(false)}>Cancel</Button>
          <Button style={{ background: "#1E3A5F", border: "none" }} onClick={handleAddPet}>Add Pet</Button>
        </Modal.Footer>
      </Modal>

      {/* EDIT PET MODAL */}
      <Modal show={showEdit} onHide={() => setShowEdit(false)} centered>
        <Modal.Header closeButton>
          <Modal.Title>Update Pet</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Form>
            <Form.Group className="mb-3">
              <Form.Label><strong>ID: {editPet.id}</strong></Form.Label>
            </Form.Group>
            <Form.Group className="mb-3">
              <Form.Label>Pet Name</Form.Label>
              <Form.Control type="text" value={editPet.name} onChange={(e) => setEditPet({ ...editPet, name: e.target.value })} />
            </Form.Group>
            <Form.Group className="mb-3">
              <Form.Label>Pet Type</Form.Label>
              <Form.Control type="text" value={editPet.type} onChange={(e) => setEditPet({ ...editPet, type: e.target.value })} />
            </Form.Group>
            <Form.Group className="mb-3">
              <Form.Label>Breed</Form.Label>
              <Form.Control type="text" value={editPet.breed} onChange={(e) => setEditPet({ ...editPet, breed: e.target.value })} />
            </Form.Group>
            <Form.Group className="mb-3">
              <Form.Label>Age</Form.Label>
              <Form.Control type="number" value={editPet.age} onChange={(e) => setEditPet({ ...editPet, age: e.target.value })} />
            </Form.Group>
          </Form>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={() => setShowEdit(false)}>Cancel</Button>
          <Button style={{ background: "#1E3A5F", border: "none" }} onClick={handleUpdatePet}>Save Changes</Button>
          <Button style={{ background: "#961818", border: "none" }} onClick={() => handleDeletePet(editPet.id)}>Delete</Button>
        </Modal.Footer>
      </Modal>

      {/* MEDICAL RECORDS MODAL */}
      <Modal show={showRecords} onHide={() => setShowRecords(false)} size="lg" centered>
        <Modal.Header closeButton>
          <Modal.Title style={{ color: "#1E3A5F" }}>Medical Records</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          {loadingRecords ? (
            <p>Loading records...</p>
          ) : records.length === 0 ? (
            <p>No medical records found for this pet.</p>
          ) : (
            <Table bordered hover className="text-center">
              <thead style={{ background: "#F4EFE6" }}>
                <tr>
                  <th>ID</th>
                  <th>Doctor</th>
                  <th>Visit Date</th>
                  <th>Diagnosis</th>
                  <th>Treatment</th>
                  <th>Next Visit</th>
                </tr>
              </thead>
              <tbody>
                {records.map((rec) => (
                  <tr key={rec.id}>
                    <td>{rec.id}</td>
                    <td>{rec.doctorName}</td>
                    <td>{rec.visitDate}</td>
                    <td>{rec.diagnosis}</td>
                    <td>{rec.treatment}</td>
                    <td>{rec.nextVisitDate || "N/A"}</td>
                  </tr>
                ))}
              </tbody>
            </Table>
          )}
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={() => setShowRecords(false)}>Close</Button>
        </Modal.Footer>
      </Modal>
    </div>
  );
}
