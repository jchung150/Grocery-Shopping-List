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

  const { id } = event.queryStringParameters || {};

  if (!id) {
    return {
      statusCode: 400,
      body: JSON.stringify({ error: "Recipe ID is required." }),
    };
  }

  try {
    const externalApiUrl = `${BASE_URL}/recipes/${id}/information`;

    const response = await axios.get(externalApiUrl, {
      params: {
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
    console.error(`Error fetching recipe with ID ${id}:`, error.message);
    if (error.response) {
      return {
        statusCode: error.response.status,
        body: JSON.stringify({
          error:
            error.response.data.message || "Error fetching recipe information.",
        }),
      };
    } else if (error.request) {
      return {
        statusCode: 503,
        body: JSON.stringify({ error: "External API is unavailable." }),
      };
    } else {
      return {
        statusCode: 500,
        body: JSON.stringify({ error: "Internal server error." }),
      };
    }
  }
};
