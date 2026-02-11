// import React, { useEffect, useState } from "react";
// import {
//   Typography,
//   Button,
//   Table,
//   TableHead,
//   TableRow,
//   TableCell,
//   TableBody,
//   Paper,
//   IconButton,
//   Dialog,
//   DialogTitle,
//   DialogContent,
//   DialogActions,
//   Switch,
//   FormControlLabel,
//   Stack,
//   CircularProgress,
//   TextField,
// } from "@mui/material";
// import { Edit, Delete } from "@mui/icons-material";
// import {
//   getAdminGalleryImage,
//   createGalleryImage,
//   updateGalleryImage,
//   deleteGalleryImage,
//   uploadGalleryImage,
// } from "../Services/AdminApi";
// import toast from "react-hot-toast";
// import { Wrench } from "lucide-react";

// const emptyForm = {
//   imageUrl: "",
//   isActive: true,
// };

// const AdminGallery = () => {
//   const [items, setItems] = useState([]);
//   const [loading, setLoading] = useState(true);
//   const [saving, setSaving] = useState(false);
//   const [open, setOpen] = useState(false);
//   const [editing, setEditing] = useState(null);

//   const [form, setForm] = useState(emptyForm);
//   const [selectedFile, setSelectedFile] = useState(null);
//   const [preview, setPreview] = useState("");

//   // 🔹 Load gallery
//   const loadGallery = async () => {
//     try {
//       setLoading(true);
//       const res = await getAdminGalleryImage();
//       setItems(res.data.images || []);
//     } catch (err) {
//       console.error("Load gallery error:", err);
//     } finally {
//       setLoading(false);
//     }
//   };

//   useEffect(() => {
//     loadGallery();
//   }, []);

//   // 🔹 Open Add
//   const handleAdd = () => {
//     setEditing(null);
//     setForm(emptyForm);
//     setSelectedFile(null);
//     setPreview("");
//     setOpen(true);

//   };
//   // 🔹 Open Edit
//   const handleEdit = (item) => {
//     setEditing(item);
//     setForm({
//       imageUrl: item.imageUrl,
//       isActive: item.isActive,
//     });
//     setPreview(item.imageUrl);
//     setSelectedFile(null);
//     setOpen(true);
//   };

//   // 🔹 File select
//   const handleFileChange = (e) => {
//     const file = e.target.files?.[0];
//     if (!file) return;

//     setSelectedFile(file);
//     setPreview(URL.createObjectURL(file));
//   };

//   // 🔹 Save
//   const handleSubmit = async () => {
//     if (!selectedFile && !form.imageUrl) {
//       alert("Image is required");
//       return;
//     }

//     try {
//       setSaving(true);
//       let finalImageUrl = form.imageUrl;

//       if (selectedFile) {
//         const fd = new FormData();
//         fd.append("image", selectedFile);
//         const uploadRes = await uploadGalleryImage(fd);
//         finalImageUrl = uploadRes.data.imageUrl;
//       }
//       console.log("Selected file:", selectedFile);
// console.log("FormData uploaded, imageUrl:", finalImageUrl);
//       const payload = {
//         imageUrl: finalImageUrl,
//         isActive: form.isActive,
//         blogSlug: form.blogSlug || null,
//       };
      
// console.log("Payload:", payload);

//       if (editing) {
//         await updateGalleryImage(editing._id, payload);
//          toast.success("Image updated successfully ✅");
//       } else {
//         await createGalleryImage(payload);
//       toast.success("Image added successfully ✅");
//       }

//       setOpen(false);
//       loadGallery();

//     }
    
//      catch (err) {
//       console.error("Save gallery error:", err.res.FormData);
//       toast.error("Error saving image:",err.res.FormData );
//     } finally {
//       setSaving(false);
//     }
//     console.log("Editing ID:", editing._id);

//   };

//   // 🔹 Delete
//   const handleDelete = async (item) => {
//     const ok = window.confirm("Delete this image?");
//     if (!ok) return;
//     try {
//       await deleteGalleryImage(item._id);
//       toast.success("Image Deleted Successfully");
//       loadGallery();
//     } catch (err) {
//       console.error("Delete gallery error:", err);
//           toast.error("Delete failed ❌");
//     }
//   };

//   return (
//     <>
//       <Typography sx={{m:2}} variant="h5" gutterBottom>
//         Gallery Management
//       </Typography>

//       <Button variant="contained" onClick={handleAdd} sx={{ ml: 2, mb: 2 }}>
//         Add Image
//       </Button>

