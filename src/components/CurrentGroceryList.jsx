import { useAppState } from "../providers/AppState.jsx";
import { useGroceryList } from "../hooks/useGroceryList.jsx";
import { useGroceryLists } from "../hooks/useGroceryLists.jsx";

import { DeleteOutlineRounded, Send } from "@mui/icons-material";

import * as Icons from "@mui/icons-material";
import Box from "@mui/material/Box";
import Toolbar from "@mui/material/Toolbar";
import TextField from "@mui/material/TextField";
import Typography from "@mui/material/Typography";
import Divider from "@mui/material/Divider";
import EditIcon from "@mui/icons-material/Edit";
import Chip from "@mui/material/Chip";

import List from "@mui/material/List";
import ListItem from "@mui/material/ListItem";
import ListItemButton from "@mui/material/ListItemButton";
import ListItemIcon from "@mui/material/ListItemIcon";
import ListItemText from "@mui/material/ListItemText";
import Checkbox from "@mui/material/Checkbox";
import IconButton from "@mui/material/IconButton";
import { useState, useEffect } from "react";

export default function CurrentGroceryList() {
  const { currentList } = useAppState();
  const { data, toggleItem } = useGroceryList(currentList);
  const { updateList } = useGroceryLists();
  const [originalListName, setOriginalListName] = useState("");
  const [isEditing, setIsEditing] = useState(false);
  // const [items, setItems] = useState([]);

  useEffect(() => {
    if (data.name) {
      setOriginalListName(data.name);
    }
  }, [data.name]);

  const Icon = Icons[data?.icon];

  const handleEditClick = () => {
    setIsEditing(true);
  };

  // async to be added later
  const handleSaveClick = () => {
    updateList(currentList.id, originalListName);
    setIsEditing(false);
  };

  const handleToggle = async (id) => {
    await toggleItem(id);
  };

  const deleteItem = (id) => {
    // Logic for deleting the item with the given id
    console.log("Deleting item:", id);
  };

  return (
    <Box sx={{ flexGrow: 1, p: 3 }}>
      <Toolbar />
      <Box sx={{ flex: 1 }}>
        <Box sx={{ display: "flex", alignItems: "center" }}>
          <Box
            sx={{
              border: (theme) => `1px solid ${theme.palette.divider}`,
              p: 1,
              mr: 1,
              borderRadius: "50%",
              display: "flex",
            }}
          >
            {Icon ? <Icon fontSize="large" /> : <Icons.List fontSize="large" />}
          </Box>
          {isEditing ? (
            <TextField
              variant="outlined"
              value={originalListName}
              onChange={(event) => {
                setOriginalListName(event.target.value);
              }}
            />
          ) : (
            <Typography variant="h4">{originalListName}</Typography>
          )}
          <IconButton
            edge="end"
            aria-label="edit"
            onClick={isEditing ? handleSaveClick : handleEditClick}
          >
            {isEditing ? <Send /> : <EditIcon />}
          </IconButton>
        </Box>
        <Divider>
          <Chip label="Items" size="small" />
        </Divider>
        <List
          sx={{ width: "100%", bgcolor: "background.paper", mx: "auto", mt: 2 }}
        >
          {data.items.map(({ id, name, purchased }) => {
            const labelId = `checkbox-list-label-${id}`;

            return (
              <ListItem
                key={id}
                secondaryAction={
                  <IconButton
                    edge="end"
                    aria-label="delete"
                    onClick={() => deleteItem(id)}
                  >
                    <DeleteOutlineRounded />
                  </IconButton>
                }
                disablePadding
              >
                <ListItemButton
                  role={undefined}
                  onClick={() => handleToggle(id)}
                  dense
                >
                  <ListItemIcon>
                    <Checkbox
                      edge="start"
                      checked={purchased}
                      tabIndex={-1}
                      disableRipple
                      inputProps={{ "aria-labelledby": labelId }}
                    />
                  </ListItemIcon>
                  <ListItemText id={labelId} primary={name} />
                </ListItemButton>
              </ListItem>
            );
          })}
        </List>
      </Box>
    </Box>
  );
}
