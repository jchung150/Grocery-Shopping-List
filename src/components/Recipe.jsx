import { useState, useEffect, useRef, Fragment } from "react";
import Button from "@mui/material/Button";
import Dialog from "@mui/material/Dialog";
import DialogTitle from "@mui/material/DialogTitle";
import DialogContent from "@mui/material/DialogContent";
import DialogActions from "@mui/material/DialogActions";
import IconButton from "@mui/material/IconButton";
import CloseIcon from "@mui/icons-material/Close";
import Typography from "@mui/material/Typography";
import parse from "html-react-parser";

import { findRecipeById } from "../api/recipeAPI";
import { DialogContentText } from "@mui/material";

export default function Recipe({ id, open, onClose }) {
  const [scroll, setScroll] = useState("paper");
  const [error, setError] = useState(null);
  const [recipe, setRecipe] = useState(null);

  useEffect(() => {
    if (id && open) {
      const fetchRecipe = async () => {
        try {
          const data = await findRecipeById(id);
          setScroll("paper");
          setRecipe(data);
        } catch (error) {
          setError(error.message);
        }
      };
      fetchRecipe();
    }
  }, [id, open]);

  const descriptionElementRef = useRef(null);
  useEffect(() => {
    if (open) {
      const { current: descriptionElement } = descriptionElementRef;
      if (descriptionElement !== null) {
        descriptionElement.focus();
      }
    }
  }, [open]);

  if (error) return <Typography color="error">Error: {error}</Typography>;
  if (!recipe) return <Typography>No recipe found.</Typography>;

  return (
    <Fragment>
      <Dialog
        open={open}
        onClose={onClose}
        scroll={scroll}
        aria-labelledby="scroll-dialog-title"
      >
        <DialogTitle id="scroll-dialog-title">{recipe.title}</DialogTitle>
        <IconButton
          aria-label="close"
          onClick={onClose}
          sx={(theme) => ({
            position: "absolute",
            right: 8,
            top: 8,
            color: theme.palette.grey[500],
          })}
        >
          <CloseIcon />
        </IconButton>
        <DialogContent dividers={scroll === "paper"}>
          <DialogContentText
            id="scroll-dialog-description"
            ref={descriptionElementRef}
            tabIndex={-1}
          >
            <strong>Be Ready In:</strong> {recipe?.readyInMinutes} minutes
            <br />
            <strong>Servings:</strong> {recipe?.servings}
            <br />
            <strong>Instructions:</strong> {parse(recipe?.summary)}
          </DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button autoFocus onClick={onClose} color="primary">
            Close
          </Button>
        </DialogActions>
      </Dialog>
    </Fragment>
  );
}
