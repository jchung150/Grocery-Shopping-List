import axios from "axios";
import dotenv from "dotenv";

dotenv.config();

const BASE_URL = "https://api.spoonacular.com";
const API_KEY = process.env.SPOONACULAR_API_KEY;

export const handler = async (event) => {
  if (event.httpMethod !== "GET") {
    return {
      statusCode: 405,
      body: JSON.stringify({ error: "Method Not Allowed" }),
    };
  }

  const {
    ingredients,
    number = 3,
    ranking = 1,
    ignorePantry = true,
  } = event.queryStringParameters || {};

  if (!ingredients) {
    return {
      statusCode: 400,
      body: JSON.stringify({ error: "Ingredients parameter is required." }),
    };
  }

  try {
    const response = await axios.get(`${BASE_URL}/recipes/findByIngredients`, {
      params: {
        ingredients,
        number,
        ranking,
        ignorePantry,
        apiKey: API_KEY,
      },
      timeout: 10000,
    });

    return {
      statusCode: 200,
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(response.data),
    };
  } catch (error) {
    console.error("Error fetching recipes:", error.message);
    return {
      statusCode: error.response ? error.response.status : 500,
      body: JSON.stringify({ error: "Failed to fetch recipes." }),
    };
  }
};
