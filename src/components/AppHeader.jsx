import AppBar from "@mui/material/AppBar";
import Toolbar from "@mui/material/Toolbar";
import Typography from "@mui/material/Typography";
import IconButton from "@mui/material/IconButton";
import AddIcon from "@mui/icons-material/Add";
import { useState } from "react";
import NewListDialog from "./NewGroceryList.jsx";

export default function AppHeader() {
  const [isDialogActive, setIsDialogActive] = useState(false);

  const handleClick = () => {
    setIsDialogActive(true);
  };

  const handleCloseDialog = () => {
    setIsDialogActive(false);
  };

  return (
    <>
      {isDialogActive && <NewListDialog onClose={handleCloseDialog} />}
      <AppBar
        position="fixed"
        sx={{ zIndex: (theme) => theme.zIndex.drawer + 1 }}
      >
        <Toolbar>
          <Typography sx={{ flexGrow: 1 }} variant="h6" noWrap component="div">
            Grocery Shopping List
          </Typography>
          <IconButton
            size="large"
            edge="start"
            color="inherit"
            aria-label="menu"
            onClick={handleClick}
          >
            <AddIcon />
          </IconButton>
        </Toolbar>
      </AppBar>
    </>
  );
}
