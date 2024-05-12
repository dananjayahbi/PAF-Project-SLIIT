import React, { useState, useEffect } from "react";
import { useParams } from 'react-router-dom';
import axios from "axios";
import { Col, Row, Layout, message } from "antd";
import "./styles/addmealplan.scopped.css";
import MealImage from "../../assets/images/food-with-ingredients.jpg";

function UpdateMealPlan({ mealPlanId }) {
  const [mealPlan, setMealPlan] = useState({
    title: "",
    recipes: [""],
    ingredients: [""],
    instructions: "",
    dietaryPreferences: [""],
    nutritionalInformation: {
      calories: "",
      caloriesUnit: "",
      protein: "",
      proteinUnit: "",
      carbohydrates: "",
      carbohydratesUnit: "",
      fat: "",
      fatUnit: "",
    },
    portionSizes: "",
    photos: [""],
    createdByUserId: "",
  });
  const { id } = useParams();

  useEffect(() => {
    const fetchMealPlan = async () => {
      try {
        const response = await axios.get(
          `http://localhost:8080/api/mealplans/${id}`
        );
        setMealPlan(response.data);
      } catch (error) {
        console.error("Error fetching meal plan:", error);
      }
    };

    fetchMealPlan();
  }, [mealPlanId]);

  const handleChangeRecipe = (index, value) => {
    const updatedRecipes = [...mealPlan.recipes];
    updatedRecipes[index] = value;
    setMealPlan({ ...mealPlan, recipes: updatedRecipes });
  };

  const handleAddRecipeField = () => {
    setMealPlan({ ...mealPlan, recipes: [...mealPlan.recipes, ""] });
  };
  const handleChangeIngredient = (index, value) => {
    const updatedIngredients = [...mealPlan.ingredients];
    updatedIngredients[index] = value;
    setMealPlan({ ...mealPlan, ingredients: updatedIngredients });
  };
  
  const handleAddIngredientField = () => {
    setMealPlan({ ...mealPlan, ingredients: [...mealPlan.ingredients, ""] });
  };
  
  const handleChangeDietaryPreference = (index, value) => {
    const updatedDietaryPreferences = [...mealPlan.dietaryPreferences];
    updatedDietaryPreferences[index] = value;
    setMealPlan({ ...mealPlan, dietaryPreferences: updatedDietaryPreferences });
  };
  
  const handleAddDietaryPreferenceField = () => {
    setMealPlan({
      ...mealPlan,
      dietaryPreferences: [...mealPlan.dietaryPreferences, ""],
    });
  };
  
  const handleChangePhoto = (index, value) => {
    const updatedPhotos = [...mealPlan.photos];
    updatedPhotos[index] = value;
    setMealPlan({ ...mealPlan, photos: updatedPhotos });
  };
  
  const handleAddPhotoField = () => {
    setMealPlan({ ...mealPlan, photos: [...mealPlan.photos, ""] });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const response = await axios.put(
        `http://localhost:8080/api/mealplans/${id}`,
        mealPlan
      );
      console.log(response.data);
      message.success("Meal Plan updated successfully!");
      setTimeout(()=>{
        window.location.href = `/mealplan/${id}`;
      },1900)
      
    } catch (error) {
      console.error("Error updating meal plan:", error);
      message.error("An error occurred while updating the meal plan.");
    }
  };

  return (
    <Layout style={{ backgroundImage: `url(${MealImage})` }}>
      <div className="form-container">
        <Row>
          <Col span={24}>
            <h2
              style={{
                textAlign: "center",
                fontWeight: 400,
                fontSize: "25px",
                marginBottom: 20,
              }}
            >
              Update Meal Plan
            </h2>{" "}
          </Col>
        </Row>
        <form onSubmit={handleSubmit}>
          <Row gutter={[16, 16]}>
            <Col span={24}>
              <div className="form-label">
                <label>Title:</label>
              </div>
              <input
                type="text"
                className="form-input"
                value={mealPlan.title}
                onChange={(e) =>
                  setMealPlan({ ...mealPlan, title: e.target.value })
                }
                placeholder="Add A Meal Plan Title"
              />
            </Col>
          </Row>

        <Row gutter={[16, 16]}>
            <Col span={24}>
              <div className="form-label">
                <label>Recipes:</label>
              </div>
              {mealPlan.recipes.map((recipe, index) => (
                <div key={index}>
                  <input
                    type="text"
                    className="form-input"
                    value={recipe}
                    onChange={(e) => handleChangeRecipe(index, e.target.value)}
                    placeholder="Add Meal Plan Recipes"
                  />
                </div>
              ))}
              <button
                type="button"
                className="add-field-button"
                onClick={handleAddRecipeField}
              >
                Add Recipe
              </button>
            </Col>
          </Row>

        <div style={{marginTop:20}}>
        <Row gutter={[16, 16]}>
            <Col span={24}>
              <div className="form-label">
                <label>Ingredients:</label>
              </div>
              {mealPlan.ingredients.map((ingredient, index) => (
                <div key={index}>
                  <input
                    type="text"
                    className="form-input"
                    value={ingredient}
                    onChange={(e) =>
                      handleChangeIngredient(index, e.target.value)
                    }
                    placeholder="Add Ingredients"
                  />
                </div>
              ))}
              <button
                type="button"
                className="add-field-button"
                onClick={handleAddIngredientField}
              >
                Add Ingredient
              </button>
            </Col>
          </Row>
        </div>
        <div style={{marginTop:20}}>
        <Row gutter={[16, 16]}>
            <Col span={24}>
              <div className="form-label">
                <label>Instructions:</label>
              </div>
              <textarea
                className="form-input"
                value={mealPlan.instructions}
                onChange={(e) =>
                  setMealPlan({ ...mealPlan, instructions: e.target.value })
                }
                placeholder="Add Meal Instructions"
              />
            </Col>
          </Row>
        </div>
        <Row gutter={[16, 16]}>
            <Col span={24}>
              <div className="form-label">
                <label>Dietary Preferences:</label>
              </div>
              {mealPlan.dietaryPreferences.map((preference, index) => (
                <div key={index}>
                  <input
                    type="text"
                    className="form-input"
                    value={preference}
                    onChange={(e) =>
                      handleChangeDietaryPreference(index, e.target.value)
                    }
                    placeholder="Add Meal Dietary Preferences"
                  />
                </div>
              ))}
              <button
                type="button"
                className="add-field-button"
                onClick={handleAddDietaryPreferenceField}
              >
                Add Dietary Preference
              </button>
            </Col>
          </Row>
        <div style={{marginTop:20}}>        
        <Row gutter={[4, 4]}>
  <Col span={24}>
    <label className="form-label">
      Nutritional Information:
      <p style={{fontWeight:400,marginTop:15,marginBottom:10}}>(Calories, Protien, Carbohydrates, Fat)</p>

      <div style={{ padding: "10px 120px 0 0px" }}>
        <Row gutter={[16, 16]}>
          <Col span={12}>
            <input
              type="text"
              className="form-input"
              value={mealPlan.nutritionalInformation.calories}
              onChange={(e) =>
                setMealPlan({
                  ...mealPlan,
                  nutritionalInformation: {
                    ...mealPlan.nutritionalInformation,
                    calories: e.target.value,
                  },
                })
              }
              placeholder="Calories"
            />
          </Col>
          <Col span={12}>
            <input
              type="text"
              className="form-input"
              value={mealPlan.nutritionalInformation.caloriesUnit}
              onChange={(e) =>
                setMealPlan({
                  ...mealPlan,
                  nutritionalInformation: {
                    ...mealPlan.nutritionalInformation,
                    caloriesUnit: e.target.value,
                  },
                })
              }
              placeholder="Calories Unit"
            />
          </Col>
          <Col span={12}>
            <input
              type="text"
              className="form-input"
              value={mealPlan.nutritionalInformation.protein}
              onChange={(e) =>
                setMealPlan({
                  ...mealPlan,
                  nutritionalInformation: {
                    ...mealPlan.nutritionalInformation,
                    protein: e.target.value,
                  },
                })
              }
              placeholder="Protein"
            />
          </Col>
          <Col span={12}>
            <input
              type="text"
              className="form-input"
              value={mealPlan.nutritionalInformation.proteinUnit}
              onChange={(e) =>
                setMealPlan({
                  ...mealPlan,
                  nutritionalInformation: {
                    ...mealPlan.nutritionalInformation,
                    proteinUnit: e.target.value,
                  },
                })
              }
              placeholder="Protein Unit"
            />
          </Col>
          <Col span={12}>
            <input
              type="text"
              className="form-input"
              value={mealPlan.nutritionalInformation.carbohydrates}
              onChange={(e) =>
                setMealPlan({
                  ...mealPlan,
                  nutritionalInformation: {
                    ...mealPlan.nutritionalInformation,
                    carbohydrates: e.target.value,
                  },
                })
              }
              placeholder="Carbohydrates"
            />
          </Col>
          <Col span={12}>
            <input
              type="text"
              className="form-input"
              value={mealPlan.nutritionalInformation.carbohydratesUnit}
              onChange={(e) =>
                setMealPlan({
                  ...mealPlan,
                  nutritionalInformation: {
                    ...mealPlan.nutritionalInformation,
                    carbohydratesUnit: e.target.value,
                  },
                })
              }
              placeholder="Carbohydrates Unit"
            />
          </Col>
          <Col span={12}>
            <input
              type="text"
              className="form-input"
              value={mealPlan.nutritionalInformation.fat}
              onChange={(e) =>
                setMealPlan({
                  ...mealPlan,
                  nutritionalInformation: {
                    ...mealPlan.nutritionalInformation,
                    fat: e.target.value,
                  },
                })
              }
              placeholder="Fat"
            />
          </Col>
          <Col span={12}>
            <input
              type="text"
              className="form-input"
              value={mealPlan.nutritionalInformation.fatUnit}
              onChange={(e) =>
                setMealPlan({
                  ...mealPlan,
                  nutritionalInformation: {
                    ...mealPlan.nutritionalInformation,
                    fatUnit: e.target.value,
                  },
                })
              }
              placeholder="Fat Unit"
            />
          </Col>
        </Row>
      </div>
    </label>
  </Col>
</Row>
        </div>
        <Row gutter={[16, 16]}>
          <Col span={24}>
            <div className="form-label">
              <label>Portion Sizes:</label>
            </div>
            <input
              type="text"
              className="form-input"
              value={mealPlan.portionSizes}
              onChange={(e) =>
                setMealPlan({ ...mealPlan, portionSizes: e.target.value })
              }
              placeholder="Add Meal Portion Sizes"
            />
          </Col>
        </Row>
        <Row gutter={[16, 16]}>
          <Col span={24}>
            <div className="form-label">
              <label>Photos:</label>
            </div>
            {mealPlan.photos.map((photo, index) => (
              <div key={index}>
                <input
                  type="text"
                  className="form-input"
                  value={photo}
                  onChange={(e) => handleChangePhoto(index, e.target.value)}
                  placeholder={`Photo URL ${index + 1}`}
                />
              </div>
            ))}
            <button
              type="button"
              className="add-field-button"
              onClick={handleAddPhotoField}
            >
              Add Photo
            </button>
          </Col>
        </Row>
          <Row gutter={[16, 16]}>
            <div style={{ margin: "20px 0 0 380px" }}>
              <button
                type="submit"
                style={{ width: 120, height: 40 }}
                className="form-button"
              >
                Update Meal
              </button>
            </div>
          </Row>
        </form>
      </div>
    </Layout>
  );
}

export default UpdateMealPlan;

