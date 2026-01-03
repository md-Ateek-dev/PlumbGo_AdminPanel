import React, { useEffect, useState } from "react";
import {
  Box,
  Typography,
  Paper,
  Table,
  TableHead,
  TableRow,
  TableCell,
  TableBody,
  IconButton,
  Button,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  TextField,
  Switch,
  FormControlLabel,
} from "@mui/material";
import { Edit, Delete, Add } from "@mui/icons-material";
import { adminApi } from "../Services/AdminApi";
import { Wrench } from "lucide-react";

const emptyForm = {
  name: "",
  description: "",
  price: "",
  duration: "",
  isActive: true,
};

const AdminServices = () => {
  const [services, setServices] = useState([]);
  const [open, setOpen] = useState(false);
  const [editingId, setEditingId] = useState(null);
  const [loading, setLoading] = useState(true)
  const [form, setForm] = useState(emptyForm);

  const fetchServices = async () => {
    try{
      setLoading(true);
    
    const res = await adminApi.getServices();
    setServices(res.data || res.data?.services || res.data); // backend me agar sirf array aa raha hai to bhi chalega
    }catch(error){
      console.error("Fetch services error:", error);
    }finally{
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchServices();
  }, []);

  const handleOpenCreate = () => {
    setEditingId(null);
    setForm(emptyForm);
    setOpen(true);
  };

  const handleOpenEdit = (service) => {
    setEditingId(service._id);
    setForm({
    
      name: service.name || "",
      description: service.description || "",
      price: service.price || "",
      duration: service.duration || "",
      isActive: service.isActive ?? true,
    });
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setForm((prev) => ({ ...prev, [name]: value }));
  };

  const handleToggleActive = (e) => {
    setForm((prev) => ({ ...prev, isActive: e.target.checked }));
  };

  const handleSubmit = async () => {
    try {
      const payload = {
        name: form.name,
        description: form.description,
        price: Number(form.price),
        duration: form.duration,
        isActive: form.isActive,
      };

      if (!payload.name || !payload.price) {
        alert("Name and Price are required");
        return;
      }

      if (editingId) {
        await adminApi.updateService(editingId, payload);
      } else {
        await adminApi.createService(payload);
      }

      handleClose();
      fetchServices();
    } catch (error) {
      console.error("Service save error:", error);
      alert("Error saving service");
    }
  };

  const handleDelete = async (id) => {
    if (!window.confirm("Are you sure you want to delete this service?")) return;
    try {
      await adminApi.deleteService(id);
      fetchServices();
    } catch (error) {
      console.error("Delete error:", error);
      alert("Error deleting service");
    }
  };
  {if(loading){
    return( 
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-slate-50 via-blue-50/30 to-slate-50">
            <div className="text-center">
              <div className="relative mx-auto mb-4 h-16 w-16">
                <div className="absolute inset-0 rounded-full border-4 border-blue-200"></div>
                <div className="absolute inset-0 animate-spin rounded-full border-4 border-transparent border-t-blue-600"></div>
                <Wrench className="absolute inset-0 m-auto text-blue-600 animate-pulse" size={24} />
              </div>
              <p className="text-sm font-medium text-slate-600 animate-pulse">
                Loading services...
              </p>
            </div>
          </div>
    )
  }}

  return (
    <Box>
      <Box
        mb={2}
        sx={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}
      >
        <Typography variant="h5" marginLeft={2} marginTop={1}>All Services</Typography>
        <Button 
          variant="contained"
          startIcon={<Add />}
          onClick={handleOpenCreate}
        >
          Add Service
        </Button>
      </Box>

      <Paper sx={{ width: "100%", overflowX: "auto" }}>
        
        <Table size="small"
        sx={{
      "& th": {
        px: 3,
        py: 1.5,
        fontWeight: "bold",
        backgroundColor: "#e5e7eb",
      },
      "& td": {
        px: 2,
        py: 1,
      },
      "& tbody tr:hover": {
        backgroundColor: "#f0fdf4",
      },
    }}
        >
          <TableHead>
            <TableRow className="bg-gray-300">
              <TableCell>S. No</TableCell>
              <TableCell>Name</TableCell>
              <TableCell>Description</TableCell>
              <TableCell>Price (₹)</TableCell>
              <TableCell>Duration</TableCell>
              <TableCell>Active</TableCell>
              <TableCell align="right">Actions</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {services?.length > 0 ? (
              services.map((s, index) => (
                <TableRow  key={s._id}>
                  <TableCell align="center">{index + 1}</TableCell>
                  <TableCell>{s.name}</TableCell>
                  <TableCell>{s.description}</TableCell>
                  <TableCell>{s.price}</TableCell>
                  <TableCell>{s.duration}</TableCell>
                  <TableCell>{s.isActive ? "Yes" : "No"}</TableCell>
                  <TableCell align="right">
                    <IconButton onClick={() => handleOpenEdit(s)}>
                      <Edit />
                    </IconButton>
                    <IconButton color="error" onClick={() => handleDelete(s._id)}>
                      <Delete />
                    </IconButton>
                  </TableCell>
                </TableRow>
              ))
            ) : (
              <TableRow>
                <TableCell colSpan={6} align="center">
                  No services found
                </TableCell>
              </TableRow>
            )}
          </TableBody>
        </Table>
      </Paper>

      {/* Add/Edit Dialog */}
      <Dialog open={open} onClose={handleClose} fullWidth maxWidth="sm">
        <DialogTitle>
          {editingId ? "Edit Service" : "Add Service"}
        </DialogTitle>
        <DialogContent dividers>
          <TextField
            fullWidth
            margin="dense"
            label="Service Name"
            name="name"
            value={form.name}
            onChange={handleChange}
          />
          <TextField
            fullWidth
            margin="dense"
            label="Description"
            name="description"
            value={form.description}
            onChange={handleChange}
            multiline
            rows={3}
          />
          <TextField
            fullWidth
            margin="dense"
            label="Price (₹)"
            name="price"
            type="number"
            value={form.price}
            onChange={handleChange}
          />
          <TextField
            fullWidth
            margin="dense"
            label="Duration (e.g. 30 min, 1 hour)"
            name="duration"
            value={form.duration}
            onChange={handleChange}
          />
          <FormControlLabel
            control={
              <Switch
                checked={form.isActive}
                onChange={handleToggleActive}
              />
            }
            label="Active"
          />
        </DialogContent>
        <DialogActions>
          <Button onClick={handleClose}>Cancel</Button>
          <Button variant="contained" onClick={handleSubmit}>
            Save
          </Button>
        </DialogActions>
      </Dialog>
    </Box>
  );
};

export default AdminServices;
