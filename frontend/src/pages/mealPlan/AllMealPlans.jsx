import React, { useState, useEffect } from "react";
import axios from "axios";
import { Card, Typography, Tag, Col, Row, Layout, Button } from "antd";
import MealImage from '../../assets/images/food-with-ingredients.jpg';
import { Link } from 'react-router-dom';
import TopBar2 from '../../components/topbar/Topbar2';

const { Meta } = Card;

function GetAllMealPlans() {
  const [mealPlans, setMealPlans] = useState([]);

  useEffect(() => {
    const fetchMealPlans = async () => {
      try {
        const response = await axios.get(
          "http://localhost:8080/api/mealplans/all"
        );
        setMealPlans(response.data);
        console.log(response.data);
      } catch (error) {
        console.error("Error fetching meal plans:", error);
      }
    };

    fetchMealPlans();
  }, []);

  return (
    <Layout style={{backgroundImage: `url(${MealImage})`}}>      
      <TopBar2/>
      <div style={{ padding: 50,paddingLeft:70,paddingTop:30, margin: "center" }}>
        <Row gutter={[20, 50]}>
        <Col span={24}>
          <div style={{borderRadius:50,width:"25%",background:"#666",margin:"auto"}}>
          <h2
              style={{
                marginBottom: 35,
                textAlign: "center",
                fontWeight: 400,
                fontSize: "25px",
                color:"#fff",
                padding: 10
              }}
            >
             All Meal Plans
            </h2>
          </div>
            
          </Col>
          {mealPlans.map((mealPlan) => (
            <Col key={mealPlan.id} xs={24} sm={12} md={8} lg={6}>
              <Card
                style={{
                  width: "300px",
                  backgroundSize: "cover",
                  backgroundPosition: "center",
                  marginBottom: "20px"
                }}
                cover={
                  mealPlan.photos &&
                  mealPlan.photos.length > 0 && (
                    <img
                      alt={mealPlan.title}
                      src={mealPlan.photos[0]}
                      style={{
                        width: "100%",
                        borderTopLeftRadius: "8px",
                        borderTopRightRadius: "8px",
                      }}
                    />
                  )
                }
                actions={[
                  <Link to={`/mealplan/${mealPlan.id}`}>
                    <Button type="primary">View</Button>
                  </Link>,
                ]}
              >
                <Meta
                  title={
                    <Typography.Title level={3} style={{ color: "black", fontSize: "17px" }}>
                      {mealPlan.title}
                    </Typography.Title>
                  }
                  description={
                    <>
                      <Typography.Paragraph style={{ color: "black", fontSize: "14px" }}>
                        {mealPlan.description}
                      </Typography.Paragraph>
                      <Typography.Paragraph style={{ color: "black", fontSize: "14px" }}>
                        <strong>Ingredients:</strong>{" "}
                        {mealPlan.ingredients && mealPlan.ingredients.join(", ")}
                      </Typography.Paragraph >
                      <Typography.Paragraph style={{ color: "black", fontSize: "14px" }}>
                        <strong>Dietary Preferences:</strong>
                        {mealPlan.dietaryPreferences &&
                          mealPlan.dietaryPreferences.map((pref) => (
                            <Tag key={pref}>{pref}</Tag>
                          ))}
                      </Typography.Paragraph>
                      <Typography.Paragraph style={{ color: "black", fontSize: "14px" }}>
                        <strong>Portion Sizes:</strong> {mealPlan.portionSizes}
                      </Typography.Paragraph>
                      <Typography.Paragraph style={{ color: "black", fontSize: "14px" }}>
                        <strong>Nutritional Information:</strong>
                        <br />
                        <ul>
                          <li>
                            Calories:{" "}
                            {mealPlan.nutritionalInformation &&
                              mealPlan.nutritionalInformation.calories}{" "}
                            {mealPlan.nutritionalInformation &&
                              mealPlan.nutritionalInformation.caloriesUnit}
                          </li>
                          <li>
                            Carbohydrates:{" "}
                            {mealPlan.nutritionalInformation &&
                              mealPlan.nutritionalInformation.carbohydrates}{" "}
                            {mealPlan.nutritionalInformation &&
                              mealPlan.nutritionalInformation.carbohydratesUnit}
                          </li>
                          <li>
                            Proteins:{" "}
                            {mealPlan.nutritionalInformation &&
                              mealPlan.nutritionalInformation.protein}{" "}
                            {mealPlan.nutritionalInformation &&
                              mealPlan.nutritionalInformation.proteinUnit}
                          </li>
                          <li>
                            Fats:{" "}
                            {mealPlan.nutritionalInformation &&
                              mealPlan.nutritionalInformation.fat}{" "}
                            {mealPlan.nutritionalInformation &&
                              mealPlan.nutritionalInformation.fatUnit}
                          </li>
                        </ul>
                      </Typography.Paragraph>
                    </>
                  }
                />
              </Card>
            </Col>
          ))}
        </Row>
      </div>
    </Layout>
  );
}

export default GetAllMealPlans;