//       {loading ? (
//         <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-slate-50 via-blue-50/30 to-slate-50">
//         <div className="text-center">
//           <div className="relative mx-auto mb-4 h-16 w-16">
//             <div className="absolute inset-0 rounded-full border-4 border-blue-200"></div>
//             <div className="absolute inset-0 animate-spin rounded-full border-4 border-transparent border-t-blue-600"></div>
//             <Wrench className="absolute inset-0 m-auto text-blue-600 animate-pulse" size={24} />
//           </div>
//           <p className="text-sm font-medium text-slate-600 animate-pulse">
//             Loading services...
//           </p>
//         </div>
//       </div>
//       ) : (
//         <Paper>
//           <Table size="medium"
//           sx={{
//       "& th": {
//         px: 5,
//         py: 1.5,
//         fontWeight: "bold",
//         backgroundColor: "#e5e7eb",
//       },
//       "& td": {
//         px: 5,
//         py: 1.5,
//       },
//       "& tbody tr:hover": {
//         backgroundColor: "#f0fdf4",
//       },
//     }}
//           >
//             <TableHead>
//               <TableRow>
//                 <TableCell align="center">S. No.</TableCell>
//                 <TableCell>Preview</TableCell>
//                 <TableCell>Status</TableCell>
//                 <TableCell align="right">Actions</TableCell>
//               </TableRow>
//             </TableHead>
//             <TableBody>
//               {items.map((item, index) => (
//                 <TableRow key={item._id}>
//                     <TableCell align="center">{index + 1}</TableCell>
//                   <TableCell>
//                     <img
//                      src={`http://localhost:5000${item.imageUrl}`}   
//                       alt="gallery"
//                       style={{
//                         width: 80,
//                         height: 60,
//                         objectFit: "cover",
//                         borderRadius: 6,
//                       }}
//                     />
//                   </TableCell>
//                   <TableCell>{item.isActive ? "Active" : "Inactive"}</TableCell>
//                   <TableCell align="right">
//                     <IconButton onClick={() => handleEdit(item)} size="small">
//                       <Edit fontSize="small" />
//                     </IconButton>
//                     <IconButton
//                       onClick={() => handleDelete(item)}
//                       size="small"
//                       color="error"
//                     >
//                       <Delete fontSize="small" />
//                     </IconButton>
//                   </TableCell>
//                 </TableRow>
//               ))}

//               {items.length === 0 && (
//                 <TableRow>
//                   <TableCell colSpan={3} align="center">
//                     No images found
//                   </TableCell>
//                 </TableRow>
//               )}
//             </TableBody>
//           </Table>
//         </Paper>
//       )}

//       {/* Dialog */}
//       <Dialog open={open} onClose={() => !saving && setOpen(false)} fullWidth>
//         <DialogTitle>{editing ? "Edit Image" : "Add Image"}</DialogTitle>
//         <DialogContent dividers>
//           <TextField
//   label="Blog Slug (optional)"
//   value={form.blogSlug || ""}
//   onChange={(e) =>
//     setForm((p) => ({ ...p, blogSlug: e.target.value }))
//   }
//   placeholder="example: bathroom-pipe-leak-fix"
// />

//           <Stack spacing={2}>
//             <Button variant="outlined" component="label">
//               Choose Image
//               <input hidden type="file" accept="image/*" onChange={handleFileChange} />
//             </Button>

//             {preview && (
//   <img
//     src={
//       preview.startsWith("blob:")
//         ? preview
//         : `http://localhost:5000${preview}`
//     }
//     alt="preview"
//     style={{
//       width: "100%",
//       maxHeight: 220,
//       objectFit: "cover",
//       borderRadius: 8,
//     }}
//   />
// )}


//             <FormControlLabel
//               control={
//                 <Switch
//                   checked={form.isActive}
//                   onChange={(e) =>
//                     setForm((p) => ({ ...p, isActive: e.target.checked }))
//                   }
//                 />
//               }
//               label="Active"
//             />
//           </Stack>
//         </DialogContent>
//         <DialogActions>
//           <Button onClick={() => setOpen(false)}>Cancel</Button>
//           <Button variant="contained" onClick={handleSubmit} disabled={saving}>
//             {saving ? "Saving..." : "Save"}
//           </Button>
//         </DialogActions>
//       </Dialog>
//     </>
//   );
// };

// export default AdminGallery;


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
import { Edit, Delete } from "@mui/icons-material";
import {
  getAdminGalleryImage,
  createGalleryImage,
  updateGalleryImage,
  deleteGalleryImage,
} from "../Services/AdminApi";
import { UploadToCloudinary } from "../utils/UploadToCloudinary";
import toast from "react-hot-toast";
import { Wrench } from "lucide-react";

const emptyForm = {
  imageUrl: "",
  isActive: true,
  blogSlug: "",
};

