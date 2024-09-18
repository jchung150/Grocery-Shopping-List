import axios from "axios";

const BASE_URL = "http://localhost:5001/api";

export const findRecipeByIngredients = async (ingredients) => {
  const params = {
    ingredients: ingredients.join(","),
    number: 3,
  };

  try {
    const response = await axios.get(`${BASE_URL}/recipes`, {
      params,
      timeout: 10000, // Set a 10-second timeout
    });
    return response.data;
  } catch (error) {
    console.error("Error fetching recipes: ", error);
    throw error;
  }
};

export const findRecipeById = async (id) => {
  try {
    const response = await axios.get(`${BASE_URL}/recipes/${id}/information`, {
      timeout: 10000,
    });
    return response.data;
  } catch (error) {
    if (error.response) {
      console.error("Error fetching recipe:", error.response.data.error);
      throw new Error(error.response.data.error);
    } else if (error.request) {
      console.error("No response received from the server.");
      throw new Error("No response received from the server.");
    } else {
      console.error("Error:", error.message);
      throw new Error("An unexpected error occurred.");
    }
  }
};
