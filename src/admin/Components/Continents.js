import React, { useEffect, useState } from "react";
import "../css/continents.css";
import AddContinents from "./AddContinents";
import DeleteIcon from '@mui/icons-material/Delete';
import EditIcon from '@mui/icons-material/Edit';
import Swal from "sweetalert2";
import { addContinent, getContinents, updateContinent, deleteContinent } from "../../config/api";
import { notifySuccess, notifyError } from "../../config/NotificationService";
function Continents() {
  const [dialogOpen, setDialogOpen] = React.useState(false);
  const [editMode, setEditMode] = React.useState(false);
  const [editId, setEditId] = React.useState(null);
  const [continents, setContinents] = useState([]);

  // Fetch continents on mount
  useEffect(() => {
    fetchContinents();
  }, []);

  const fetchContinents = async () => {
    try {
      const response = await getContinents();
      setContinents(response.data);
    } catch (error) {
      notifyError("Failed to fetch continents");
    }
  };

  const [editName, setEditName] = useState("");


  // Table updates immediately after add/edit/delete
  const handleSaveContinent = async (continentName) => {
    try {
      if (editMode && editId) {
        await updateContinent(editId, continentName);
        notifySuccess("Continent updated successfully!");
      } else {
        await addContinent(continentName);
        notifySuccess("Continent added successfully!");
      }
      setDialogOpen(false);
      setEditMode(false);
      setEditId(null);
      fetchContinents();
    } catch (error) {
      const message = error.response?.data?.message || error.message || "Failed to save continent";
      notifyError(message);
    }
  };

  const handleOpenDialog = () => {
    setEditMode(false);
    setEditId(null);
    setDialogOpen(true);
  };

const handleEdit = (continent) => {
  setEditMode(true);
  setEditId(continent._id);
  setEditName(continent.name); // Pass the name to the dialog
  setDialogOpen(true);
};

  const handleDelete = async (continent) => {
    const result = await Swal.fire({
      icon: "warning",
      title: "Delete Continent",
      text: "Deleting this continent will also remove all associated videos. Are you sure you want to proceed?",
      showCancelButton: true,
      confirmButtonText: "Yes, delete it",
      cancelButtonText: "Cancel",
      confirmButtonColor: "#e53e3e",
      cancelButtonColor: "#3578e5",
    });
    if (result.isConfirmed) {
      try {
        await deleteContinent(continent._id);
        notifySuccess("Continent deleted successfully!");
        fetchContinents();
      } catch (error) {
        const message = error.response?.data?.message || error.message || "Failed to delete continent";
        notifyError(message);
      }
    }
  };

  return (
    <>
      <div className="continents-header">
        <button className="add-continents-btn" onClick={handleOpenDialog}>
          Add Continents
        </button>
      </div>
     <AddContinents
  open={dialogOpen}
  handleClose={() => {
    setDialogOpen(false);
    setEditMode(false);
    setEditId(null);
    setEditName("");
  }}
  handleSave={handleSaveContinent}
  editMode={editMode}
  editId={editId}
  editName={editName} // Pass the name as a prop
  continents={continents}
/>
      <div className="continents-table-container">
        <table className="continents-table">
          <thead>
            <tr>
              <th>#</th>
              <th>Continent Name</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
            {continents.map((c, idx) => (
              <tr key={c._id}>
                <td>{idx + 1}</td>
                <td>{c.name}</td>
                <td>
                  <button className="edit-btn" title="Edit" style={{ marginRight: '8px' }} onClick={() => handleEdit(c)}>
                    <EditIcon fontSize="medium" />
                  </button>
                  <button className="delete-btn" title="Delete" onClick={() => handleDelete(c)}>
                    <DeleteIcon fontSize="medium" />
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </>
  );
}

export default Continents;
