import express from "express";
import axios from "axios";
import cors from "cors";
import dotenv from "dotenv";

dotenv.config({ path: "./../.env" });
console.log("PORT:", process.env.PORT);

const app = express();
const PORT = process.env.PORT || 5000;

app.use(cors());

const API_KEY = process.env.SPOONACULAR_API_KEY;
const BASE_URL = "https://api.spoonacular.com";

app.get("/api/recipes", async (req, res) => {
  const ingredients = req.query.ingredients;

  console.log(ingredients);

  if (!ingredients) {
    return res
      .status(400)
      .json({ error: "Ingredients parameter is required." });
  }

  try {
    const url = `${BASE_URL}/recipes/findByIngredients`;
    console.log("Full URL with params:", url, {
      ingredients: ingredients,
      number: 3,
      ranking: 1,
      ignorePantry: true,
      apiKey: API_KEY,
    });

    const response = await axios.get(`${BASE_URL}/recipes/findByIngredients`, {
      params: {
        ingredients: ingredients,
        number: 3,
        ranking: 1,
        ignorePantry: true,
        apiKey: API_KEY,
      },
      timeout: 10000,
    });
    res.json(response.data);
  } catch (error) {
    console.error("Error fetching recipes:", error.message);
    res.status(500).json({ error: "Failed to fetch recipes." });
  }
});

app.get("/api/recipes/:id/information", async (req, res) => {
  const { id } = req.params;

  if (!id) {
    return res.status(400).json({ error: "Recipe ID is required." });
  }
  try {
    const externalApiUrl = `${BASE_URL}/recipes/${id}/information`;
    const response = await axios.get(externalApiUrl, {
      params: {
        apiKey: API_KEY,
      },
      timeout: 10000,
    });
    res.status(200).json(response.data);
  } catch (error) {
    console.error(`Error fetching recipe with ID ${id}: `, error.message);
    if (error.response) {
      res.status(error.response.status).json({
        error:
          error.response.data.message || "Error fetching recipe information.",
      });
    } else if (error.request) {
      res.status(503).json({ error: "External API is unavailable." });
    } else {
      res.status(500).json({ error: "Internal server error." });
    }
  }
});

app.listen(PORT, (err) => {
  if (err) {
    console.error("Failed to start server:", err);
  } else {
    console.log(`Server is running on port ${PORT}`);
  }
});
