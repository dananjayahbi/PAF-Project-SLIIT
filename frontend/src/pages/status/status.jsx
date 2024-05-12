import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import img from './images/gym2.jpg';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faSearch } from '@fortawesome/free-solid-svg-icons';
import Topbar from "../../components/topbar/Topbar1";

const Status = () => {
    const [items, setItems] = useState([]);
    const navigate = useNavigate();
    const [searchQuery, setSearchQuery] = useState('');

    useEffect(() => {
        function getItems() {
            axios.get("http://localhost:8080/api/status/all")
                .then((res) => {
                    setItems(res.data);
                })
                .catch((err) => {
                    alert(err.message);
                });
        }
        getItems();
    }, []);

    const filteredItems = items.filter(item => {
        return (
            item.date.toLowerCase().includes(searchQuery.toLowerCase())
        );
    });

    const handleProgressClick = () => {
        navigate('/status-report');
    };

    const handleAddNewStatusClick = () => {
        navigate('/status');
        console.log("Add new status clicked");
    };

    return (
        <div> <Topbar />
        <div style={{
            textAlign: 'center',
            backgroundImage: `url(${img})`,
            backgroundSize: '100% 100%',
            backgroundRepeat: 'no-repeat',
            backgroundPosition: 'center',
            minHeight: '100vh',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            opacity: '0.9',
        }}>
            <div style={{ textAlign: 'center', width: '80%' }}> {/* Set the width of the content */}
                <h1 style={{ marginBottom: '100px', marginTop: '100px', color: 'white',fontSize:'80px' }}>My Workout Status</h1> {/* Change the color to white */}
                <br />
                <div >
                    <input
                        type="text"
                        placeholder="Search item..."
                        style={{
                            marginLeft: '-20%',
                            width: '34%',
                            padding: '10px',
                            borderRadius: '20px',
                            marginBottom: '120px',
                            border: 'none',
                            marginRight: '10px',
                            boxShadow: '0 2px 5px rgba(0,0,0,0.1)',
                            marginTop:'-50px',
                        }}
                        onChange={e => setSearchQuery(e.target.value)}
                    />
                    
                </div>
                <div style={{ position: 'absolute', top: '288px', right: '375px' }}>
                    <button
                        onClick={() => handleAddNewStatusClick()}
                        style={{
                            padding: '10px 20px',
                            borderRadius: '5px',
                            backgroundColor: '#008CBA',
                            color: 'white',
                            border: 'none',
                            fontSize: '16px',
                            cursor: 'pointer'
                        }}
                    >
                        Add New Status
                    </button>
                    <button
                        onClick={() => handleProgressClick()}
                        style={{
                            padding: '10px 20px',
                            borderRadius: '5px',
                            backgroundColor: '#4CAF50',
                            color: 'white',
                            border: 'none',
                            fontSize: '16px',
                            cursor: 'pointer',
                            marginTop: '60px',
                            marginLeft: '10px',
                            marginRight: '60px'
                        }}
                    >
                        Progress
                    </button>
                </div>
                <div style={{ display: 'flex', justifyContent: 'space-around', flexWrap: 'wrap' }}>
                    {filteredItems.map((item, index) => (
                        <div
                            key={item.id}
                            style={{
                                backgroundColor: 'white',
                                boxShadow: '0px 4px 8px rgba(0, 0, 0, 0.1)',
                                border: '1px solid #ccc',
                                borderRadius: '8px',
                                padding: '20px',
                                marginBottom: '20px',
                                marginTop: '-10px',
                                width: '30%', // Adjusted the width of the cards
                                boxSizing: 'border-box',
                                marginLeft: '10px', // Adjusted the margin
                                marginRight: '10px', // Adjusted the margin
                            }}
                        >
                            <p style={{ marginBottom: '8px', fontSize: '22px', fontWeight: 'bold', color: '#333' }}>{item.date}</p> {/* Increase font size and change color */}
                            <hr style={{ border: '0', borderBottom: '1px solid #ccc', marginBottom: '12px' }} />
                            <p style={{ marginBottom: '6px' }}>Distance Run: {item.distanceRun}</p>
                            <p style={{ marginBottom: '6px' }}>Time Taken: {item.timeRun}</p>
                            <p style={{ marginBottom: '6px' }}>No of Pushups: {item.pushups}</p>
                            <p style={{ marginBottom: '6px' }}>Weight Lifted Time: {item.weightLifted}</p>
                            <p style={{ marginBottom: '15px' }}>Cardio Time: {item.cardio}</p>
                            <div style={{ marginBottom: '12px' }}>
                                <a
                                    href={'view-status/' + item.id}
                                    style={{
                                        padding: '10px 20px',
                                        borderRadius: '5px',
                                        backgroundColor: 'green',
                                        textDecoration: 'none',
                                        color: 'white',
                                        border: 'none',
                                        fontSize: '16px',
                                        cursor: 'pointer',
                                        marginLeft: '10px',
                                        marginTop: '20px'
                                    }} >
                                    More Details
                                </a>
                              
                            </div>
                        </div>
                    ))}
                </div>
            </div>
        </div>
        </div>
    );
};

export default Status;
