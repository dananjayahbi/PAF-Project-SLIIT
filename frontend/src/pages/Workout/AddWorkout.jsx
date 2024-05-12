import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faChevronLeft } from '@fortawesome/free-solid-svg-icons';
import { Col, Row, Input, Button, Select } from 'antd';
import axios from 'axios';

// Import Google Font link
const googleFontLink = 'https://fonts.googleapis.com/css2?family=Roboto:wght@400;700&display=swap';

const { TextArea } = Input;
const { Option } = Select;

const AddWorkout = () => {
  const defaultFormData = {
    title: '',
    description: '',
    exercises: [
      {
        name: 'Squat',
        sets: 3,
        repetitions: 10,
      },
      {
        name: 'Push-ups',
        sets: 3,
        repetitions: 15,
      },
      {
        name: 'Pull-ups',
        sets: 3,
        repetitions: 8,
      },
    ],
    routine: {
      monday: 'Cardio',
      tuesday: 'Lower body',
      wednesday: 'Upper body and core',
      thursday: 'Active rest and recovery',
      friday: 'Lower body with a focus on glutes',
      saturday: 'Upper body',
      sunday: 'Rest and recovery',
    },
    photos: [],
    createdByUserId: '',
  };

  const [formData, setFormData] = useState(defaultFormData);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevState) => ({
      ...prevState,
      [name]: value,
    }));
  };

  const handleExerciseChange = (index, field, value) => {
    const newExercises = [...formData.exercises];
    newExercises[index][field] = value;
    setFormData((prevState) => ({
      ...prevState,
      exercises: newExercises,
    }));
  };

  const handleRoutineChange = (value, day) => {
    setFormData((prevState) => ({
      ...prevState,
      routine: {
        ...prevState.routine,
        [day]: value,
      },
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const url = 'http://localhost:8080/api/workoutplans/create';
      const response = await axios.post(url, formData);
      if (response.status === 200) {
        console.log(response.data);
        alert('Workout plan added successfully!');
        // Clear form data after successful submission
        setFormData(defaultFormData);
      } else {
        throw new Error('Failed to add workout plan');
      }
    } catch (error) {
      if (error.response) {
        console.error('Server responded with an error:', error.response.data);
        alert(`Failed to add workout plan: ${error.response.data.message}`);
      } else {
        console.error('There was an error!', error.message);
        alert('Failed to add workout plan. Please try again later.');
      }
    }
  };

  const handlePhotoChange = (e) => {
    const url = e.target.value;
    setFormData((prevState) => ({
      ...prevState,
      photos: [url],
    }));
  };

  return (
    <div style={{padding:100, 
      backgroundImage: 'url("https://marketplace.canva.com/EAE9Fnlonas/1/0/1600w/canva-black-minimalist-workout-exercise-gym-zoom-background-geSqu-shKsE.jpg")', // Replace 'path/to/your/image.jpg' with the actual path to your image
      backgroundSize: 'cover',
      backgroundPosition: 'center',}}>
      <div style={{ 
          display: 'flex', 
          justifyContent: 'center', 
          alignItems: 'center', 
    }}>
      <div style={{ width: '50%', padding: '20px', borderRadius: '10px', backgroundColor: 'rgba(260, 260, 260, 0.8)', boxShadow: '0 0 10px rgba(0, 0, 0, 0.2)' }}>
        <Link to="/Home" style={{ marginBottom: '20px', textDecoration: 'none', color: '#007bff' }}>
          <FontAwesomeIcon icon={faChevronLeft} style={{ marginRight: '5px' }} /> Back
        </Link> 
        <Row>
          <Col span={24}>
            <h2 style={{ textAlign: 'center', fontWeight: 500, fontSize: '25px' }}>Add Workout Plan</h2>
          </Col>
        </Row>
        <form onSubmit={handleSubmit} style={{ display: 'flex', flexDirection: 'column' }}>
          <div style={{ marginBottom: '20px' }}>
            <label style={{ fontWeight: 'bold', marginBottom: '5px' }}>Title:</label>
            <Input type="text" name="title" value={formData.title} onChange={handleChange} />
          </div>
          <div style={{ marginBottom: '20px' }}>
            <label style={{ fontWeight: 'bold', marginBottom: '5px' }}>Description:</label>
            <TextArea rows={4} name="description" value={formData.description} onChange={handleChange} />
          </div>
          <p style={{ fontWeight: 'bold', marginBottom: '20px', fontSize: '20px' }}>Exercises:</p>
          {formData.exercises.map((exercise, index) => (
            <div key={index} style={{ marginBottom: '20px', display: 'flex', alignItems: 'center' }}>
              <label style={{ fontWeight: 'bold', marginRight: '10px' }}>{`Exercise ${index + 1}:`}</label>
              <Input type="text" value={exercise.name} onChange={(e) => handleExerciseChange(index, 'name', e.target.value)} placeholder="Name" style={{ marginRight: '5px', width: '120px' }} />
              <Input type="number" value={exercise.sets} onChange={(e) => handleExerciseChange(index, 'sets', parseInt(e.target.value))} placeholder="Sets" style={{ marginRight: '5px', width: '80px' }} />
              <Input type="number" value={exercise.repetitions} onChange={(e) => handleExerciseChange(index, 'repetitions', parseInt(e.target.value))} placeholder="Repetitions" style={{ width: '100px' }} />
            </div>
          ))}
          <p style={{ fontWeight: 'bold', marginBottom: '20px', fontSize: '20px' }}>Routine:</p>
          {Object.entries(formData.routine).map(([day, value]) => (
            <div key={day} style={{ marginBottom: '20px', display: 'flex', alignItems: 'center' }}>
              <label style={{ fontWeight: 'bold' }}>{`${day.charAt(0).toUpperCase() + day.slice(1)}:`}</label>
              <Select value={value} onChange={(value) => handleRoutineChange(value, day)} style={{ marginLeft: '5px', flex: 1 }}>
                <Option value="Cardio">Cardio</Option>
                <Option value="Lower body">Lower body</Option>
                <Option value="Upper body and core">Upper body and core</Option>
                <Option value="Active rest and recovery">Active rest and recovery</Option>
                <Option value="Lower body with a focus on glutes">Lower body with a focus on glutes</Option>
                <Option value="Upper body">Upper body</Option>
                <Option value="Rest and recovery">Rest and recovery</Option>
              </Select>
            </div>
          ))}
          <div style={{ marginBottom: '20px' }}>
            <label style={{ fontWeight: 'bold', marginBottom: '5px' }}>Photos URL:</label>
            <Input type="text" onChange={handlePhotoChange} />
          </div>
          <div style={{ marginBottom: '20px' }}>
            <label style={{ fontWeight: 'bold', marginBottom: '5px' }}>Created By User ID:</label>
            <Input type="text" name="createdByUserId" value={formData.createdByUserId} onChange={handleChange} />
          </div>
          <div style={{ display: 'flex', justifyContent: 'center' }}>
            <Button type="primary" htmlType="submit">Add Workout Plan</Button>
          </div>
        </form>
      </div>
    </div>
    </div>
  );
};

export default AddWorkout;
