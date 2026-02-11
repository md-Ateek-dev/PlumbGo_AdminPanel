import React, { useEffect, useState } from "react";
import {
  Typography,
  Button,
  Table,
  TableHead,
  TableRow,
  TableCell,
  TableBody,
  Paper,
  IconButton,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  Switch,
  FormControlLabel,
  Stack,
  TextField,
} from "@mui/material";

import { Edit, Delete, Add } from "@mui/icons-material";

import {
  getCarouselAdmin,
  createCarouselSlide,
  updateCarouselSlide,
  deleteCarouselSlide,
} from "../Services/AdminApi";

import { UploadToCloudinary } from "../utils/UploadToCloudinary";

import toast from "react-hot-toast";
import { Wrench } from "lucide-react";


const emptyForm = {
  title: "",
  subtitle: "",
  imageUrl: "",
  publicId: "",
  buttonText: "",
  buttonLink: "",
  sortOrder: 0,
  isActive: true,
};

const AdminCarousel = () => {

  const [slides, setSlides] = useState([]);
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [open, setOpen] = useState(false);
  const [editing, setEditing] = useState(null);

  const [form, setForm] = useState(emptyForm);
  const [selectedFile, setSelectedFile] = useState(null);
  const [preview, setPreview] = useState("");



  // 🔥 LOAD
  const loadSlides = async () => {
    try {
      setLoading(true);
      const res = await getCarouselAdmin();
      setSlides(res.data.slides || []);
    } catch (err) {
      console.error("Load carousel error:", err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    loadSlides();
  }, []);




  // 🔥 ADD
  const handleAdd = () => {
    setEditing(null);
    setForm(emptyForm);
    setSelectedFile(null);
    setPreview("");
    setOpen(true);
  };



  // 🔥 EDIT
  const handleEdit = (slide) => {

    setEditing(slide);

    setForm({
      title: slide.title,
      subtitle: slide.subtitle,
      imageUrl: slide.imageUrl,
      publicId: slide.publicId,
      buttonText: slide.buttonText,
      buttonLink: slide.buttonLink,
      sortOrder: slide.sortOrder,
      isActive: slide.isActive,
    });

    setPreview(slide.imageUrl);
    setSelectedFile(null);
    setOpen(true);
  };



  // 🔥 FILE SELECT
  const handleFileChange = (e) => {
    const file = e.target.files?.[0];
    if (!file) return;

    setSelectedFile(file);
    setPreview(URL.createObjectURL(file));
  };



  // 🔥 SAVE (Cloudinary Logic)
  const handleSubmit = async () => {

    if (!form.title) {
      toast.error("Title is required");
      return;
    }

    if (!selectedFile && !form.imageUrl) {
      toast.error("Image is required");
      return;
    }

    try {

      setSaving(true);

      let imageUrl = form.imageUrl;
      let publicId = editing?.publicId || null;

      // ⭐ Upload to Cloudinary
      if (selectedFile) {

        const cloudRes = await UploadToCloudinary(
          selectedFile,
          "carousel" // folder name
        );

        imageUrl = cloudRes.secure_url;
        publicId = cloudRes.public_id;
      }

      const payload = {
        ...form,
        imageUrl,
        publicId,
      };

      // ⭐ replace old image
      if (editing && selectedFile) {
        payload.oldPublicId = editing.publicId;
      }

      if (editing) {

        await updateCarouselSlide(editing._id, payload);
        toast.success("Slide updated successfully ✅");

      } else {

        await createCarouselSlide(payload);
        toast.success("Slide created successfully ✅");
      }

      setOpen(false);
      loadSlides();

    } catch (err) {

      console.error("Save carousel error:", err);
      toast.error("Error saving slide ❌");

    } finally {
      setSaving(false);
    }
  };




  // 🔥 DELETE
  const handleDelete = async (slide) => {

    const ok = window.confirm("Delete this slide?");
    if (!ok) return;

    try {

      await deleteCarouselSlide(slide._id);

      toast.success("Slide deleted successfully");
      loadSlides();

    } catch (err) {

      console.error("Delete carousel error:", err);
      toast.error("Delete failed ❌");
    }
  };



  // ================= UI =================

  return (
    <>
      <Typography sx={{ m: 2 }} variant="h5">
        Carousel Management
      </Typography>

      <Button
        variant="contained"
        startIcon={<Add />}
        onClick={handleAdd}
        sx={{ ml: 2, mb: 2 }}
      >
        Add Slide
      </Button>

      {loading ? (
        <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-slate-50 via-blue-50/30 to-slate-50">
                <div className="text-center">
                  <div className="relative mx-auto mb-4 h-16 w-16">
                    <div className="absolute inset-0 rounded-full border-4 border-blue-200"></div>
                    <div className="absolute inset-0 animate-spin rounded-full border-4 border-transparent border-t-blue-600"></div>
                    <Wrench className="absolute inset-0 m-auto text-blue-600 animate-pulse" size={24} />
                  </div>
                  <p className="text-sm font-medium text-slate-600 animate-pulse">
                    Loading Carousel...
                  </p>
                </div>
              </div>   
      ) : (
        <Paper>
          <Table>

            <TableHead>
              <TableRow>
                <TableCell align="center">S.No</TableCell>
                <TableCell>Preview</TableCell>
                <TableCell>Title</TableCell>
                <TableCell>Order</TableCell>
                <TableCell>Status</TableCell>
                <TableCell align="right">Actions</TableCell>
              </TableRow>
            </TableHead>

            <TableBody>

              {slides.map((slide, index) => (

                <TableRow key={slide._id}>
                  <TableCell align="center">{index + 1}</TableCell>

                  <TableCell>
                    <img
                      src={slide.imageUrl}
                      alt="carousel"
                      style={{
                        width: 90,
                        height: 55,
                        objectFit: "cover",
                        borderRadius: 6,
                      }}
                    />
                  </TableCell>

                  <TableCell>{slide.title}</TableCell>
                  <TableCell>{slide.sortOrder}</TableCell>
                  <TableCell>
                    {slide.isActive ? "Active" : "Inactive"}
                  </TableCell>

                  <TableCell align="right">

                    <IconButton onClick={() => handleEdit(slide)}>
                      <Edit />
                    </IconButton>

                    <IconButton
                      color="error"
                      onClick={() => handleDelete(slide)}
                    >
                      <Delete />
                    </IconButton>

                  </TableCell>
                </TableRow>
              ))}

              {slides.length === 0 && (
                <TableRow>
                  <TableCell colSpan={6} align="center">
                    No slides found
                  </TableCell>
                </TableRow>
              )}

            </TableBody>
          </Table>
        </Paper>
      )}



      {/* 🔥 Dialog */}

      <Dialog open={open} onClose={() => !saving && setOpen(false)} fullWidth>

        <DialogTitle>
          {editing ? "Edit Slide" : "Add Slide"}
        </DialogTitle>

        <DialogContent dividers>

          <Stack spacing={2}>

            <TextField
              label="Title"
              value={form.title}
              onChange={(e) =>
                setForm((p) => ({ ...p, title: e.target.value }))
              }
            />

            <TextField
              label="Subtitle"
              value={form.subtitle}
              onChange={(e) =>
                setForm((p) => ({ ...p, subtitle: e.target.value }))
              }
            />

            <Button variant="outlined" component="label">
              Choose Image
              <input hidden type="file" accept="image/*" onChange={handleFileChange} />
            </Button>

            {preview && (
              <img
                src={preview}
                alt="preview"
                style={{
                  width: "100%",
                  maxHeight: 220,
                  objectFit: "cover",
                  borderRadius: 8,
                }}
              />
            )}

            <TextField
              label="Button Text"
              value={form.buttonText}
              onChange={(e) =>
                setForm((p) => ({ ...p, buttonText: e.target.value }))
              }
            />

            <TextField
              label="Button Link"
              value={form.buttonLink}
              onChange={(e) =>
                setForm((p) => ({ ...p, buttonLink: e.target.value }))
              }
            />

            <TextField
              label="Sort Order"
              type="number"
              value={form.sortOrder}
              onChange={(e) =>
                setForm((p) => ({
                  ...p,
                  sortOrder: Number(e.target.value),
                }))
              }
            />

            <FormControlLabel
              control={
                <Switch
                  checked={form.isActive}
                  onChange={(e) =>
                    setForm((p) => ({ ...p, isActive: e.target.checked }))
                  }
                />
              }
              label="Active"
            />

          </Stack>

        </DialogContent>

        <DialogActions>
          <Button onClick={() => setOpen(false)}>Cancel</Button>
          <Button variant="contained" onClick={handleSubmit} disabled={saving}>
            {saving ? "Saving..." : "Save"}
          </Button>
        </DialogActions>

      </Dialog>
    </>
  );
};

export default AdminCarousel;
