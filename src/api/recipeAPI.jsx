import axios from "axios";

const BASE_URL = "http://localhost:5001/api";

export const findRecipeByIngredients = async (ingredients) => {
  const params = {
    ingredients: ingredients.join(","),
    number: 3,
  };

  console.log(
    "Making request to:",
    `${BASE_URL}/recipes`,
    "with params:",
    params
  ); // Log the URL and params

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
