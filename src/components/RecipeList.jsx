import { useState, useEffect } from "react";
import Card from "@mui/material/Card";
import CardActions from "@mui/material/CardActions";
import CardContent from "@mui/material/CardContent";
import CardMedia from "@mui/material/CardMedia";
import Button from "@mui/material/Button";
import Typography from "@mui/material/Typography";
import { findRecipeByIngredients } from "../api/recipeAPI";

export default function RecipeList({ ingredients }) {
  const [recipes, setRecipes] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchRecipes = async () => {
      setIsLoading(true);
      setError(null);
      try {
        const data = await findRecipeByIngredients(ingredients);
        setRecipes(data);
      } catch (error) {
        setError(error.message);
      } finally {
        setIsLoading(false);
      }
    };

    if (ingredients.length > 0) {
      fetchRecipes();
    } else {
      setRecipes([]);
    }
  }, [ingredients]);

  if (isLoading) return <p>Loading recipes...</p>;
  if (error) return <p>Error: {error} </p>;
  if (recipes.length === 0)
    return <p>No recipes found. Try adding some ingredients!</p>;

  return (
    <div>
      {recipes.map((recipe) => (
        <Card sx={{ maxWidth: 345 }} key={recipe.id}>
          <CardMedia
            sx={{ height: 140 }}
            image={recipe.image}
            title={recipe.title}
          />
          <CardContent>
            <Typography gutterBottom variant="h5" component="div">
              {recipe.title}
            </Typography>
            <Typography variant="body2" sx={{ color: "text.secondary" }}>
              Missing Ingredients:
            </Typography>
            {recipe.missedIngredients.length > 0 ? (
              recipe.missedIngredients.map((ingredient) => (
                <Typography
                  key={ingredient.id}
                  variant="body2"
                  sx={{ color: "text.secondary" }}
                >
                  • {ingredient.name}
                </Typography>
              ))
            ) : (
              <Typography variant="body2" sx={{ color: "text.secondary" }}>
                None! You have all the ingredients.
              </Typography>
            )}
          </CardContent>
          <CardActions>
            <Button size="small">Share</Button>
            <Button size="small">Learn More</Button>
          </CardActions>
        </Card>
      ))}
    </div>
  );
}
