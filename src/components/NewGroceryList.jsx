import Button from "@mui/material/Button";
import TextField from "@mui/material/TextField";
import { useState, Fragment } from "react";
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import DialogContentText from "@mui/material/DialogContentText";
import DialogTitle from "@mui/material/DialogTitle";

export default function NewListDialog({ onClose }) {
  return (
    <Fragment>
      <Dialog
        open={true}
        onClose={onClose}
        aria-labelledby="alert-dialog-title"
        aria-describedby="alert-dialog-description"
      >
        <DialogTitle id="alert-dialog-title">
          {"Create a New Grocery List"}
        </DialogTitle>
        <DialogContent>
          <DialogContentText id="alert-dialog-description">
            Please enter the name and icon for your new grocery list.
          </DialogContentText>
        </DialogContent>
        <DialogActions>
          <TextField id="standard-basic" label="New List" variant="standard" />
          <TextField
            id="standard-basic"
            label="Icon Search"
            variant="standard"
          />
          <Button onClick={onClose}>Cancel</Button>
          <Button onClick={onClose} autoFocus>
            Create
          </Button>
        </DialogActions>
      </Dialog>
    </Fragment>
  );
}
