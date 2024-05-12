import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useParams, Link } from 'react-router-dom';
import { Spin, Typography, Divider, Image, Row, Col, Button, Modal } from 'antd';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faArrowLeft, faEdit, faTrash } from '@fortawesome/free-solid-svg-icons';

const { Title, Text } = Typography;
const { confirm } = Modal;

const ReadWorkout = () => {
  const { id } = useParams();
  const [workoutPlan, setWorkoutPlan] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchWorkoutPlan = async () => {
      try {
        const response = await axios.get(`http://localhost:8080/api/workoutplans/${id}`);
        setWorkoutPlan(response.data);
        setLoading(false);
      } catch (error) {
        setError(error);
        setLoading(false);
      }
    };

    fetchWorkoutPlan();
  }, [id]);

  const handleDelete = async () => {
    try {
      await axios.delete(`http://localhost:8080/api/workoutplans/${id}`);
      // Handle success, such as showing a success message or redirecting to another page
    } catch (error) {
      // Handle error, such as showing an error message to the user
    }
  };

  const showDeleteConfirm = () => {
    confirm({
      title: 'Are you sure you want to delete this workout plan?',
      icon: <FontAwesomeIcon icon={faTrash} />,
      content: 'This action cannot be undone.',
      okText: 'Yes' ,
      okType: 'danger',
      cancelText: 'No',
      onOk() {
        handleDelete();
        history.push('/AllWorkout');
      },
      onCancel() {
        console.log('Cancel');
      },
    });
  };

  if (loading) return <Spin size="large" />;
  if (error) return <div>Error: {error.message}</div>;
  if (!workoutPlan) return <div>No workout plan found for the provided ID</div>;

  return (
    <div
      style={{
        padding: '100px',
        backgroundImage: 'url("https://images.pexels.com/photos/1552106/pexels-photo-1552106.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1")',
        backgroundSize: 'cover',
        backgroundPosition: 'center',
        minHeight: '100vh',
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
      }}
    >
      <div style={{ width: '80%' }}>
        <Row justify="center" align="middle">
          <Col xs={24} sm={20} md={16} lg={12}>
            <div style={{ padding: '20px', backgroundColor: 'white', borderRadius: '10px', boxShadow: '0 0 10px rgba(0, 0, 0, 0.1)' }}>
              <div style={{ marginBottom: '20px' }}>
                {/* Back button */}
                <Link to="/AllWorkout" style={{ marginRight: '10px', textDecoration: 'none' }}>
                  <Button type="primary">
                    <FontAwesomeIcon icon={faArrowLeft} style={{ marginRight: '5px'  }} />
                    Back
                  </Button>
                </Link>
                {/* Update button */}
                <Link to={`/UpdateWorkout/${id}`} style={{ marginRight: '10px', textDecoration: 'none' }}>
                  <Button type="primary" style={{ background: 'green', borderColor: 'green' }}>
                    <FontAwesomeIcon  style={{ marginRight: '5px' }} icon={faEdit} />
                    Update
                  </Button>
                </Link>
                {/* Delete button */}
                <Button type="primary" danger onClick={showDeleteConfirm} style={{ backgroundColor: 'red', borderColor: 'red', marginBlockEnd : '5px' }}>
                  <FontAwesomeIcon icon={faTrash} />
                  Delete
                </Button>
              </div>
              <br/>
              <Title level={2} style={{ textAlign: "center", color: "blue" }}>Workout Plan Details</Title>
              <Text strong style={{ color: "purple",fontSize:'20px' }}>Title:</Text>
              <Text style={{fontSize:'20px'}}>{workoutPlan.title}</Text>
              <Divider />
              <Text strong style={{ color: "purple" ,fontSize:'20px' }}>Description:</Text>
              <Text style={{fontSize:'20px'}}>{workoutPlan.description}</Text>
              <Divider />
              <Text strong style={{ color: "purple" ,fontSize:'20px'}}>Exercises:</Text>
              <ul>
                {workoutPlan.exercises.map((exercise, index) => (
                  <li style={{ fontSize:'17px'}} key={index}>
                    {exercise.name} - Sets: {exercise.sets}, Repetitions: {exercise.repetitions}
                  </li>
                ))}
              </ul>
              <Divider />
              <Text strong style={{ color: "purple",fontSize:'20px' }}>Routine:</Text>
              <ul>
                {Object.entries(workoutPlan.routine).map(([day, activity]) => (
                  <li style={{ fontSize:'17px'}} key={day}>{day}: {activity}</li>
                ))}
              </ul>
              <Divider />
              <Divider />
              {workoutPlan.photos.length > 0 && (
                <div>
                  <Text strong style={{ color: "purple" }}>Photos:</Text>
                  <div>
                    {workoutPlan.photos.map((photo, index) => (
                      <Image key={index} src={photo} alt={`Photo ${index + 1}`} style={{ maxWidth: '200px' }} />
                    ))}
                  </div>
                </div>
              )}
            </div>
          </Col>
        </Row>
      </div>
    </div>
  );
};

export default ReadWorkout;
