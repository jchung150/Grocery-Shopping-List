import { useState, useEffect } from "react";
import Box from "@mui/material/Box";
import Card from "@mui/material/Card";
import CardActions from "@mui/material/CardActions";
import CardContent from "@mui/material/CardContent";
import CardMedia from "@mui/material/CardMedia";
import IconButton from "@mui/material/IconButton";
import Typography from "@mui/material/Typography";
import FavoriteIcon from "@mui/icons-material/Favorite";
import ShareIcon from "@mui/icons-material/Share";
import { findRecipeByIngredients } from "../api/recipeAPI";

export default function RecipeList({ ingredients }) {
  const [recipes, setRecipes] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
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

  if (isLoading) return <Typography>Loading recipes...</Typography>;
  if (error) return <Typography color="error">Error: {error}</Typography>;
  if (recipes.length === 0)
    return (
      <Typography>No recipes found. Try adding some ingredients!</Typography>
    );

  return (
    <Box
      sx={{
        display: "flex",
        flexWrap: "wrap",
        justifyContent: "space-between",
        mt: 3,
        m: 2,
        p: 1,
      }}
    >
      {recipes.map((recipe) => (
        <Card sx={{ width: 250, height: 350 }} key={recipe.id}>
          <CardMedia
            sx={{ height: 140, width: "100%", objectFit: "cover" }}
            component="img"
            alt="recipe image"
            image={recipe.image}
            title={recipe.title}
          />
          <CardContent sx={{ paddingBottom: 0 }}>
            <Typography
              gutterBottom
              variant="h6"
              component="div"
              sx={{
                overflow: "hidden",
                textOverflow: "ellipsis",
                display: "-webkit-box",
                WebkitLineClamp: 2,
                WebkitBoxOrient: "vertical",
              }}
            >
              {recipe.title}
            </Typography>
            <Typography variant="body2" sx={{ color: "text.secondary" }}>
              Missing Ingredients:
            </Typography>
            {recipe.missedIngredients.length > 0 ? (
              recipe.missedIngredients.slice(0, 3).map((ingredient) => (
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
            {recipe.missedIngredients.length > 3 && (
              <Typography variant="body2" sx={{ color: "text.secondary" }}>
                ...and {recipe.missedIngredients.length - 3} more
              </Typography>
            )}
          </CardContent>
          <CardActions sx={{ marginTop: "auto" }}>
            {/* <IconButton aria-label="add to favorites">
              <FavoriteIcon />
            </IconButton>
            <IconButton aria-label="share">
              <ShareIcon />
            </IconButton> */}
          </CardActions>
        </Card>
      ))}
    </Box>
  );
}
