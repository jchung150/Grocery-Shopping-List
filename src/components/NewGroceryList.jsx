import Button from "@mui/material/Button";
import TextField from "@mui/material/TextField";
import { useState, useEffect, Fragment } from "react";
import * as Icons from "@mui/icons-material";
import Card from "@mui/material/Card";
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import ToggleButton from "@mui/material/ToggleButton";

import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import DialogContentText from "@mui/material/DialogContentText";
import DialogTitle from "@mui/material/DialogTitle";
import { useGroceryLists } from "../hooks/useGroceryLists.jsx";

export default function NewListDialog({ onClose }) {
  const [listName, setListName] = useState("");
  const [iconSearch, setIconSearch] = useState("");
  const [filteredIcons, setFilteredIcons] = useState(Object.entries(Icons));
  const { newList } = useGroceryLists();
  const [icon, setIcon] = useState("");

  useEffect(() => {
    setFilteredIcons(
      Object.entries(Icons)
        .filter(([name]) => !/Outlined$|TwoTone$|Rounded$|Sharp$/.test(name))
        .filter(([name]) =>
          iconSearch ? name.toLowerCase().includes(iconSearch) : true
        )
        .slice(0, 9)
    );
  }, [iconSearch]);

  const handleCreateListClick = async () => {
    newList(iconSearch, icon);
    onClose();
  };

  return (
    <Fragment>
      <Dialog
        open={true}
        onClose={onClose}
        // aria-labelledby="alert-dialog-title"
        // aria-describedby="alert-dialog-description"
      >
        <DialogTitle id="alert-dialog-title">
          Create a New Grocery List
        </DialogTitle>
        <DialogContent>
          <DialogContentText id="alert-dialog-description">
            Please enter the name and icon for your new grocery list.
          </DialogContentText>
          <TextField
            id="standard-basic"
            label="New List"
            variant="standard"
            autoFocus
            fullWidth
            value={listName}
            onChange={(e) => {
              setListName(e.target.value);
            }}
          />
          <TextField
            id="standard-basic"
            label="Icon Search"
            variant="standard"
            autoFocus
            fullWidth
            value={iconSearch}
            onChange={(e) => {
              setIconSearch(e.target.value);
            }}
          />
          <Card
            variant="outlined"
            sx={{ mt: 1, p: 1, display: "flex", justifyContent: "center" }}
          >
            {filteredIcons.map(([name, Icon]) => (
              <Box
                sx={{
                  display: "inline-flex",
                  flexDirection: "column",
                  width: 40,
                  mx: 1,
                }}
                key={name}
              >
                <ToggleButton
                  value={name}
                  selected={name === icon}
                  onClick={() => setIcon(name)}
                >
                  <Icon />
                </ToggleButton>
                <Typography
                  variant="caption"
                  align="center"
                  sx={{ textOverflow: "ellipsis", overflow: "hidden" }}
                >
                  {name}
                </Typography>
              </Box>
            ))}
          </Card>
        </DialogContent>
        <DialogActions>
          <Button onClick={onClose}>Cancel</Button>
          <Button onClick={handleCreateListClick} autoFocus>
            Create
          </Button>
        </DialogActions>
      </Dialog>
    </Fragment>
  );
}
