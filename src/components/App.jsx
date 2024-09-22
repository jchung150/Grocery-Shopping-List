import "../App.css";
import { Box, CssBaseline } from "@mui/material";
import CurrentGroceryList from "./CurrentGroceryList.jsx";
import AppHeader from "./AppHeader.jsx";
import { AppState } from "../providers/AppState.jsx";
import AllGroceryLists from "./AllGroceryLists.jsx";

function App() {
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
