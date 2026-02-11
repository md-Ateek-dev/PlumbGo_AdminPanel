import React, { useEffect, useState } from "react";
import {
  Typography,
  Paper,
  Table,
  TableHead,
  TableBody,
  TableRow,
  TableCell,
  IconButton,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  Button,
} from "@mui/material";
import { Visibility } from "@mui/icons-material";
import { getContactMessages } from "../Services/AdminApi";
import { Wrench } from "lucide-react";

const AdminContacts = () => {
  const [rows, setRows] = useState([]);
  const [open, setOpen] = useState(false);
  const [selected, setSelected] = useState(null);
  const [loading, setLoading] = useState(true)
  

  const loadMessages = async () => {
    try {
      setLoading(true);
      const res = await getContactMessages();
            console.log("data", res.data);
      setRows(res.data.messages || []);
    } catch (err) {
      console.error("Load contact messages error:", err.response || err.message?.data ||err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    loadMessages();
  }, []);

  const handleOpen = (row) => {
    setSelected(row);
    setOpen(true);
  };

  const handleClose = () => setOpen(false);
  { if(loading){
    return (
        <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-slate-50 via-blue-50/30 to-slate-50">
            <div className="text-center">
              <div className="relative mx-auto mb-4 h-16 w-16">
                <div className="absolute inset-0 rounded-full border-4 border-blue-200"></div>
                <div className="absolute inset-0 animate-spin rounded-full border-4 border-transparent border-t-blue-600"></div>
                <Wrench className="absolute inset-0 m-auto text-blue-600 animate-pulse" size={24} />
              </div>
              <p className="text-sm font-medium text-slate-600 animate-pulse">
                Loading Contact Messages...
              </p>
            </div>
          </div>
    )
  } }

  return (
    <>
      <Typography variant="h5" gutterBottom margin={2} >
        Contact Inquiry 
      </Typography>
      {/* <Typography variant="body2" color="text.secondary" sx={{ mb: 2 }}>
        Users ke contact form se aaye hue queries yahan dikhengi.
      </Typography> */}

      {/* <Paper>
        <Table size="small">
          <TableHead className="">
            <TableRow className="bg-gray-300 items-center">
              
              <TableCell className="">S. No</TableCell>
              <TableCell>Time</TableCell>
              <TableCell>Name</TableCell>
              <TableCell>Phone</TableCell>
              <TableCell>Subject</TableCell>
              <TableCell>City</TableCell>
              <TableCell align="right">View</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {rows.map((row, index) => (
              <TableRow className="bg-green-200" key={row._id}>
                <TableCell className="bg-amber-200">{index + 1}</TableCell>
                <TableCell>
                  {new Date(row.createdAt).toLocaleString("en-IN")}
                </TableCell>
                <TableCell>{row.name}</TableCell>
                <TableCell>{row.phone}</TableCell>
                <TableCell>{row.subject}</TableCell>
                <TableCell>{row.city || "-"}</TableCell>
                <TableCell align="right">
                  <IconButton size="small" onClick={() => handleOpen(row)}>
                    <Visibility fontSize="small" />
                  </IconButton>
                </TableCell>
              </TableRow>
            ))}

            {rows.length === 0 && (
              <TableRow>
                <TableCell colSpan={6} align="center">
                  No contact requests yet.
                </TableCell>
              </TableRow>
            )}
          </TableBody>
        </Table>
      </Paper> */}
      <Paper>
  <Table
    size="medium"
    sx={{
      "& th": {
        px: 5,
        py: 1.5,
        fontWeight: "bold",
        backgroundColor: "#e5e7eb",
      },
      "& td": {
        px: 5,
        py: 1.5,
      },
      "& tbody tr:hover": {
        backgroundColor: "#f0fdf4",
      },
    }}
  >
    <TableHead >
      <TableRow >
        <TableCell align="center">S. No</TableCell>
        <TableCell>Time</TableCell>
        <TableCell>Name</TableCell>
        <TableCell>Phone</TableCell>
        <TableCell>Subject</TableCell>
        <TableCell>City</TableCell>
        <TableCell align="right">View</TableCell>
      </TableRow>
    </TableHead>

    <TableBody>
      {rows.map((row, index) => (
        <TableRow key={row._id}>
          <TableCell align="center">{index + 1}</TableCell>
          <TableCell>
            {new Date(row.createdAt).toLocaleString("en-IN")}
          </TableCell>
          <TableCell>{row.name}</TableCell>
          <TableCell>{row.phone}</TableCell>
          <TableCell>{row.subject}</TableCell>
          <TableCell>{row.city || "-"}</TableCell>
          <TableCell align="right">
            <IconButton size="small" onClick={() => handleOpen(row)}>
              <Visibility fontSize="small" />
            </IconButton>
          </TableCell>
        </TableRow>
      ))}

      {rows.length === 0 && (
        <TableRow>
          <TableCell colSpan={7} align="center">
            No contact requests yet.
          </TableCell>
        </TableRow>
      )}
    </TableBody>
  </Table>
</Paper>


      <Dialog open={open} onClose={handleClose} fullWidth maxWidth="sm">
        <DialogTitle>Contact Details</DialogTitle>
        <DialogContent dividers>
          {selected && (
            <div className="space-y-1 text-sm">
              <p>
                <b>Name:</b> {selected.name}
              </p>
              <p>
                <b>Phone:</b> {selected.phone}
              </p>
              {selected.email && (
                <p>
                  <b>Email:</b> {selected.email}
                </p>
              )}
              <p>
                <b>Subject:</b> {selected.subject}
              </p>
              {selected.city && (
                <p>
                  <b>City / Area:</b> {selected.city}
                </p>
              )}
              {selected.preferredTime && (
                <p>
                  <b>Preferred Time:</b> {selected.preferredTime}
                </p>
              )}
              <p className="mt-2">
                <b>Message:</b>
                <br />
                {selected.message}
              </p>
            </div>
          )}
        </DialogContent>
        <DialogActions>
          <Button onClick={handleClose}>Close</Button>
        </DialogActions>
      </Dialog>
    </>
  );
};

export default AdminContacts;
