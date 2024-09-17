import express from "express";
import axios from "axios";
import cors from "cors";
import dotenv from "dotenv";

dotenv.config({ path: "./../.env" });
console.log("PORT:", process.env.PORT);

const app = express();
const PORT = process.env.PORT || 5000;

// app.use(cors({ origin: "http://localhost:5173" }));
app.use(cors());

const API_KEY = process.env.SPOONACULAR_API_KEY;
const BASE_URL = "https://api.spoonacular.com";

console.log("Spoonacular API Key:", API_KEY);

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

app.listen(PORT, (err) => {
  if (err) {
    console.error("Failed to start server:", err);
  } else {
    console.log(`Server is running on port ${PORT}`);
  }
});
