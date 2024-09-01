import { useAppState } from "../providers/AppState.jsx";
import { useGroceryLists } from "../hooks/useGroceryLists.jsx";
import { useEffect } from "react";

import * as Icons from "@mui/icons-material";
import Drawer from "@mui/material/Drawer";
import Toolbar from "@mui/material/Toolbar";
import List from "@mui/material/List";
import ListItem from "@mui/material/ListItem";
import ListItemButton from "@mui/material/ListItemButton";
import ListItemIcon from "@mui/material/ListItemIcon";
import ListItemText from "@mui/material/ListItemText";

const drawerWidth = 240;

export default function AllGroceryLists() {
  const { data } = useGroceryLists();
  const { currentList, setCurrentList } = useAppState();

  useEffect(() => {
    if (!currentList) {
      setCurrentList(data[0]?.id);
    }
  }, [currentList, data, setCurrentList]);

  return (
    <Drawer
      sx={{
        width: drawerWidth,
        flexShrink: 0,
        "& .MuiDrawer-paper": {
          width: drawerWidth,
          minWidth: 200,
          boxSizing: "border-box",
        },
      }}
      variant="permanent"
      anchor="left"
    >
      <Toolbar />
      <List>
        {data.map(({ id, name, icon }) => {
          const Icon = Icons[icon] || Icons.List;
          return (
            <ListItem key={id} disablePadding>
              <ListItemButton
                onClick={() => {
                  setCurrentList(id);
                }}
                selected={currentList === id}
              >
                <ListItemIcon>
                  <Icon />
                </ListItemIcon>
                <ListItemText primary={name} />
              </ListItemButton>
            </ListItem>
          );
        })}
        ;
      </List>
    </Drawer>
  );
}
