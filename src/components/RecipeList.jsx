import { useState, useEffect } from "react";
import Card from "@mui/material/Card";
import CardActions from "@mui/material/CardActions";
import CardContent from "@mui/material/CardContent";
import CardMedia from "@mui/material/CardMedia";
import IconButton from "@mui/material/IconButton";
import Typography from "@mui/material/Typography";
import FavoriteIcon from "@mui/icons-material/Favorite";
import ShareIcon from "@mui/icons-material/Share";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
import { styled } from "@mui/material/styles";
import MoreVertIcon from "@mui/icons-material/MoreVert";
import Collapse from "@mui/material/Collapse";
import { findRecipeByIngredients } from "../api/recipeAPI";

const ExpandMore = styled((props) => {
  const { ...other } = props;
  return <IconButton {...other} />;
})(({ theme }) => ({
  marginLeft: "auto",
  transition: theme.transitions.create("transform", {
    duration: theme.transitions.duration.shortest,
  }),
  variants: [
    {
      props: ({ expand }) => !expand,
      style: {
        transform: "rotate(0deg)",
      },
    },
    {
      props: ({ expand }) => !!expand,
      style: {
        transform: "rotate(180deg)",
      },
    },
  ],
}));

export default function RecipeList({ ingredients }) {
  const [recipes, setRecipes] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);
  const [expanded, setExpanded] = useState(false);

  const handleExpandClick = () => {
    setExpanded(!expanded);
  };

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
            <IconButton aria-label="add to favorites">
              <FavoriteIcon />
            </IconButton>
            <IconButton aria-label="share">
              <ShareIcon />
            </IconButton>
            <ExpandMore
              expand={expanded}
              onClick={handleExpandClick}
              aria-expanded={expanded}
              aria-label="show more"
            >
              <ExpandMoreIcon />
            </ExpandMore>{" "}
          </CardActions>
          <Collapse in={expanded} timeout="auto" unmountOnExit>
            <CardContent>
              <Typography sx={{ marginBottom: 2 }}>Method:</Typography>
              <Typography sx={{ marginBottom: 2 }}>
                Heat 1/2 cup of the broth in a pot until simmering, add saffron
                and set aside for 10 minutes.
              </Typography>
              <Typography sx={{ marginBottom: 2 }}>
                Heat oil in a (14- to 16-inch) paella pan or a large, deep
                skillet over medium-high heat. Add chicken, shrimp and chorizo,
                and cook, stirring occasionally until lightly browned, 6 to 8
                minutes. Transfer shrimp to a large plate and set aside, leaving
                chicken and chorizo in the pan. Add pimentón, bay leaves,
                garlic, tomatoes, onion, salt and pepper, and cook, stirring
                often until thickened and fragrant, about 10 minutes. Add
                saffron broth and remaining 4 1/2 cups chicken broth; bring to a
                boil.
              </Typography>
              <Typography sx={{ marginBottom: 2 }}>
                Add rice and stir very gently to distribute. Top with artichokes
                and peppers, and cook without stirring, until most of the liquid
                is absorbed, 15 to 18 minutes. Reduce heat to medium-low, add
                reserved shrimp and mussels, tucking them down into the rice,
                and cook again without stirring, until mussels have opened and
                rice is just tender, 5 to 7 minutes more. (Discard any mussels
                that don&apos;t open.)
              </Typography>
              <Typography>
                Set aside off of the heat to let rest for 10 minutes, and then
                serve.
              </Typography>
            </CardContent>
          </Collapse>
        </Card>
      ))}
    </div>
  );
}
