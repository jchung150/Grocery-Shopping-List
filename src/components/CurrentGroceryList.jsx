import { useState, useEffect } from "react";
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
import Button from "@mui/material/Button";
import List from "@mui/material/List";
import ListItem from "@mui/material/ListItem";
import ListItemButton from "@mui/material/ListItemButton";
import ListItemIcon from "@mui/material/ListItemIcon";
import ListItemText from "@mui/material/ListItemText";
import Checkbox from "@mui/material/Checkbox";
import IconButton from "@mui/material/IconButton";
import Modal from "@mui/material/Modal";

export default function CurrentGroceryList() {
  const { currentList, setCurrentList } = useAppState();
  const { data: lists, updateList, deleteList } = useGroceryLists(); //
  const { data, toggleItem } = useGroceryList(currentList); // currentList is ID
  const [text, setText] = useState("");
  const [isEditing, setIsEditing] = useState(false);
  const [open, setOpen] = useState(false);

  useEffect(() => {
    if (data) {
      setText(data.name);
    }
  }, [data]);

  useEffect(() => {
    if (!currentList) {
      setCurrentList(null);
    }
  }, [currentList, setCurrentList]);

  const Icon = Icons[data?.icon];

  // async to be added later
  const handleSaveClick = async () => {
    await updateList(currentList, text);
    setIsEditing(false);
  };

  const handleEditClick = () => {
    setIsEditing(true);
  };

  const handleDelete = async () => {
    await deleteList(currentList);
    handleClose();

    // select the next list, if the current list is removed
    const currentIndex = lists.findIndex((list) => list.id === currentList);

    if (lists.length > 1) {
      if (currentIndex === lists.length - 1) {
        // If last item, set to previous
        setCurrentList(lists[currentIndex - 1].id);
      } else {
        // Set to next item
        setCurrentList(lists[currentIndex + 1].id);
      }
    } else {
      setCurrentList(null); // No more lists
    }
  };

  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);

  const handleToggle = async (id) => {
    await toggleItem(id);
  };

  const deleteItem = (id) => {
    // Logic for deleting the item with the given id
    console.log("Deleting item:", id);
  };

  if (!currentList) {
    return (
      <Box sx={{ flexGrow: 1, p: 3 }}>
        <Toolbar />
        <Typography variant="h6">Add a new list</Typography>
      </Box>
    );
  }

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
              value={text}
              onChange={(e) => {
                setText(e.target.value);
              }}
            />
          ) : (
            <Typography variant="h4">{text}</Typography>
          )}
          <IconButton
            edge="end"
            aria-label="edit"
            onClick={isEditing ? handleSaveClick : handleEditClick}
          >
            {isEditing ? <Send /> : <EditIcon />}
          </IconButton>
          <IconButton edge="end" aria-label="delete" onClick={handleOpen}>
            <DeleteOutlineRounded />
          </IconButton>
          <Modal
            open={open}
            onClose={handleClose}
            aria-labelledby="modal-modal-title"
            aria-describedby="modal-modal-description"
          >
            <Box
              sx={{
                position: "absolute",
                top: "50%",
                left: "50%",
                transform: "translate(-50%, -50%)",
                width: 400,
                bgcolor: "background.paper",
                border: "2px solid #000",
                boxShadow: 24,
                p: 4,
              }}
            >
              <Typography id="modal-modal-title" variant="h6" component="h2">
                Delete
              </Typography>
              <Typography id="modal-modal-description" sx={{ mt: 2 }}>
                Are you sure you want to delete this list?
              </Typography>
              <Button variant="outlined" onClick={handleClose}>
                Cancel
              </Button>
              <Button variant="contained" onClick={handleDelete}>
                Delete
              </Button>
            </Box>
          </Modal>
        </Box>
        <Divider>
          <Chip label="Items" size="small" />
        </Divider>
        <List
          sx={{
            width: "100%",
            bgcolor: "background.paper",
            mx: "auto",
            mt: 2,
          }}
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
