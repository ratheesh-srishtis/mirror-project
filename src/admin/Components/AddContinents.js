
import React, { useState,useEffect } from "react";
import Dialog from '@mui/material/Dialog';
import DialogTitle from '@mui/material/DialogTitle';
import DialogContent from '@mui/material/DialogContent';
import DialogActions from '@mui/material/DialogActions';
import Button from '@mui/material/Button';
import TextField from '@mui/material/TextField';
import "../css/addContinents.css";

function AddContinents({ open, handleClose, handleSave ,  editMode,
  editName,}) {
  const [continentName, setContinentName] = useState("");
  const [error, setError] = useState("");

  useEffect(() => {
    if (editMode) {
      setContinentName(editName || "");
    } else {
      setContinentName("");
    }
  }, [editMode, editName, open]);



  const onSave = () => {
    if (!continentName.trim()) {
      setError("Continent name is required");
      return;
    }
    setError("");
    handleSave(continentName);
    setContinentName("");
  };

  const onClose = () => {
    setError("");
    setContinentName("");
    handleClose();
  };

  return (
    <Dialog open={open} onClose={onClose} maxWidth="xs" fullWidth>
            <DialogTitle className="add-continent-title">{editMode ? "Edit Continent" : "Add Continent"}</DialogTitle>

      <DialogContent>
        <form>
          <TextField
            autoFocus
            margin="dense"
            label="Continent Name"
            type="text"
            fullWidth
            required
            value={continentName}
            onChange={e => setContinentName(e.target.value)}
            error={!!error}
            helperText={error}
            className="continent-input"
          />
        </form>
      </DialogContent>
      <DialogActions>
        <Button onClick={onClose} color="secondary" variant="outlined">Cancel</Button>
        <Button onClick={onSave} color="primary" variant="contained">          {editMode ? "Update" : "Save"}
</Button>

      


      </DialogActions>
    </Dialog>
  );
}

export default AddContinents;
