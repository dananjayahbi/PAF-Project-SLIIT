import React, { useState } from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom';
import img from './images/gym1.jpg';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faChevronLeft } from '@fortawesome/free-solid-svg-icons';
import Topbar from "../../components/topbar/Topbar1";

const CreateStatus = () => {
    const [status, setStatus] = useState({
        distanceRun: 0,
        timeRun: 0,
        pushups: 0,
        weightLifted: 0,
        cardio: 0,
        description: '',
        date: ''
    });

    const handleChange = (e) => {
        const { name, value } = e.target;

        // For alphanumeric Description field
        if (name === 'description') {
            if (/^[a-zA-Z0-9\s]*$/.test(value)) {
                setStatus({
                    ...status,
                    [name]: value
                });
            }
        }
        // For alphanumeric Date field with specific format (YYYY-MM-DD)
        else if (name === 'date') {
            if (/^[a-zA-Z0-9-]*$/.test(value) && value.length <= 10) {
                setStatus({
                    ...status,
                    [name]: value
                });
            }
        }
        // For other fields
        else {
            setStatus({
                ...status,
                [name]: parseInt(value)
            });
        }
    };

    const handleIncrement = (field) => {
        setStatus({
            ...status,
            [field]: status[field] + 1
        });
    };

    const handleDecrement = (field) => {
        setStatus({
            ...status,
            [field]: Math.max(0, status[field] - 1)
        });
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        if (!validateForm()) {
            return;
        }
        axios.post('http://localhost:8080/api/status/create', status)
            .then((response) => {
                alert('Status created successfully ');

                window.location.reload();

               
            })
            .catch((error) => {
                alert('Status created failed !!!');

                console.error(error);
            });
    };

    const validateForm = () => {
        if (status.distanceRun <= 0 ||
            status.timeRun <= 0 ||
            status.pushups <= 0 || // Updated condition
            status.weightLifted <= 0 || // Updated condition
            status.cardio <= 0 || // Updated condition
            status.date === '' ||
            status.description === ''
        ) {
            alert('Please fill in all fields !!!');
            return false;
        }
        return true;
    };

    return (
        <div>
            <Topbar />
        <div style={{
            display: 'flex',
            justifyContent: 'center',
            alignItems: 'center',
            minHeight: '100vh',
            backgroundImage: `url(${img})`, // Change 'path/to/your/image.jpg' to the actual path of your image
            backgroundSize: 'cover',
            backgroundPosition: 'center',
            
        }}>
            <form onSubmit={handleSubmit} style={{
                width: '80%',
                maxWidth: '600px',
                background: 'rgba(255, 255, 255, 0.9)', // Adjust the opacity as needed
                border: '1px solid #ccc',
                borderRadius: '8px',
                padding: '40px',
                marginTop: '40px',
                marginBottom: '40px',
                boxShadow: '0px 4px 8px rgba(0, 0, 0, 0.1)',
            }}>


                <Link to="/status-home" style={{
                    position: 'absolute',
                    top: '130px',
                    left: '520px',
                    textDecoration: 'none',
                    color: '#000',
                    display: 'flex',
                    alignItems: 'center',
                }}>
                    <div style={{ borderRadius: '50%', border: '1px solid #000', padding: '5px' }}>
                        <FontAwesomeIcon icon={faChevronLeft} style={{ marginRight: '6px', marginLeft: '5px' }} />
                    </div>
                </Link>



                <h2 style={{ marginBottom: '30px', textAlign: 'center', color: '#333' }}>Fitness Status</h2>
                <div style={{ marginBottom: '20px' }}>
                    <label style={{ display: 'block', marginBottom: '8px', color: '#555', fontSize: '14px', fontWeight: 'bold' }}>Distance Run :   (include in meters)</label>
                    <div style={{ display: 'flex', alignItems: 'center' }}>
                        <input type="number" placeholder='Input distance run in Meters' name="distanceRun" onChange={handleChange} style={{ flex: 1, padding: '10px', borderRadius: '4px', border: '1px solid #ddd' }} />
                    </div>
                </div>
                <div style={{ marginBottom: '20px' }}>
                    <label style={{ display: 'block', marginBottom: '8px', color: '#555', fontSize: '14px', fontWeight: 'bold' }}>Time Run  :   (include in minutes)</label>
                    <div style={{ display: 'flex', alignItems: 'center' }}>
                        <input type="number" name="timeRun" onChange={handleChange} placeholder='Input Time run in Minutes' style={{ flex: 1, padding: '10px', borderRadius: '4px', border: '1px solid #ddd' }} />
                    </div>
                </div>
                <div style={{ marginBottom: '20px' }}>
                    <label style={{ display: 'block', marginBottom: '8px', color: '#555', fontSize: '14px', fontWeight: 'bold' }}>No Of Pushups  </label>
                    <div style={{ display: 'flex', alignItems: 'center' }}>

                        <input type="number" name="pushups" value={status.pushups} readOnly onChange={handleChange} style={{ flex: 1, padding: '10px', borderRadius: '4px', border: '1px solid #ddd' }} />

                        <button type="button" onClick={() => handleIncrement('pushups')} style={{ marginLeft: '8px', padding: '6px 12px', fontSize: '14px', backgroundColor: '#007bff', color: '#fff', border: 'none', borderRadius: '4px', cursor: 'pointer' }}>+</button>
                        <button type="button" onClick={() => handleDecrement('pushups')} style={{ margin: '8px', padding: '6px 12px', fontSize: '14px', backgroundColor: '#007bff', color: '#fff', border: 'none', borderRadius: '4px', cursor: 'pointer' }}>-</button>
                    </div>
                </div>
                <div style={{ marginBottom: '20px' }}>
                    <label style={{ display: 'block', marginBottom: '8px', color: '#555', fontSize: '14px', fontWeight: 'bold' }}>Weight Lifted Time  :   (include in minutes)</label>
                    <div style={{ display: 'flex', alignItems: 'center' }}>

                        <input type="number" name="weightLifted" value={status.weightLifted} readOnly onChange={handleChange} style={{ flex: 1, padding: '10px', borderRadius: '4px', border: '1px solid #ddd' }} />
                        <button type="button" onClick={() => handleIncrement('weightLifted')} style={{ marginLeft: '8px', padding: '6px 12px', fontSize: '14px', backgroundColor: '#007bff', color: '#fff', border: 'none', borderRadius: '4px', cursor: 'pointer' }}>+</button>
                        <button type="button" onClick={() => handleDecrement('weightLifted')} style={{ margin: '8px', padding: '6px 12px', fontSize: '14px', backgroundColor: '#007bff', color: '#fff', border: 'none', borderRadius: '4px', cursor: 'pointer' }}>-</button>
                    </div>
                </div>
                <div style={{ marginBottom: '20px' }}>
                    <label style={{ display: 'block', marginBottom: '8px', color: '#555', fontSize: '14px', fontWeight: 'bold' }}>Cardio Time :   (include in minutes)</label>
                    <div style={{ display: 'flex', alignItems: 'center' }}>

                        <input type="number" name="cardio" value={status.cardio} readOnly onChange={handleChange} style={{ flex: 1, padding: '10px', borderRadius: '4px', border: '1px solid #ddd' }} />
                        <button type="button" onClick={() => handleIncrement('cardio')} style={{ marginLeft: '8px', padding: '6px 12px', fontSize: '14px', backgroundColor: '#007bff', color: '#fff', border: 'none', borderRadius: '4px', cursor: 'pointer' }}>+</button>
                        <button type="button" onClick={() => handleDecrement('cardio')} style={{ margin: '8px', padding: '6px 12px', fontSize: '14px', backgroundColor: '#007bff', color: '#fff', border: 'none', borderRadius: '4px', cursor: 'pointer' }}>-</button>
                    </div>
                </div>
                <div style={{ marginBottom: '20px' }}>
                    <label style={{ display: 'block', marginBottom: '8px', color: '#555', fontSize: '14px', fontWeight: 'bold' }}>Date:</label>
                    <input type="date" name="date" onChange={handleChange} placeholder="YYYY-MM-DD" required style={{ width: '100%', padding: '10px', borderRadius: '4px', border: '1px solid #ddd' }}  max={(new Date()).toISOString().split('T')[0]} />

                </div>
                <div style={{ marginBottom: '20px' }}>
                    <label style={{ display: 'block', marginBottom: '8px', color: '#555', fontSize: '14px', fontWeight: 'bold' }}>Description:</label>
                    <textarea name="description" onChange={handleChange} placeholder="Description" required style={{ width: '100%', padding: '10px', borderRadius: '4px', border: '1px solid #ddd', minHeight: '80px' }}></textarea>
                </div>
                <div style={{ textAlign: 'center' }}>
                    <button type="submit" style={{ padding: '12px 24px', fontSize: '16px', backgroundColor: '#007bff', color: '#fff', border: 'none', borderRadius: '4px', cursor: 'pointer', transition: 'background-color 0.3s ease' }}>Create Status</button>
                </div>
            </form>
        </div>
        </div>
    );
};

export default CreateStatus;
