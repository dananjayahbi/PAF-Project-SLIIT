import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faEye, faTrash, faEdit } from '@fortawesome/free-solid-svg-icons';
import jsPDF from 'jspdf';
import 'jspdf-autotable';
import { Button, Input, Table } from 'antd';
import { PlusOutlined, SearchOutlined } from '@ant-design/icons';

const ViewAllWorkout = () => {
    const [workouts, setWorkouts] = useState([]);
    const [searchQuery, setSearchQuery] = useState('');
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    useEffect(() => {
        const fetchData = async () => {
            try {
                const response = await axios.get("http://localhost:8080/api/workoutplans/all");
                setWorkouts(response.data);
            } catch (error) {
                setError(error);
            } finally {
                setLoading(false);
            }
        };

        fetchData();
    }, []);

    const handleSearchInputChange = (event) => {
        setSearchQuery(event.target.value);
    };

    const filteredWorkouts = workouts.filter(workout => {
        return workout.title.toLowerCase().includes(searchQuery.toLowerCase());
    });

    const deleteWorkout = async (id) => {
        try {
            await axios.delete(`http://localhost:8080/api/workoutplans/${id}`);
            setWorkouts(workouts.filter(workout => workout.id !== id));
        } catch (error) {
            console.error("Error deleting workout:", error);
        }
    };

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
    
        
        const data = filteredWorkouts.map(workout => [workout.title, workout.description]);
    
        
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
                fontSize: 10 
            },
            headStyles: {
                fillColor: [176, 196, 222],
                textColor: [255, 255, 255] 
            },
            margin: { top: 10 } 
        });
    
        
        doc.save("workout_plans.pdf");
    };
    
    return (
        <div style={{padding:100, 
        backgroundImage: 'url("https://marketplace.canva.com/EAE9Fnlonas/1/0/1600w/canva-black-minimalist-workout-exercise-gym-zoom-background-geSqu-shKsE.jpg")', 
        backgroundSize: 'cover',
        backgroundPosition: 'center',}}>
        <div style={{ 
            display: 'flex', 
            justifyContent: 'center', 
            alignItems: 'center', 
           
        }}>
            {error && <div>Error: {error.message}</div>} 
            {loading ? (
                <div>Loading...</div> 
            ) : (
                <div style={{ width: '100%', maxWidth: '800px' }}>
                    <div style={{ marginBottom: '10px', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                        <Input
                            placeholder="Search by workout title"
                            value={searchQuery}
                            onChange={handleSearchInputChange}
                            style={{ width: '150px', marginRight: '10px' }}
                            prefix={<SearchOutlined />}
                        />
                        <div>
                            <Button type="primary" style={{ marginRight: '10px' }} onClick={exportPDF}>Generate PDF</Button>
                            <Link to="/AddWorkout" style={{ marginRight: '10px', textDecoration: 'none' }}>
                                <Button type="primary" style={{ marginRight: '10px' }} icon={<PlusOutlined />}>Add Workout</Button>
                            </Link>
                            <Link to="/AllWorkout" style={{ textDecoration: 'none' }}>
                                <Button type="primary" icon={<PlusOutlined />}>View All Workout</Button>
                            </Link>
                        </div>
                        <span style={{ marginLeft: 'auto', fontSize: '18px', color: 'white' }}>Total Workouts: {workouts.length}</span>
                    </div>
                    {/* Table */}
                    <Table dataSource={filteredWorkouts} pagination={false} style={{ marginBottom: '20px' ,marginRight:'2px' }}>
                        <Table.Column title="NO" dataIndex="id" key="id" render={(text, record, index) => index + 1} />
                        <Table.Column title="Workout Title" dataIndex="title" key="title" />
                        <Table.Column title="Description" dataIndex="description" key="description" />
                        <Table.Column
                            title="Action"
                            key="action"
                            render={(text, record) => (
                                <span>
                                    <Link to={`/viewworkout/${record.id}`} style={{ marginRight: '8px', textDecoration: 'none' }}>
                                        <FontAwesomeIcon icon={faEye} />
                                    </Link>
                                    <Link to="#" style={{ marginLeft: '10px', textDecoration: 'none' }} onClick={() => deleteWorkout(record.id)}>
                                        <FontAwesomeIcon icon={faTrash} />
                                    </Link>
                                    <Link to={`/UpdateWorkout/${record.id}`} style={{ marginLeft: '15px', textDecoration: 'none' }}>
                                        <FontAwesomeIcon icon={faEdit} />
                                    </Link>
                                </span>
                            )}
                        />
                    </Table>
                </div>
            )}
        </div>
        </div>
    );
}

export default ViewAllWorkout;
