import React, { useEffect, useState } from 'react';
import jsPDF from "jspdf";
import axios from 'axios';
import Topbar from "../../components/topbar/Topbar1";
import { Cell,Pie,PieChart,BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from 'recharts';

const Report = () => {
    const currentDate = new Date().toLocaleDateString();
    const [items, setItems] = useState([]);

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

     // Function to calculate distance run divided by runtime
     const calculateAverageSpeed = () => {
        let totalDistance = 0;
        let totalTime = 0;

        if (Array.isArray(items) && items.length > 0) {
            items.forEach(item => {
                // Parse the string values to floats
                const distanceRun = parseFloat(item.distanceRun);
                const timeRun = parseFloat(item.timeRun);

                totalDistance += distanceRun;
                totalTime += timeRun;
            });

            if (totalTime !== 0) {
                return totalDistance / totalTime;
            } else {
                return 0;
            }
        } else {
            // Handle the case when items is not an array or empty
            console.error("Input is not an array or empty");
            return 0;
        }
    };

    const calculateCardioCount = () => {
        let totalAmount = 0;
        if (Array.isArray(items)) {
            items.forEach(item => {
                totalAmount += parseFloat(item.cardio);
            });
        } else {
            totalAmount = parseFloat(items.cardio);
        }
        return totalAmount;
    };




    // Function to calculate addition of weight lifted count
    const calculateWeightLiftedCount = () => {
        let totalAmount = 0;
        if (Array.isArray(items)) {
            items.forEach(item => {
                totalAmount += parseFloat(item.weightLifted);
            });
        } else {
            totalAmount = parseFloat(items.weightLifted);
        }
        return totalAmount;
    };




    // Function to calculate addition of push-ups count
    const calculatePushupsCount = () => {
        let totalAmount = 0;
        if (Array.isArray(items)) {
            items.forEach(item => {
                totalAmount += parseFloat(item.pushups);
            });
        } else {
            totalAmount = parseFloat(items.pushups);
        }
        return totalAmount;
    };

    const data = [
        { name: 'Weight Lifted', value: calculateWeightLiftedCount(), color: '#0088FE' },
        { name: 'Push-ups', value: calculatePushupsCount(), color: '#00C49F' },
        { name: 'Cardio', value: calculateCardioCount(), color: '#FFBB28' },
    ];

    const COLORS = data.map(entry => entry.color);


















    // Function to prepare data for the bar chart
    const prepareData = () => {
        let chartData = [];

        if (Array.isArray(items) && items.length > 0) {
            items.forEach(item => {
                chartData.push({
                    date: new Date(item.date).toLocaleDateString(),
                    cardio: parseFloat(item.cardio),
                    weightLifted: parseFloat(item.weightLifted),
                    pushups: parseFloat(item.pushups),
                });
            });
        }

        return chartData;
    };

    const renderCustomAxisTick = (tickProps) => {
        const { x, y, payload } = tickProps;
        return <text x={x} y={y} dy={16} textAnchor="end" fill="#666" transform="rotate(-45)">{payload.value}</text>;
    };



    
// Function to handle downloading the store report
const handleDownload = () => {
    // Create a new instance of jsPDF
    const doc = new jsPDF();

    // Define font sizes and colors
    const titleFontSize = 30;
    const contentFontSize = 18;
    const footerFontSize = 10;
    const lineThickness = 0.5;
    const titleColor = "#191970"; // Navy blue
    const textColor = "#000000"; // Black
    const footerColor = "#808080"; // Gray

    // Company information
    const companyName = "FitnessHub";
    const companyLocation = "Colombo, City";
    const companyCountry = "Sri Lanka, Country";
    const companyWebsite = "www.fitness.com";

    // Set font size and add current date
    doc.setFontSize(20);
    doc.text(`Date: ${currentDate}`, 20, 30);

    // Add title of the report
    doc.setFontSize(titleFontSize);
    doc.setTextColor(titleColor);
    doc.text("Status Progress Report", 20, 50);

    // Draw a line under the title
    doc.setLineWidth(lineThickness);
    doc.setDrawColor(titleColor); // Match the title color
    doc.line(20, 55, 190, 55);



     doc.setFontSize(contentFontSize);
     doc.setTextColor(textColor);
     doc.text(`Average Distance Run :  ${calculateAverageSpeed()} `, 20, 80)


     doc.setFontSize(contentFontSize);
     doc.setTextColor(textColor);
     doc.text(`Total Cardio Time :  ${calculateCardioCount()}  Minutes `, 20, 100)
 

    doc.setFontSize(contentFontSize);
    doc.setTextColor(textColor);
    doc.text(`Total No of Pushups  :  ${calculatePushupsCount()} `, 20, 120)

     // Add content: Total number of items
     doc.setFontSize(contentFontSize);
     doc.setTextColor(textColor);
     doc.text(`Total WeightLifted Time :  ${calculateWeightLiftedCount()} Minutes`, 20, 140)




     
    // Add disclaimer
    doc.setFontSize(12);
    doc.setTextColor(textColor);
    doc.text("**This is an auto-generated report. No signature required.", 20, 170);

    // Draw a line above the footer
    doc.setLineWidth(lineThickness);
    doc.setDrawColor(textColor); // Match the text color
    doc.line(20, 155, 190, 155);

    // Add company footer information
    doc.setFontSize(footerFontSize);
    doc.setTextColor(footerColor);
    doc.text(companyName, 20, 185);
    doc.text(companyLocation, 20, 190);
    doc.text(companyCountry, 20, 195);
    doc.setTextColor(titleColor); // Match the title color
    doc.text(companyWebsite, 20, 200);

    // Save the PDF with a specified filename
    doc.save("Status_report.pdf");
};























    return (
        <div><Topbar />
        <div style={{marginLeft:'100px'}}>
            <p style={{ marginTop:'100px',marginBottom: '5px', fontSize: '40px',  textAlign:'center'}}>My Workout Progress</p>
            <p style={{ textAlign:'center',marginTop:'50px',fontSize: "30px", fontWeight: "bold",marginBottom: '40px' }}>Date: {currentDate}</p>

            <div style={{ display: 'flex', justifyContent: 'space-between' ,marginBottom:'50px' }}>
    

    <button
        onClick={handleDownload}
        style={{
            marginLeft:'78%',
            backgroundColor: "blue",
            borderRadius: "10px",
            padding: "10px 20px",
            border: "none",
            color: "#fff",
            cursor: "pointer",
        }}
    >
        Download Progress
    </button>
</div>



























            <div>

            <ResponsiveContainer width="90%"   height={400}>
                <BarChart
                    data={prepareData()}
                    margin={{ top: 20, right: 30, left: 20, bottom: 50 }} // Added bottom margin for X-axis labels
                >
                    <CartesianGrid strokeDasharray="3 3" />
                    <XAxis dataKey="date" tick={renderCustomAxisTick} interval={0} /> {/* Ensures all dates are shown */}
                    <YAxis />
                    <Tooltip />
                    <Legend />
                    <Bar dataKey="cardio" fill="#8884d8" name="Cardio" />
                    <Bar dataKey="weightLifted" fill="#82ca9d" name="Weight Lifted" />
                    <Bar dataKey="pushups" fill="#FFBB28" name="Push-ups" />
                </BarChart>
            </ResponsiveContainer>
            </div>




            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
    <div style={{ marginRight: '20px' }}>

        <div style={{marginLeft:'100px'}}>
        <h2 style={{marginLeft:'100px' ,marginBottom:'-60px'}}>Pie Chart Summary</h2>
        <PieChart width={400} height={400}>
            <Pie
                data={data}
                cx={200}
                cy={200}
                innerRadius={60}
                outerRadius={80}
                fill="#8884d8"
                paddingAngle={5}
                dataKey="value"
            >
                {data.map((entry, index) => (
                    <Cell key={`cell-${index}`} fill={entry.color} />
                ))}
            </Pie>
        </PieChart>

        <div style={{ display: 'flex', alignItems: 'center', flexWrap: 'wrap',  marginLeft:'60px',marginTop:'-60px'}}>
        {data.map((entry, index) => (
            <div key={`legend-${index}`} style={{ display: 'flex', alignItems: 'center', marginRight: '20px' }}>
                <div style={{ width: '20px', height: '20px', backgroundColor: entry.color, marginRight: '5px' }} />
                <span>{entry.name}</span>
            </div>
        ))}
       


    </div>
    </div>
        

 


    </div>

    
    
    <h3 style={{marginRight:'-500px', marginTop:'-308px', color: '#333', fontSize: '26px', fontWeight: 'bold' }}>Additional Progress</h3>

    <div style={{ marginRight: '400px' ,marginTop:'-30px' }}>
<p style={{marginBottom:'4%', color: '#666',fontSize:'20px' }}>Distance Runtime Ratio: {calculateAverageSpeed()}</p>  
<p style={{marginBottom:'4%',  color: '#666',fontSize:'20px' }}>Total Cardio Count: {calculateCardioCount()}</p>  
<p style={{ marginBottom:'4%', color: '#666',fontSize:'20px' }}>Total Weight Lifted Time : {calculateWeightLiftedCount()} Minutes</p>
<p style={{ color: '#666' ,fontSize:'20px' }}>Total Push-ups Time : {calculatePushupsCount()} Minutes</p>

</div>


     </div>










            
        </div>
        </div>
    );
};

export default Report;