const AdminGallery = () => {
  const [items, setItems] = useState([]);
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [open, setOpen] = useState(false);
  const [editing, setEditing] = useState(null);

  const [form, setForm] = useState(emptyForm);
  const [selectedFile, setSelectedFile] = useState(null);
  const [preview, setPreview] = useState("");

  // 🔹 Load gallery
  const loadGallery = async () => {
    try {
      setLoading(true);
      const res = await getAdminGalleryImage();
      setItems(res.data.images || []);
    } catch (err) {
      console.error("Load gallery error:", err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    loadGallery();
  }, []);

  // 🔹 Add
  const handleAdd = () => {
    setEditing(null);
    setForm(emptyForm);
    setSelectedFile(null);
    setPreview("");
    setOpen(true);
  };

  // 🔹 Edit
  const handleEdit = (item) => {
    setEditing(item);
    setForm({
      imageUrl: item.imageUrl,
      isActive: item.isActive,
      blogSlug: item.blogSlug || "",
    });
    setPreview(item.imageUrl);
    setSelectedFile(null);
    setOpen(true);
  };

  // 🔹 File select
  const handleFileChange = (e) => {
    const file = e.target.files?.[0];
    if (!file) return;
    setSelectedFile(file);
    setPreview(URL.createObjectURL(file));
  };

  // 🔹 Save
  const handleSubmit = async () => {
    if (!selectedFile && !form.imageUrl) {
      alert("Image is required");
      return;
    }

    try {
      setSaving(true);

      let imageUrl = form.imageUrl;
      let publicId = editing?.publicId || null;

      // 🔥 Upload to Cloudinary
      if (selectedFile) {
        const cloudRes = await UploadToCloudinary(selectedFile, "gallery");
        imageUrl = cloudRes.secure_url;
        publicId = cloudRes.public_id;
      }

      const payload = {
        imageUrl,
        publicId,
        isActive: form.isActive,
        blogSlug: form.blogSlug || null,
      };

      if (editing && selectedFile) {
        payload.oldPublicId = editing.publicId;
      }

      if (editing) {
        await updateGalleryImage(editing._id, payload);
        toast.success("Image updated successfully ✅");
      } else {
        await createGalleryImage(payload);
        toast.success("Image added successfully ✅");
      }

      setOpen(false);
      loadGallery();
    } catch (err) {
      console.error("Save gallery error:", err);
      toast.error("Error saving image ❌");
    } finally {
      setSaving(false);
    }
  };

  // 🔹 Delete
  const handleDelete = async (item) => {
    const ok = window.confirm("Delete this image?");
    if (!ok) return;
    try {
      await deleteGalleryImage(item._id);
      toast.success("Image deleted successfully");
      loadGallery();
    } catch (err) {
      console.error("Delete gallery error:", err);
      toast.error("Delete failed ❌");
    }
  };

  return (
    <>
      <Typography sx={{ m: 2 }} variant="h5">
        Gallery Management
      </Typography>

      <Button variant="contained" onClick={handleAdd} sx={{ ml: 2, mb: 2 }}>
        Add Image
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
                            Loading Gallery...
                          </p>
                        </div>
                      </div>   
      ) : (
        <Paper>
          <Table>
            <TableHead>
              <TableRow>
                <TableCell align="center">S. No.</TableCell>
                <TableCell>Preview</TableCell>
                <TableCell>Status</TableCell>
                <TableCell align="right">Actions</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {items.map((item, index) => (
                <TableRow key={item._id}>
                  <TableCell align="center">{index + 1}</TableCell>
                  <TableCell>
                    <img
                      src={item.imageUrl}
                      alt="gallery"
                      style={{
                        width: 80,
                        height: 60,
                        objectFit: "cover",
                        borderRadius: 6,
                      }}
                    />
                  </TableCell>
                  <TableCell>
                    {item.isActive ? "Active" : "Inactive"}
                  </TableCell>
                  <TableCell align="right">
                    <IconButton onClick={() => handleEdit(item)}>
                      <Edit fontSize="small" />
                    </IconButton>
                    <IconButton
                      onClick={() => handleDelete(item)}
                      color="error"
                    >
                      <Delete fontSize="small" />
                    </IconButton>
                  </TableCell>
                </TableRow>
              ))}

              {items.length === 0 && (
                <TableRow>
                  <TableCell colSpan={4} align="center">
                    No images found
                  </TableCell>
                </TableRow>
              )}
            </TableBody>
          </Table>
        </Paper>
      )}

      {/* Dialog */}
      <Dialog open={open} onClose={() => !saving && setOpen(false)} fullWidth>
        <DialogTitle>{editing ? "Edit Image" : "Add Image"}</DialogTitle>
        <DialogContent dividers>
          <TextField
            fullWidth
            label="Blog Slug (optional)"
            value={form.blogSlug}
            onChange={(e) =>
              setForm((p) => ({ ...p, blogSlug: e.target.value }))
            }
            sx={{ mb: 2 }}
          />

          <Stack spacing={2}>
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

export default AdminGallery;
