import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import axios from "axios";
import {
  Card,
  Typography,
  Tag,
  Row,
  Col,
  Layout,
  Button,
  Carousel,
  Modal,
} from "antd";
import MealImage from "../../assets/images/indian-food-with-copy-space-high-angle.jpg";
import { Link } from "react-router-dom";

const { Meta } = Card;

function MealPlanDetails() {
  const [mealPlan, setMealPlan] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const { id } = useParams();

  useEffect(() => {
    const fetchMealPlan = async () => {
      try {
        const response = await axios.get(
          `http://localhost:8080/api/mealplans/${id}`
        );
        setMealPlan(response.data);
        setLoading(false);
      } catch (error) {
        setError(error);
        setLoading(false);
      }
    };

    fetchMealPlan();
  }, [id]);

  const handleDelete = async () => {
    try {
      const response = await axios.delete(
        `http://localhost:8080/api/mealplans/${id}`
      );
      if (response.status === 200) {
        Modal.success({
          title: "Success",
          content: `Meal plan with ID ${id} deleted successfully!`,
          onOk: () => {
            window.location.href = "/allmealplans";
          },
        });
      }
    } catch (error) {
      console.error("Error deleting meal plan:", error);
      Modal.error({
        title: "Error",
        content: "An error occurred while deleting the meal plan.",
      });
    }
  };

  const showDeleteConfirm = () => {
    Modal.confirm({
      title: "Are you sure you want to delete this meal plan?",
      content: "This action cannot be undone.",
      okText: "Yes",
      okType: "danger",
      cancelText: "No",
      onOk: handleDelete,
    });
  };

  if (loading) return <div>Loading...</div>;
  if (error) return <div>Error: {error.message}</div>;
  if (!mealPlan) return <div>No meal plan found</div>;

  return (
    <Layout
      style={{
        backgroundImage: `url(${MealImage})`,
        backgroundSize: "cover",
        minHeight: "100vh",
      }}
    >
 <Row justify="center" style={{ paddingTop: 100 }}>
    <Col span={12}>
      <Card style={{ width: "100%" }}>
        <Row justify="space-between" align="middle">
          <Col style={{fontSize:"16px"}}>
            <Link to="/allmealplans">&lt; Back</Link>
          </Col>
          <Col>
            <Link to={`/mealplan/update/${mealPlan.id}`}>
              <Button type="primary">Update</Button>
            </Link>
            <Button
              type="danger"
              style={{ background: "red", color: "white", marginLeft: 12 }}
              onClick={showDeleteConfirm}
            >
              Delete
            </Button>
          </Col>
        </Row>       
           
              
            <Meta
              title={
                <Typography.Title
                  level={3}
                  style={{ textAlign: "center", color: "black",marginTop:20 }}
                >
                  {mealPlan.title}
                </Typography.Title>
              }
              description={
                <>
                  <Typography.Paragraph style={{ color: "black" }}>
                    <strong>Meal Plan Description:</strong>{" "}
                    {mealPlan.description}
                  </Typography.Paragraph>
                  <Typography.Paragraph style={{ color: "black" }}>
                    <strong>Ingredients:</strong>{" "}
                    {mealPlan.ingredients && mealPlan.ingredients.join(", ")}
                  </Typography.Paragraph>
                  <Typography.Paragraph style={{ color: "black" }}>
                    <strong>Instructions:</strong> {mealPlan.instructions}
                  </Typography.Paragraph>
                  <Typography.Paragraph style={{ color: "black" }}>
                    <strong>Dietary Preferences:</strong>
                    {mealPlan.dietaryPreferences &&
                      mealPlan.dietaryPreferences.map((pref, index) => (
                        <Tag key={index}>{pref}</Tag>
                      ))}
                  </Typography.Paragraph>
                  <Typography.Paragraph style={{ color: "black" }}>
                    <strong>Portion Sizes:</strong> {mealPlan.portionSizes}
                  </Typography.Paragraph>
                  <Typography.Paragraph style={{ color: "black" }}>
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
                  <Typography.Paragraph style={{ color: "black" }}>
                    <strong>Recipes:</strong>{" "}
                    {mealPlan.recipes && mealPlan.recipes.join(", ")}
                  </Typography.Paragraph>
                  <Typography.Paragraph style={{ color: "black" }}>
                    <strong>Meal Plan Images:</strong>
                    <Carousel>
                      {mealPlan.photos &&
                        mealPlan.photos.map((photo, index) => (
                          <img
                            key={index}
                            src={photo}
                            alt={`Recipe ${index + 1}`}
                            style={{ maxWidth: "100%" }}
                          />
                        ))}
                    </Carousel>
                  </Typography.Paragraph>
                </>
              }
            />
          </Card>
        </Col>
      </Row>
    </Layout>
  );
}

export default MealPlanDetails;
