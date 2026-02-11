import React, { useEffect, useState } from "react";
import {
  Typography, Paper, Table, TableHead, TableRow,
  TableCell, TableBody, Button, IconButton,
  Dialog, DialogTitle, DialogContent, DialogActions,
  TextField, Switch, FormControlLabel, Stack
} from "@mui/material";
import { Edit, Delete } from "@mui/icons-material";
import {
  getAdminBlogs,
  createBlog,
  updateBlog,
  deleteBlog,
} from "../Services/AdminApi";

import { UploadToCloudinary } from "../utils/UploadToCloudinary";
import { Wrench } from "lucide-react";

const emptyForm = {
  title: "",
  excerpt: "",
  content: "",
  coverImage: "",
  publicId: "",
  isPublished: false,
};

const AdminBlogs = () => {

  const [blogs, setBlogs] = useState([]);
  const [form, setForm] = useState(emptyForm);
  const [open, setOpen] = useState(false);
  const [editing, setEditing] = useState(null);
  const [file, setFile] = useState(null);
  const [preview, setPreview] = useState("");
  const [loading, setLoading] = useState(true);

  const loadBlogs = async () => {
    try {
      setLoading(true);
      const res = await getAdminBlogs();
      setBlogs(res.data.blogs || []);
    } catch (error) {
      console.error(error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    loadBlogs();
  }, []);

  // ✅ SUBMIT
  const handleSubmit = async () => {

    if (!form.title || !form.content) {
      alert("Title & content required");
      return;
    }

    try {

      let imageUrl = form.coverImage;
      let publicId = form.publicId || null;

      if (file) {

        const cloudRes = await UploadToCloudinary(file, "blogs");

        imageUrl = cloudRes.secure_url;
        publicId = cloudRes.public_id;
      }

      const payload = {
        ...form,
        coverImage: imageUrl,
        publicId,
      };

      if (editing && file && editing.publicId) {
        payload.oldPublicId = editing.publicId;
      }

      if (editing) {
        await updateBlog(editing._id, payload);
      } else {
        await createBlog(payload);
      }

      setOpen(false);
      setFile(null);
      setPreview("");
      setForm(emptyForm);
      setEditing(null);
     await loadBlogs();

    } catch (err) {
      console.error(err);
      alert("Error saving blog");
    }
  };

  if (loading) {
    return (
     <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-slate-50 via-blue-50/30 to-slate-50">
                     <div className="text-center">
                       <div className="relative mx-auto mb-4 h-16 w-16">
                         <div className="absolute inset-0 rounded-full border-4 border-blue-200"></div>
                         <div className="absolute inset-0 animate-spin rounded-full border-4 border-transparent border-t-blue-600"></div>
                         <Wrench className="absolute inset-0 m-auto text-blue-600 animate-pulse" size={24} />
                       </div>
                       <p className="text-sm font-medium text-slate-600 animate-pulse">
                         Loading Blogs...
                       </p>
                     </div>
                   </div>   
    );
  }

  return (
    <>
      <Typography variant="h5" margin={2}>
        All Blogs
      </Typography>

      <Button
        onClick={() => {
          setEditing(null);
          setForm(emptyForm);
          setPreview("");
          setFile(null);
          setOpen(true);
        }}
        variant="contained"
        sx={{ mb: 2, ml: 2 }}
      >
        Add Blog
      </Button>

      <Paper>
        <Table size="small">
          <TableHead>
            <TableRow>
              <TableCell align="center">S. No.</TableCell>
              <TableCell>Image</TableCell>
              <TableCell>Title</TableCell>
              <TableCell>Status</TableCell>
              <TableCell align="right">Actions</TableCell>
            </TableRow>
          </TableHead>

          <TableBody>
            {blogs.map((b, index) => (
              <TableRow key={b._id}>
                <TableCell align="center">{index + 1}</TableCell>

                <TableCell>
                  {b.coverImage && (
                    <img
                      src={b.coverImage}
                      alt={b.title}
                      style={{
                        width: 60,
                        height: 40,
                        objectFit: "cover",
                        borderRadius: 4,
                      }}
                    />
                  )}
                </TableCell>

                <TableCell>{b.title}</TableCell>

                <TableCell>
                  {b.isPublished ? "Published" : "Draft"}
                </TableCell>

                <TableCell align="right">
                  <IconButton onClick={() => {

                    setEditing(b);

                    setForm({
                      title: b.title,
                      excerpt: b.excerpt,
                      content: b.content,
                      coverImage: b.coverImage,
                      publicId: b.publicId,
                      isPublished: b.isPublished,
                    });

                    setPreview(b.coverImage);
                    setOpen(true);

                  }}>
                    <Edit />
                  </IconButton>

                  <IconButton
                    color="error"
                    onClick={() => deleteBlog(b._id).then(loadBlogs)}
                  >
                    <Delete />
                  </IconButton>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </Paper>

      {/* DIALOG */}
      <Dialog open={open} onClose={() => setOpen(false)} fullWidth maxWidth="sm">
        <DialogTitle>{editing ? "Edit Blog" : "Add Blog"}</DialogTitle>

        <DialogContent>
          <Stack spacing={2} marginTop={2}>

            <TextField
              label="Title"
              value={form.title}
              onChange={(e) =>
                setForm({ ...form, title: e.target.value })
              }
            />

            <TextField
              label="Excerpt"
              value={form.excerpt}
              onChange={(e) =>
                setForm({ ...form, excerpt: e.target.value })
              }
            />

            <TextField
              label="Content"
              multiline
              rows={5}
              value={form.content}
              onChange={(e) =>
                setForm({ ...form, content: e.target.value })
              }
            />

            <Button component="label" variant="outlined">
              Upload Image
              <input
                hidden
                type="file"
                accept="image/*"
                onChange={(e) => {
                  setFile(e.target.files[0]);
                  setPreview(URL.createObjectURL(e.target.files[0]));
                }}
              />
            </Button>

            {preview && (
              <img
                src={preview}
                alt="preview"
                style={{
                  width: "100%",
                  maxHeight: 200,
                  objectFit: "cover",
                  borderRadius: 6,
                }}
              />
            )}

            <FormControlLabel
              control={
                <Switch
                  checked={form.isPublished}
                  onChange={(e) =>
                    setForm({ ...form, isPublished: e.target.checked })
                  }
                />
              }
              label="Publish"
            />

          </Stack>
        </DialogContent>

        <DialogActions>
          <Button onClick={() => setOpen(false)}>
            Cancel
          </Button>

          <Button variant="contained" onClick={handleSubmit}>
            Save
          </Button>
        </DialogActions>
      </Dialog>
    </>
  );
};

export default AdminBlogs;
