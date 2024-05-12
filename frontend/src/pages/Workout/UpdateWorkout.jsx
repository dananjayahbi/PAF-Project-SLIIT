import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useParams, Link } from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faChevronLeft } from '@fortawesome/free-solid-svg-icons';
import { Input, Button, Select } from 'antd'; 


const { Option } = Select;

const UpdateWorkout = () => {
  const { id } = useParams();

  const defaultFormData = {
    title: '',
    description: '',
    exercises: [
      {
        name: 'Suat',
        sets: 3,
        repetitions: 10
      },
      {
        name: 'Push-ups',
        sets: 3,
        repetitions: 15
      },
      {
        name: 'Pull-ups',
        sets: 3,
        repetitions: 8
      }
    ],
    routine: {
      monday: 'Cardio',
      tuesday: 'Lower body',
      wednesday: 'Upper body and core',
      thursday: 'Active rest and recovery',
      friday: 'Lower body with a focus on glutes',
      saturday: 'Upper body',
      sunday: 'Rest and recovery'
    },
    photos: [],
    createdByUserId: ''
  };

  const [formData, setFormData] = useState(defaultFormData);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get(`http://localhost:8080/api/workoutplans/${id}`);
        setFormData(response.data);
      } catch (error) {
        setError(error);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, [id]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prevState => ({
      ...prevState,
      [name]: value
    }));
  };

  const handleExerciseChange = (index, field, value) => {
    const newExercises = [...formData.exercises];
    newExercises[index][field] = value;
    setFormData(prevState => ({
      ...prevState,
      exercises: newExercises
    }));
  };

  const handleRoutineChange = (value, day) => {
    setFormData(prevState => ({
      ...prevState,
      routine: {
        ...prevState.routine,
        [day]: value
      }
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const url = `http://localhost:8080/api/workoutplans/${id}`;
      const response = await axios.put(url, formData);
      if (response.status === 200) {
        console.log(response.data);
        alert("Workout plan updated successfully!");
      } else {
        throw new Error('Failed to update workout plan');
      }
    } catch (error) {
      if (error.response) {
        console.error('Server responded with an error:', error.response.data);
        alert(`Failed to update workout plan: ${error.response.data.message}`);
      } else {
        console.error('There was an error!', error.message);
        alert("Failed to update workout plan. Please try again later.");
      }
    }
  };

  const handlePhotoChange = (e) => {
    const url = e.target.value;
    setFormData(prevState => ({
      ...prevState,
      photos: [url]
    }));
  };

  if (loading) return <div>Loading...</div>;
  if (error) return <div>Error: {error.message}</div>;

  return (
    <div style={{padding:100, 
      backgroundImage: 'url("https://thumbs.dreamstime.com/b/closeup-portrait-muscular-man-workout-barbell-gym-brutal-bodybuilder-athletic-six-pack-perfect-abs-shoulders-55122231.jpg")', // Replace 'path/to/your/image.jpg' with the actual path to your image
      backgroundSize: 'cover',
      backgroundPosition: 'center',}}>
      <div style={{ 
          display: 'flex', 
          justifyContent: 'center', 
          alignItems: 'center', 
    }}>
      <div style={{ width: 'auto', padding: '20px', borderRadius: '10px', backgroundColor: 'rgba(255, 255, 255, 0.8)', boxShadow: '0 0 10px rgba(0, 0, 0, 0.2)'  }}>
        <Link to="/AllWorkout" style={{ marginLeft: '10px', textDecoration: 'none' }}><FontAwesomeIcon icon={faChevronLeft} /> Back</Link>
        <h1 style={{ textAlign: 'center', marginBottom: '20px', color: '#333' }}>Update Workout Plan</h1>
        <form onSubmit={handleSubmit} style={{ display: 'grid', gap: '18px' }}>
          <div>
            <label style={{ fontWeight: 'bold' }}>Title:</label>
            <Input type="text" name="title" value={formData.title} onChange={handleChange} />
          </div>
          <div>
            <label style={{ fontWeight: 'bold' }}>Description:</label>
            <Input.TextArea rows={4} name="description" value={formData.description} onChange={handleChange} />
          </div>
          <p style={{ fontWeight: 'bold', marginBottom: '5px' ,fontSize:'20px' }}>Exercises:</p>
          {formData.exercises.map((exercise, index) => (
            <div key={index}>
              <label>{`Exercise ${index + 1} Name:`}</label>
              <Select defaultValue={exercise.name} onChange={(value) => handleExerciseChange(index, 'name', value)} style={{ width: '200px' }}>
                <Option value="Suat">Suat</Option>
                <Option value="Push-ups">Push-ups</Option>
                <Option value="Pull-ups">Pull-ups</Option>
              </Select>
              <label>{`Exercise ${index + 1} Sets:`}</label>
              <Select defaultValue={exercise.sets.toString()} onChange={(value) => handleExerciseChange(index, 'sets', parseInt(value))} style={{ width: '100px' }}>
                <Option value="3">3</Option>
                <Option value="4">4</Option>
                <Option value="5">5</Option>
              </Select>
              <label>{`Exercise ${index + 1} Repetitions:`}</label>
              <Select defaultValue={exercise.repetitions.toString()} onChange={(value) => handleExerciseChange(index, 'repetitions', parseInt(value))} style={{ width: '100px' }}>
                <Option value="10">10</Option>
                <Option value="15">15</Option>
                <Option value="8">8</Option>
              </Select>
            </div>
          ))}
          <p style={{ fontWeight: 'bold', marginBottom: '5px' ,fontSize:'20px' }}>Routine:</p>
          {Object.entries(formData.routine).map(([day, value]) => (
            <div key={day} style={{ marginBottom: '5px' }}>
              <label>{`${day.charAt(0).toUpperCase() + day.slice(1)}:`}</label>
              <Select value={value} onChange={(value) => handleRoutineChange(value, day)} style={{ width: '200px' }}>
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
          <div style={{ marginBottom: '15px' }}>
            <label style={{ fontWeight: 'bold' }}>Photos URL:</label>
            <Input type="text" onChange={handlePhotoChange} />
          </div>
          <div style={{ marginBottom: '15px' }}>
            <label style={{ fontWeight: 'bold' }}>Created By User ID:</label>
            <Input type="text" name="createdByUserId" value={formData.createdByUserId} onChange={handleChange} />
          </div>
          <div style={{ display: 'flex', justifyContent: 'center' }}>
             <Button type="primary" htmlType="submit">Update Workout Plan</Button>
         </div>
        </form>
      </div>
    </div>
    </div>
  );
};

export default UpdateWorkout;
