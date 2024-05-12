import React, { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { Link } from 'react-router-dom';
import axios from 'axios';
import img from './images/gym_04.jpg';
import { Typography, Button, Spin, Card, Divider, Modal, Form, Input, InputNumber } from 'antd';
import { EditOutlined, DeleteOutlined, LoadingOutlined } from '@ant-design/icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faChevronLeft } from '@fortawesome/free-solid-svg-icons';
import Topbar from "../../components/topbar/Topbar1";

const { Title, Text } = Typography;
const { TextArea } = Input;

const ViewStatus = () => {
    const { id } = useParams();
    const navigate = useNavigate();
    const [statusData, setStatusData] = useState(null);
    const [loading, setLoading] = useState(true);
    const [modalVisible, setModalVisible] = useState(false);
    const [editItem, setEditItem] = useState(null);
    const [form] = Form.useForm();

    useEffect(() => {
        axios.get(`http://localhost:8080/api/status/${id}`)
             .then((response) => {
                 const item = response.data;
                 setStatusData(item);
                 setLoading(false);
             })
             .catch((error) => {
                 console.error("Error fetching status data:", error);
                 setLoading(false);
             });
    }, [id]);


    const handleUpdate = () => {
        setEditItem(statusData);
        setModalVisible(true);
    };

    const onFinish = (values) => {
        axios.put(`http://localhost:8080/api/status/update/${editItem.id}`, values)
            .then(response => {
                console.log(response.data);
                setModalVisible(false);
                alert("Successfully updated");
                window.location.reload();

            })
            .catch(error => {
                console.log(error);
            });
    };

    const handleDelete = () => {
        axios.delete(`http://localhost:8080/api/status/delete/${id}`)
             .then(() => {
                alert("Successfully Delected");
                 navigate("/status-home");
             })
             .catch((error) => {
                 console.error("Error deleting status:", error);
             });
    };

    return (
        <div>  <Topbar />
        <div style={{ backgroundImage: `url(${img})`, backgroundSize: 'cover', backgroundRepeat: 'no-repeat', backgroundPosition: 'center center', display: 'flex', justifyContent: 'center', alignItems: 'center', minHeight: '100vh' ,width:'100%' }}>
            <div style={{ maxWidth: '800px', width: '90%', padding: '20px', backgroundColor: 'rgba(255, 255, 255, 0.8)', borderRadius: '10px', boxShadow: '0 0 10px rgba(0, 0, 0, 0.1)' ,marginTop:'40px',marginBottom:'40px'}}>

            <Link to="/status-home" style={{ 
    position: 'absolute',
    top: '150px',
    left: '450px',
    textDecoration: 'none',
    color: '#000',
    display: 'flex',
    alignItems: 'center',
}}>
    <div style={{ borderRadius: '50%', border: '1px solid #000', padding: '5px' }}>
        <FontAwesomeIcon icon={faChevronLeft} style={{ marginRight: '6px',marginLeft: '5px' }} />
    </div>
</Link>






                <Title level={2} style={{ textAlign: 'center', marginBottom: '30px', fontSize: '80px' }}>Status Details</Title>
                {loading ? (
                    <Spin indicator={<LoadingOutlined style={{ fontSize: 24 }} spin />} />
                ) : statusData ? (
                    <Card>
                        <div style={{ marginBottom: '20px', fontSize: '1.5rem',textAlign:'center'  }}>
                            <Text strong style={{fontSize:'20px'}}>Distance Run : </Text>
                            <Text style={{fontSize:'20px'}}>{statusData.distanceRun} Meters</Text>
                        </div>
                        <Divider />
                        <div style={{ marginBottom: '20px', fontSize: '1.2rem',textAlign:'center' }} >
                            <Text strong  style={{fontSize:'20px'}}>Time Run : </Text>
                            <Text style={{fontSize:'20px'}}>{statusData.timeRun} Minutes</Text>
                        </div>
                        <Divider />
                        <div style={{ marginBottom: '20px', fontSize: '1.2rem',textAlign:'center'  }}>
                            <Text strong style={{fontSize:'20px'}}>No of Pushups : </Text>
                            <Text style={{fontSize:'20px'}}>{statusData.pushups}</Text>
                        </div>
                        <Divider />
                        <div style={{ marginBottom: '20px', fontSize: '1.2rem',textAlign:'center'  }}>
                            <Text strong style={{fontSize:'20px'}}>Weight Lifted  Time :  </Text>
                            <Text style={{fontSize:'20px'}}>{statusData.weightLifted} Minutes</Text>
                        </div>
                        <Divider />
                        <div style={{ marginBottom: '20px', fontSize: '1.2rem',textAlign:'center'  }}>
                            <Text strong style={{fontSize:'20px'}}>Cardio Time : </Text>
                            <Text style={{fontSize:'20px'}}>{statusData.cardio} Minutes</Text>
                        </div>
                        <Divider />
                        <div style={{ marginBottom: '20px', fontSize: '1.2rem',textAlign:'center'  }}>
                            <Text strong style={{fontSize:'20px'}}>Description : </Text>
                            <Text style={{fontSize:'20px'}}>{statusData.description}</Text>
                        </div>
                        <Divider />
                        <div style={{ marginBottom: '20px', fontSize: '1.2rem',textAlign:'center'  }}>
                            <Text strong style={{fontSize:'20px'}}>Date :  </Text>
                            <Text style={{fontSize:'20px'}}>{statusData.date}</Text>
                        </div>
                        <Divider />
                        <div style={{ display: 'flex', justifyContent: 'center', marginTop: '30px' }}>
                            <Button type="primary" icon={<EditOutlined />} onClick={handleUpdate} style={{ marginRight: '10px' }}>Update</Button>
                            <Button type="danger" icon={<DeleteOutlined />} style={{backgroundColor:'red' , color:'white'}}   onClick={handleDelete}>Delete</Button>
                        </div>
                    </Card>
                ) : (
                    <Text>Loading status data...</Text>
                )}
            </div>
            
            {/* Modal for Update */}
            <Modal
                title="Update Status"
                visible={modalVisible}
                onCancel={() => setModalVisible(false)}
                footer={[
                    <Button key="cancel" onClick={() => setModalVisible(false)}>Cancel</Button>,
                    <Button key="submit" type="primary" onClick={() => form.submit()}>Update</Button>,
                ]}
            >
                <Form form={form} layout="vertical" onFinish={onFinish} initialValues={editItem}>
                    <Form.Item name="distanceRun" label="Distance Run" rules={[{ required: true, message: 'Please enter distance run!' }]}>
                        <InputNumber min={0} />
                    </Form.Item>
                    <Form.Item name="timeRun" label="Time Run" rules={[{ required: true, message: 'Please enter time run!' }]}>
                        <InputNumber min={0} />
                    </Form.Item>
                    <Form.Item name="pushups" label="No of Pushups" rules={[{ required: true, message: 'Please enter the number of pushups!' }]}>
                        <InputNumber min={0} />
                    </Form.Item>
                    <Form.Item name="weightLifted" label="Weight Lifted Time" rules={[{ required: true, message: 'Please enter weight lifted time!' }]}>
                        <InputNumber min={0} />
                    </Form.Item>
                    <Form.Item name="cardio" label="Cardio Time" rules={[{ required: true, message: 'Please enter cardio time!' }]}>
                        <InputNumber min={0} />
                    </Form.Item>
                    <Form.Item name="description" label="Description">
                        <TextArea rows={4} />
                    </Form.Item>
                    <Form.Item name="date" label="Date"   rules={[{ required: true, message: 'Please select a date!' }]}>
                        <Input type="text" readOnly />
                    </Form.Item>
                </Form>
            </Modal>











        </div>
        </div>
    );
};

export default ViewStatus;
