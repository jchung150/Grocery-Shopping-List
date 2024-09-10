import "../App.css";
import { Box, CssBaseline } from "@mui/material";
import CurrentGroceryList from "./CurrentGroceryList.jsx";
import AppHeader from "./AppHeader.jsx";
import { AppState } from "../providers/AppState.jsx";
import AllGroceryLists from "./AllGroceryLists.jsx";
// import { useEffect } from "react";
// import { initializeDatabase } from "../utils.js";

function App() {
  // useEffect(() => {
  //   initializeDatabase();
  // }, []);
  return (
    <AppState>
      <Box sx={{ display: "flex" }}>
        <CssBaseline />
        <AppHeader />
        <AllGroceryLists />
        <CurrentGroceryList />
      </Box>
    </AppState>
  );
}

export default App;
