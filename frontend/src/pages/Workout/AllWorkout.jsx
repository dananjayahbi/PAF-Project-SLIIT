import React, { useState, useEffect } from "react";
import axios from "axios";
import { Card, Typography, Col, Row, Button, Input } from "antd";
import { Link } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faHome, faPlus, faTable } from "@fortawesome/free-solid-svg-icons";
import jsPDF from "jspdf";

const { Meta } = Card;
const { Search } = Input;

const GetAllWorkoutPlans = () => {
  const [workoutPlans, setWorkoutPlans] = useState([]);
  const [filteredWorkoutPlans, setFilteredWorkoutPlans] = useState([]);

  useEffect(() => {
    const fetchWorkoutPlans = async () => {
      try {
        const response = await axios.get("http://localhost:8080/api/workoutplans/all");
        setWorkoutPlans(response.data);
        setFilteredWorkoutPlans(response.data);
      } catch (error) {
        console.error("Error fetching workout plans:", error);
      }
    };

    fetchWorkoutPlans();
  }, []);

  const exportPDF = () => {
    const unit = "pt";
    const size = "A4";
    const orientation = "portrait";

    const doc = new jsPDF(orientation, unit, size);

    doc.setFontSize(18);
    doc.setFont("helvetica", "bold");

    const title = "Workout Plans";
    doc.text(title, 40, 40);

    doc.setFontSize(12);
    doc.setFont("helvetica", "normal");

    const headers = [["Title", "Description"]];

    const data = filteredWorkoutPlans.map((workout) => [workout.title, workout.description]);

    doc.autoTable({
      startY: 60,
      head: headers,
      body: data,
      theme: "striped",
      styles: {
        font: "helvetica",
        fontStyle: "normal",
        textColor: [0, 0, 0],
        halign: "center",
        valign: "middle",
        cellPadding: 8,
        fontSize: 10,
      },
      headStyles: {
        fillColor: [176, 196, 222],
        textColor: [255, 255, 255],
      },
      margin: { top: 10 },
    });

    doc.save("workout_plans.pdf");
  };

  const handleSearch = (value) => {
    const filteredPlans = workoutPlans.filter((plan) =>
      plan.title.toLowerCase().includes(value.toLowerCase())
    );
    setFilteredWorkoutPlans(filteredPlans);
  };

  const handleAddWorkout = () => {
    // Implement logic to add a new workout
    console.log("Add workout button clicked");
  };

  return (
    <div
      style={{
        padding: 50,
        margin: "auto",
        backgroundColor: "#f0f2f5",
        backgroundImage:
          "url('https://img.freepik.com/free-vector/night-fitness-gym-room-interior-sport-workout-vector-illustration-weight-exercise-equipment-gymnasium-treadmill-elliptical-trainer-cardio-studio-with-cityscape-moonlight_107791-23143.jpg')",
        backgroundSize: "cover",
      }}
    >
      <h2
        style={{
          marginBottom: '100px',
          marginTop: '80px',
          textAlign: "center",
          fontWeight: 400,
          fontSize: "100px",
          color: "white",
          padding: "10px",
          borderRadius: "8px",
        }}
      >
        All Workout Plans
      </h2>
      <div style={{ textAlign: "center", marginBottom: 25 }}>
        <Link to="/workout" style={{ marginRight: 15 }}>
          <Button>
            <FontAwesomeIcon icon={faHome} />
          </Button>
        </Link>
        <Search
          placeholder="Search workout plans"
          onSearch={handleSearch}
          enterButton
          style={{ width: 300, marginRight: 15 }}
        />
        <Link to="/AddWorkout" style={{ marginRight: '10px', textDecoration: 'none' }}>
          <Button type="primary" style={{ marginRight: '10px' }} icon={<FontAwesomeIcon icon={faPlus} />}>Add Workout</Button>
        </Link>    
        <Link to="/ViewAllWorkout" style={{ marginRight: '10px', textDecoration: 'none' }}>
          <Button type="primary" style={{ marginRight: '10px' }} icon={<FontAwesomeIcon icon={faTable} />}>Dashboard</Button>
        </Link>
        <Button onClick={exportPDF} type="primary">
          Export PDF
        </Button>
      </div>

      <Row gutter={[20, 50]} justify="center">
        {filteredWorkoutPlans.map((workoutPlan) => (
          <Col key={workoutPlan.id} xs={24} sm={12} md={8} lg={6}>
            <Card hoverable style={{ borderRadius: "8px", display: "flex", flexDirection: "column" }}>
              <div style={{ flex: 1 }}>
                {workoutPlan.photos && workoutPlan.photos.length > 0 && (
                  <img
                    alt={workoutPlan.title}
                    src={workoutPlan.photos[0]}
                    style={{
                      width: "100%",
                      height: "auto",
                      borderTopLeftRadius: "8px",
                      borderTopRightRadius: "8px",
                    }}
                  />
                )}
              </div>
              <Meta
                title={<Typography.Title level={5}>{workoutPlan.title}</Typography.Title>}
                description={
                  <div>
                    <Typography.Paragraph>
                      <strong>Description:</strong>{" "}
                      <span style={{ backgroundColor: "yellow" }}>{workoutPlan.description}</span>
                    </Typography.Paragraph>
                    <Typography.Paragraph>
                      <strong>Exercises:</strong>{" "}
                      {workoutPlan.exercises &&
                        workoutPlan.exercises.map((exercise, index) => (
                          <span
                            key={index}
                            style={{
                              marginRight: "5px",
                              marginBottom: "5px",
                              backgroundColor: "#e6f7ff",
                              padding: "5px",
                              borderRadius: "5px",
                            }}
                          >
                            {exercise.name} - {exercise.sets} sets of {exercise.repetitions}
                          </span>
                        ))}
                    </Typography.Paragraph>
                    <Typography.Paragraph>
                      <strong>Routine:</strong>{" "}
                      {workoutPlan.routine &&
                        Object.keys(workoutPlan.routine).map((day, index) => (
                          <span
                            key={index}
                            style={{
                              marginRight: "5px",
                              marginBottom: "5px",
                              backgroundColor: "#f6ffed",
                              padding: "5px",
                              borderRadius: "5px",
                            }}
                          >
                            {day}: {workoutPlan.routine[day]}
                          </span>
                        ))}
                    </Typography.Paragraph>
                  </div>
                }
              />
              {/* Add button to view workout plan details */}
              <Link to={`/ReadWorkout/${workoutPlan.id}`} style={{ marginTop: '10px' }}>
                <Button type="primary">View Details</Button>
              </Link>
            </Card>
          </Col>
        ))}
      </Row>
    </div>
  );
};

export default GetAllWorkoutPlans;
