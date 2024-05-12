import React, { useState } from "react";
import axios from "axios";
import { Col, Row ,Layout,message} from "antd";
import "./styles/addmealplan.scopped.css";
import MealImage from '../../assets/images/food-with-ingredients.jpg';


function AddMealPlan() {
  const [title, setTitle] = useState("");
  const [recipes, setRecipes] = useState([""]);
  const [ingredients, setIngredients] = useState([""]);
  const [instructions, setInstructions] = useState("");
  const [dietaryPreferences, setDietaryPreferences] = useState([""]);
  const [nutritionalInformation, setNutritionalInformation] = useState({
    calories: "",
    caloriesUnit: "",
    protein: "",
    proteinUnit: "",
    carbohydrates: "",
    carbohydratesUnit: "",
    fat: "",
    fatUnit: "",
  });
  const [portionSizes, setPortionSizes] = useState("");
  const [photos, setPhotos] = useState([""]);
  const [createdByUserId, setCreatedByUserId] = useState("");

  const handleChangeRecipe = (index, value) => {
    const updatedRecipes = [...recipes];
    updatedRecipes[index] = value;
    setRecipes(updatedRecipes);
  };

  const handleAddRecipeField = () => {
    setRecipes([...recipes, ""]);
  };

  const handleChangeIngredient = (index, value) => {
    const updatedIngredients = [...ingredients];
    updatedIngredients[index] = value;
    setIngredients(updatedIngredients);
  };

  const handleAddIngredientField = () => {
    setIngredients([...ingredients, ""]);
  };

  const handleChangeDietaryPreference = (index, value) => {
    const updatedDietaryPreferences = [...dietaryPreferences];
    updatedDietaryPreferences[index] = value;
    setDietaryPreferences(updatedDietaryPreferences);
  };

  const handleAddDietaryPreferenceField = () => {
    setDietaryPreferences([...dietaryPreferences, ""]);
  };

  const handleChangePhoto = (index, value) => {
    const updatedPhotos = [...photos];
    updatedPhotos[index] = value;
    setPhotos(updatedPhotos);
  };

  const handleAddPhotoField = () => {
    setPhotos([...photos, ""]);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!title) {
      message.error("Title Field is required.");
      return;
    }
    if (!portionSizes) {
      message.error("Portion Sizes Field is required.");
      return;
    }
    if (!instructions) {
      message.error("Instructions Field is required.");
      return;
    }

    const mealPlanData = {
      title,
      recipes,
      ingredients,
      instructions,
      dietaryPreferences,
      nutritionalInformation,
      portionSizes,
      photos,
      createdByUserId,
    };

    try {
      const response = await axios.post(
        "http://localhost:8080/api/mealplans/create",
        mealPlanData
      );
      console.log(response.data);
      message.success("Meal Plan Created successful!");

    } catch (error) {
      console.error("Error adding meal plan:", error);
    }
  };

  return (
    <Layout style={{backgroundImage: `url(${MealImage})`}}>
    <div className="form-container">
      <Row>
        <Col span={24}>
          <h2
            style={{
              textAlign: "center",
              fontWeight: 400,
              fontSize: "25px",
              marginBottom:20
            }}
          >
            Add Meal Plan
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
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              placeholder="Add A Meal Plan Title"
            />
          </Col>
        </Row>
        <Row gutter={[16, 16]}>
          <Col span={24}>
            <div className="form-label">
              <label>Recipes:</label>
            </div>
            {recipes.map((recipe, index) => (
              <div key={index}>
                <input
                  type="text"
                  className="form-input"
                  value={recipe}
                  onChange={(e) => handleChangeRecipe(index, e.target.value)}
                  placeholder="Add Meal Plan Recepies"
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
              {ingredients.map((ingredient, index) => (
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
              value={instructions}
              onChange={(e) => setInstructions(e.target.value)}
              placeholder="Add Meal Instructions"
            />
          </Col>
        </Row>
        </div>
        <Row gutter={[16, 16]}>
          <Col span={24}>            
              <div className="form-label">
              <label> Dietary Preferences:</label>
            </div>
              {dietaryPreferences.map((preference, index) => (
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
              <div style={{ padding: "10px 120px 0 0px" }}>
                <Row gutter={[50, 0]}>
                  <Col span={12}>
                    <input
                      type="text"
                      className="form-input"
                      value={nutritionalInformation.calories}
                      onChange={(e) =>
                        setNutritionalInformation({
                          ...nutritionalInformation,
                          calories: e.target.value,
                        })
                      }
                      placeholder="Calories"
                    />
                  </Col>
                  <Col span={12}>
                    <input
                      type="text"
                      className="form-input"
                      value={nutritionalInformation.caloriesUnit}
                      onChange={(e) =>
                        setNutritionalInformation({
                          ...nutritionalInformation,
                          caloriesUnit: e.target.value,
                        })
                      }
                      placeholder="Calories Unit"
                    />
                  </Col>
                  <Col span={12}>
                    <input
                      type="text"
                      className="form-input"
                      value={nutritionalInformation.protein}
                      onChange={(e) =>
                        setNutritionalInformation({
                          ...nutritionalInformation,
                          protein: e.target.value,
                        })
                      }
                      placeholder="Protein"
                    />
                  </Col>
                  <Col span={12}>
                    <input
                      type="text"
                      className="form-input"
                      value={nutritionalInformation.proteinUnit}
                      onChange={(e) =>
                        setNutritionalInformation({
                          ...nutritionalInformation,
                          proteinUnit: e.target.value,
                        })
                      }
                      placeholder="Protein Unit"
                    />
                  </Col>
                  <Col span={12}>
                    <input
                      type="text"
                      className="form-input"
                      value={nutritionalInformation.carbohydrates}
                      onChange={(e) =>
                        setNutritionalInformation({
                          ...nutritionalInformation,
                          carbohydrates: e.target.value,
                        })
                      }
                      placeholder="Carbohydrates"
                    />
                  </Col>
                  <Col span={12}>
                    <input
                      type="text"
                      className="form-input"
                      value={nutritionalInformation.carbohydratesUnit}
                      onChange={(e) =>
                        setNutritionalInformation({
                          ...nutritionalInformation,
                          carbohydratesUnit: e.target.value,
                        })
                      }
                      placeholder="Carbohydrates Unit"
                    />
                  </Col>
                  <Col span={12}>
                    <input
                      type="text"
                      className="form-input"
                      value={nutritionalInformation.fat}
                      onChange={(e) =>
                        setNutritionalInformation({
                          ...nutritionalInformation,
                          fat: e.target.value,
                        })
                      }
                      placeholder="Fat"
                    />
                  </Col>
                  <Col span={12}>
                    <input
                      type="text"
                      className="form-input"
                      value={nutritionalInformation.fatUnit}
                      onChange={(e) =>
                        setNutritionalInformation({
                          ...nutritionalInformation,
                          fatUnit: e.target.value,
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
              <label> Portion Sizes:</label>
            </div>            
              <input
                type="text"
                className="form-input"
                value={portionSizes}
                onChange={(e) => setPortionSizes(e.target.value)}
                placeholder="Add Meal Portion Sizes"

                
              />
          </Col>
        </Row>
        <Row gutter={[16, 16]}>
          <Col span={24}>            
              <div className="form-label">
              <label> Photos:</label>
            </div>  
              {photos.map((photo, index) => (
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
          <div style={{margin:"20px 0 0 380px"}}>
            <button type="submit" style={{width:120,height:40}}className="form-button">
              Add Meal
            </button>
          </div>
        </Row>
      </form>
    </div>
    </Layout>
  );
}

export default AddMealPlan;
