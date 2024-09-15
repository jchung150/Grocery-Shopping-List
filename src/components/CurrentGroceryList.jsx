import { useState, useEffect } from "react";
import { useAppState } from "../providers/AppState.jsx";
import { useGroceryList } from "../hooks/useGroceryList.jsx";
import { useGroceryLists } from "../hooks/useGroceryLists.jsx";
import { DeleteOutlineRounded, Send } from "@mui/icons-material";
// import useSpeechRecognition from "../hooks/useSpeechRecognition.jsx";
import SpeechRecognition, {
  useSpeechRecognition,
} from "react-speech-recognition";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faMicrophone } from "@fortawesome/free-solid-svg-icons";
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
import InputAdornment from "@mui/material/InputAdornment";
import FormControl from "@mui/material/FormControl";
import InputLabel from "@mui/material/InputLabel";
import { FilledInput } from "@mui/material";

export default function CurrentGroceryList() {
  const {
    transcript,
    listening,
    resetTranscript,
    browserSupportsSpeechRecognition,
  } = useSpeechRecognition();

  const { currentList, setCurrentList } = useAppState();
  const { data: lists, updateList, deleteList } = useGroceryLists();
  const { data, toggleItem, deleteItem, newItem } = useGroceryList(currentList);
  const [listName, setListName] = useState("");
  const [itemName, setItemName] = useState("");
  const [isEditing, setIsEditing] = useState(false);
  const [open, setOpen] = useState(false);
  const [error, setError] = useState(null);

  useEffect(() => {
    if (data) {
      setListName(data.name);
    }
  }, [data]);

  useEffect(() => {
    if (!currentList) {
      setCurrentList(null);
    }
  }, [currentList, setCurrentList]);

  useEffect(() => {
    if (!listening && transcript) {
      setItemName(transcript);
      resetTranscript();
    }
  }, [listening, transcript, resetTranscript]);

  useEffect(() => {
    SpeechRecognition.onError = (event) => {
      console.error("Speech recognition error:", event.error);
      setError(`Error: ${event.error}`);
    };

    return () => {
      SpeechRecognition.onError = null;
    };
  }, []);

  const Icon = Icons[data?.icon];

  const handleSaveClick = async () => {
    await updateList(currentList, listName);
    setIsEditing(false);
  };

  const handleEditClick = () => {
    setIsEditing(true);
  };

  const handleDeleteList = async () => {
    await deleteList(currentList);
    handleClose();
    const currentIndex = lists.findIndex((list) => list.id === currentList);
    if (lists.length > 1) {
      if (currentIndex === lists.length - 1) {
        setCurrentList(lists[currentIndex - 1].id);
      } else {
        setCurrentList(lists[currentIndex + 1].id);
      }
    } else {
      setCurrentList(null);
    }
  };

  const handleSaveItemClick = async (name) => {
    await newItem(name);
    setItemName("");
  };

  const handleToggleItem = async (id) => {
    await toggleItem(id);
  };

  const handleDeleteItem = async (id) => {
    await deleteItem(id);
  };

  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);

  if (!currentList) {
    return (
      <Box sx={{ flexGrow: 1, p: 3 }}>
        <Toolbar />
        <Typography variant="h6">Add a new list</Typography>
      </Box>
    );
  }

  return (
    <Box
      sx={{
        flexGrow: 1,
        p: 3,
        flexShrink: 0,
        minWidth: 500,
        maxWidth: "100%",
      }}
    >
      <Toolbar />
      <Box sx={{ flex: 1 }}>
        <Box
          sx={{
            display: "flex",
            alignItems: "center",
            mb: 1,
          }}
        >
          {" "}
          <Box
            sx={{
              display: "flex",
              alignItems: "center",
              flexGrow: 1,
            }}
          >
            <Box
              sx={{
                border: (theme) => `1px solid ${theme.palette.divider}`,
                p: 1,
                mr: 1,
                borderRadius: "50%",
                display: "flex",
              }}
            >
              {Icon ? (
                <Icon fontSize="large" />
              ) : (
                <Icons.List fontSize="large" />
              )}
            </Box>
            {isEditing ? (
              <TextField
                variant="outlined"
                value={listName}
                onChange={(e) => {
                  setListName(e.target.value);
                }}
              />
            ) : (
              <Typography variant="h4">{listName}</Typography>
            )}
          </Box>
          <Box sx={{ mr: 2 }}>
            <IconButton
              sx={{ mr: 0.5 }}
              edge="end"
              aria-label="edit"
              onClick={isEditing ? handleSaveClick : handleEditClick}
            >
              {isEditing ? <Send /> : <EditIcon />}
            </IconButton>
            <IconButton edge="end" aria-label="delete" onClick={handleOpen}>
              <DeleteOutlineRounded />
            </IconButton>
          </Box>
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
              <Button variant="contained" onClick={handleDeleteList}>
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
            mt: 1,
          }}
        >
          {data.items.map(({ id, name, purchased }) => {
            const labelId = `checkbox-list-label-${id}`;

            return (
              <ListItem
                sx={{ p: 1, my: 2, boxShadow: 2, borderRadius: 3 }}
                key={id}
                secondaryAction={
                  <IconButton
                    edge="end"
                    aria-label="delete"
                    onClick={() => handleDeleteItem(id)}
                  >
                    <DeleteOutlineRounded />
                  </IconButton>
                }
                disablePadding
              >
                <ListItemButton
                  role={undefined}
                  onClick={() => handleToggleItem(id)}
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
      <Box>
        <Divider></Divider>
        <FormControl sx={{ mt: 3 }} fullWidth variant="filled">
          <InputLabel htmlFor="filled-adornment-item">
            {listening ? "Listening..." : "New Item"}
          </InputLabel>
          <FilledInput
            id="filled-adornment-item"
            type="text"
            value={itemName}
            onChange={(e) => {
              setItemName(e.target.value);
            }}
            disabled={listening}
            endAdornment={
              <InputAdornment position="end">
                {browserSupportsSpeechRecognition ? (
                  <IconButton
                    aria-label="speak to add item"
                    edge="end"
                    onClick={() =>
                      SpeechRecognition.startListening({
                        continuous: false,
                        language: "en-US",
                      })
                    }
                  >
                    <FontAwesomeIcon icon={faMicrophone} />
                  </IconButton>
                ) : null}
                <IconButton
                  aria-label="add item"
                  onClick={() => handleSaveItemClick(itemName)}
                  edge="end"
                >
                  <Send />
                </IconButton>
              </InputAdornment>
            }
            label="New Item"
          />
        </FormControl>
      </Box>
      <Box sx={{ mt: 2 }}>
        {error && (
          <Typography variant="caption" color="error" sx={{ mt: 1 }}>
            {error}
          </Typography>
        )}
      </Box>
    </Box>
  );
}
