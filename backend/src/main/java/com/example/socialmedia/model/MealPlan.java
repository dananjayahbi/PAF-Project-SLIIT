package com.example.socialmedia.model;
import org.springframework.data.annotation.Id;
import org.springframework.data.mongodb.core.mapping.Document;
import java.util.List;

@Document(collection = "mealPlans")
public class MealPlan {

    @Id
    private String id;
    private String title;
    private List<String> recipes;
    private List<String> ingredients;
    private String instructions;
    private List<String> dietaryPreferences;
    private NutritionalInformation nutritionalInformation;
    private List<String> photos;
    private String portionSizes;
    private String createdByUserId;

    public MealPlan() {

    }

    public MealPlan(String id, String title, List<String> recipes, List<String> ingredients, String instructions, List<String> dietaryPreferences, NutritionalInformation nutritionalInformation, List<String> photos, String portionSizes, String createdByUserId) {
        this.id = id;
        this.title = title;
        this.recipes = recipes;
        this.ingredients = ingredients;
        this.instructions = instructions;
        this.dietaryPreferences = dietaryPreferences;
        this.nutritionalInformation = nutritionalInformation;
        this.photos = photos;
        this.portionSizes = portionSizes;
        this.createdByUserId = createdByUserId;
    }

    // Getters and setters
    public String getId() {
        return id;
    }

    public void setId(String id) {
        this.id = id;
    }

    public String getTitle() {
        return title;
    }

    public void setTitle(String title) {
        this.title = title;
    }

    public List<String> getRecipes() {
        return recipes;
    }

    public void setRecipes(List<String> recipes) {
        this.recipes = recipes;
    }

    public List<String> getIngredients() {
        return ingredients;
    }

    public void setIngredients(List<String> ingredients) {
        this.ingredients = ingredients;
    }

    public String getInstructions() {
        return instructions;
    }

    public void setInstructions(String instructions) {
        this.instructions = instructions;
    }

    public List<String> getDietaryPreferences() {
        return dietaryPreferences;
    }

    public void setDietaryPreferences(List<String> dietaryPreferences) {
        this.dietaryPreferences = dietaryPreferences;
    }

    public NutritionalInformation getNutritionalInformation() {
        return nutritionalInformation;
    }

    public void setNutritionalInformation(NutritionalInformation nutritionalInformation) {
        this.nutritionalInformation = nutritionalInformation;
    }

    public List<String> getPhotos() {
        return photos;
    }

    public void setPhotos(List<String> photos) {
        this.photos = photos;
    }

    public String getPortionSizes() {
        return portionSizes;
    }

    public void setPortionSizes(String portionSizes) {
        this.portionSizes = portionSizes;
    }

    public String getCreatedByUserId() {
        return createdByUserId;
    }

    public void setCreatedByUserId(String createdByUserId) {
        this.createdByUserId = createdByUserId;
    }
}
