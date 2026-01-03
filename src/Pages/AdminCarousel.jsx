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
  TextField,
  Switch,
  FormControlLabel,
  Stack,
  CircularProgress,
} from "@mui/material";
import { Edit, Delete, Add } from "@mui/icons-material";
import {
  getCarouselAdmin,
  createCarouselSlide,
  updateCarouselSlide,
  deleteCarouselSlide,
  uploadCarouselImage,
} from "../Services/AdminApi";
import { Wrench } from "lucide-react";

const emptyForm = {
  title: "",
  subtitle: "",
  imageUrl: "",
  buttonText: "",
  buttonLink: "",
  sortOrder: 0,
  isActive: true,
};

const AdminCarousel = () => {
  const [slides, setSlides] = useState([]);
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [form, setForm] = useState(emptyForm);
  const [open, setOpen] = useState(false);
  const [editingSlide, setEditingSlide] = useState(null);

  const [selectedFile, setSelectedFile] = useState(null);
  const [preview, setPreview] = useState("");

  // ---------------- LOAD SLIDES ----------------
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

  // ---------------- OPEN DIALOGS ----------------
  const handleOpenAdd = () => {
    setEditingSlide(null);
    setForm(emptyForm);
    setSelectedFile(null);
    setPreview("");
    setOpen(true);
  };

  const handleOpenEdit = (slide) => {
    setEditingSlide(slide);
    setForm({
      title: slide.title || "",
      subtitle: slide.subtitle || "",
      imageUrl: slide.imageUrl || "",
      buttonText: slide.buttonText || "",
      buttonLink: slide.buttonLink || "",
      sortOrder: slide.sortOrder ?? 0,
      isActive: slide.isActive ?? true,
    });
    setSelectedFile(null);
    setPreview(slide.imageUrl || "");
    setOpen(true);
  };

  const handleClose = () => {
    if (saving) return;
    setOpen(false);
  };

  // ---------------- FORM HANDLERS ----------------
  const handleChange = (e) => {
    const { name, value } = e.target;
    setForm((prev) => ({
      ...prev,
      [name]: name === "sortOrder" ? Number(value) : value,
    }));
  };

  const handleToggleActive = (e) => {
    setForm((prev) => ({
      ...prev,
      isActive: e.target.checked,
    }));
  };

  const handleFileChange = (e) => {
    const file = e.target.files?.[0];
    if (!file) return;
    setSelectedFile(file);
    setPreview(URL.createObjectURL(file));
  };

  // ---------------- SUBMIT ----------------
 const handleSubmit = async (e) => {
  e.preventDefault();

  // ✅ Title required
  if (!form.title.trim()) {
    alert("Title is required");
    return;
  }

  // ✅ Add mode: image must be selected ya existing url
  if (!editingSlide && !selectedFile && !form.imageUrl) {
    alert("Please choose an image");
    return;
  }

  try {
    setSaving(true);

    let finalImageUrl = form.imageUrl;

    // 🔹 1) Agar new file select hui hai → backend par upload karo
    if (selectedFile) {
      const fd = new FormData();
      fd.append("image", selectedFile); // field name "image" backend ke multer se match kare

      const res = await uploadCarouselImage(fd);
      // API ka response jaisa hai uske hisaab se use karo:
      // Example: { imageUrl: "http://localhost:5000/uploads/carousel/xyz.jpg" }
      finalImageUrl = res.data?.imageUrl || res.imageUrl || finalImageUrl;
    }

    // 🔹 2) Payload banao
    const payload = {
      ...form,
      sortOrder: Number(form.sortOrder) || 0,
      imageUrl: finalImageUrl,
    };

    // 🔹 3) Create ya Update API call
    if (editingSlide) {
      await updateCarouselSlide(editingSlide._id, payload);
    } else {
      await createCarouselSlide(payload);
    }

    // 🔹 4) Dialog close + list refresh
    setOpen(false);
    await loadSlides();
  } catch (err) {
    console.error("Save carousel error:", err?.response?.data || err);
    alert("Error while saving slide");
  } finally {
    setSaving(false);
  }
};

  // ---------------- DELETE ----------------
  const handleDelete = async (slide) => {
    const ok = window.confirm(`Delete slide: "${slide.title}" ?`);
    if (!ok) return;

    try {
      await deleteCarouselSlide(slide._id);
      await loadSlides();
    } catch (err) {
      console.error("Delete carousel error:", err);
      alert("Error while deleting slide");
    }
  };

  // ---------------- UI ----------------
  return (
    <>
      <Typography variant="h5" gutterBottom marginLeft={2} marginTop={1}>
        Home Carousel
      </Typography>

      <Stack direction="row" justifyContent="space-between" mb={2}>
        <Typography variant="body2" marginLeft={2} color="text.secondary">
          Manage Home Page Banners (Dynamic Carousel).
        </Typography>
        <Button variant="contained" onClick={handleOpenAdd}>
                            <Add /> Add Slide
        </Button>
      </Stack>

      {loading ? (
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
      ) : (
        <Paper>
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
                <TableCell>Preview</TableCell>
                <TableCell>Title</TableCell>
                <TableCell>Subtitle</TableCell>
                <TableCell>Button</TableCell>
                <TableCell>Order</TableCell>
                <TableCell>Active</TableCell>
                <TableCell align="right">Actions</TableCell>
              </TableRow>
            </TableHead>
            <TableBody className="bg-white">
              {slides.map((slide, index) => (
                <TableRow key={slide._id}>
                  <TableCell align="center">{index + 1}</TableCell>
                  <TableCell>
                    {slide.imageUrl ? (
                      <img
                        src={slide.imageUrl}
                        alt={slide.title}
                        style={{
                          width: 80,
                          height: 45,
                          objectFit: "cover",
                          borderRadius: 6,
                        }}
                      />
                    ) : (
                      "-"
                    )}
                  </TableCell>
                  <TableCell>{slide.title}</TableCell>
                  <TableCell>
                    <Typography
                      variant="body2"
                      color="text.secondary"
                      noWrap
                      sx={{ maxWidth: 200 }}
                    >
                      {slide.subtitle}
                    </Typography>
                  </TableCell>
                  <TableCell>
                    {slide.buttonText ? (
                      <>
                        {slide.buttonText}
                        <Typography
                          variant="caption"
                          display="block"
                          color="text.secondary"
                        >
                          {slide.buttonLink}
                        </Typography>
                      </>
                    ) : (
                      "-"
                    )}
                  </TableCell>
                  <TableCell>{slide.sortOrder}</TableCell>
                  <TableCell>{slide.isActive ? "Yes" : "No"}</TableCell>
                  <TableCell align="right">
                    <IconButton
                      onClick={() => handleOpenEdit(slide)}
                      size="small"
                    >
                      <Edit fontSize="small" />
                    </IconButton>
                    <IconButton
                      onClick={() => handleDelete(slide)}
                      size="small"
                      color="error"
                    >
                      <Delete fontSize="small" />
                    </IconButton>
                  </TableCell>
                </TableRow>
              ))}

              {slides.length === 0 && (
                <TableRow>
                  <TableCell colSpan={7} align="center">
                    No slides found. Click &quot;Add Slide&quot; to create one.
                  </TableCell>
                </TableRow>
              )}
            </TableBody>
          </Table>
        </Paper>
      )}

      {/* Add/Edit Dialog */}
      <Dialog open={open} onClose={handleClose} fullWidth maxWidth="sm">
        <DialogTitle>
          {editingSlide ? "Edit Slide" : "Add New Slide"}
        </DialogTitle>
        <DialogContent dividers>
          <Stack spacing={2} mt={1}>
            <TextField
              label="Title *"
              name="title"
              value={form.title}
              onChange={handleChange}
              fullWidth
              size="small"
            />
            <TextField
              label="Subtitle"
              name="subtitle"
              value={form.subtitle}
              onChange={handleChange}
              fullWidth
              size="small"
            />

            {/* Image upload */}
            <div>
              <Typography variant="subtitle2" gutterBottom>
                Banner Image *
              </Typography>
              <Button variant="outlined" component="label" size="small">
                Choose Image
                <input
                  hidden
                  type="file"
                  accept="image/*"
                  onChange={handleFileChange}
                />
              </Button>

              {(preview || form.imageUrl) && (
                <div style={{ marginTop: 8 }}>
                  <img
                    src={preview || form.imageUrl}
                    alt="Preview"
                    style={{
                      width: "100%",
                      maxHeight: 200,
                      objectFit: "cover",
                      borderRadius: 8,
                      border: "1px solid #eee",
                    }}
                  />
                </div>
              )}
            </div>

            <TextField
              label="Button Text"
              name="buttonText"
              value={form.buttonText}
              onChange={handleChange}
              fullWidth
              size="small"
              placeholder="e.g. Book Now"
            />
            <TextField
              label="Button Link"
              name="buttonLink"
              value={form.buttonLink}
              onChange={handleChange}
              fullWidth
              size="small"
              placeholder="/booking"
            />
            <TextField
              label="Sort Order"
              name="sortOrder"
              type="number"
              value={form.sortOrder}
              onChange={handleChange}
              size="small"
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
          </Stack>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleClose} disabled={saving}>
            Cancel
          </Button>
          <Button onClick={handleSubmit} variant="contained" disabled={saving}>
            {saving ? "Saving..." : "Save"}
          </Button>
        </DialogActions>
      </Dialog>
    </>
  );
};

export default AdminCarousel;
