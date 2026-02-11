// import React, { useEffect, useState } from "react";
// import {
//   Typography,
//   Paper,
//   Table,
//   TableHead,
//   TableRow,
//   TableCell,
//   TableBody,
//   Select,
//   MenuItem,
//   Box,
// } from "@mui/material";
// import Clients from "../Services/Clients";

// const statusOptions = ["pending", "confirmed", "completed", "cancelled"];

// const AdminBookings = () => {
//   const [bookings, setBookings] = useState([]);

//   const fetchBookings = async () => {
//     const res = await Clients.get("/Bookings");
//     setBookings(res.data.bookings || []);
//   };

//   const handleStatusChange = async (bookingId, newStatus) => {
//     try {
//       await Clients.put(`/Bookings/${bookingId}/status`, {
//         status: newStatus,
//       });
//       fetchBookings();
//     } catch (error) {
//       console.error("Status update failed:", error);
//       alert("Status update failed");
//     }
//   };

//   useEffect(() => {
//     fetchBookings();
//   }, []);

//   return (
//     <Box>
//       <Typography variant="h5" mb={2}>
//         All Bookings
//       </Typography>

//       <Paper sx={{ width: "100%", overflowX: "auto" }}>
//         <Table size="small">
//           <TableHead>
//             <TableRow>
//               <TableCell>Customer</TableCell>
//               <TableCell>Email</TableCell>
//               <TableCell>Phone</TableCell>
//               <TableCell>Service</TableCell>
//               <TableCell>Date</TableCell>
//               <TableCell>Time</TableCell>
//               <TableCell>Address</TableCell>
//               <TableCell>Status</TableCell>
//               <TableCell>Payment</TableCell>
//             </TableRow>
//           </TableHead>
//           <TableBody>
//             {bookings.map((b) => (
//               <TableRow key={b._id}>
//                 <TableCell>{b.user?.name}</TableCell>
//                 <TableCell>{b.user?.email}</TableCell>
//                 <TableCell>{b.user?.phone}</TableCell>
//                 <TableCell>{b.service?.name}</TableCell>
//                 <TableCell>{b.date}</TableCell>
//                 <TableCell>{b.timeSlot}</TableCell>
//                 <TableCell>{b.address}</TableCell>
//                 <TableCell>
//                   <Select
//                     size="small"
//                     value={b.status}
//                     onChange={(e) =>
//                       handleStatusChange(b._id, e.target.value)
//                     }
//                   >
//                     {statusOptions.map((s) => (
//                       <MenuItem key={s} value={s}>
//                         {s}
//                       </MenuItem>
//                     ))}
//                   </Select>
//                 </TableCell>
                
//                 <TableCell>
//   <div className="flex flex-col text-xs">
//     <span>
//       Method: {b.paymentMethod === "online" ? "Online" : "Cash on Delivery"}
//     </span>
//     <span>
//       Status: {b.paymentStatus || "pending"}
//     </span>
//   </div>
// </TableCell>
//               </TableRow>
//             ))}

//             {bookings.length === 0 && (
//               <TableRow>
//                 <TableCell colSpan={8} align="center">
//                   No bookings found
//                 </TableCell>
//               </TableRow>
//             )}
//           </TableBody>
//         </Table>
//       </Paper>
//     </Box>
//   );
// };

// export default AdminBookings;



import React, { useEffect, useState } from "react";
import {
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Paper,
  Select,
  MenuItem,
  Chip,
  Typography,
  Box,
} from "@mui/material";
import toast from "react-hot-toast";

// 👉 tumhara AdminApi yahi hai:
import { adminApi } from "../Services/AdminApi";
import { Wrench } from "lucide-react";

const statusColors = {
  pending: "warning",
  confirmed: "info",
  completed: "success",
  cancelled: "error",
};

const paymentStatusColors = {
  paid: "success",
  pending: "warning",
};

const AdminBookings = () => {
  const [bookings, setBookings] = useState([]);
  const [loading, setLoading] = useState(false);

  // 🔹 saari bookings laana
  const loadBookings = async () => {
    try {
      setLoading(true);
      const res = await adminApi.getBookings(); // ✅ yahi use karna hai
      setBookings(res.data.bookings || []);
    } catch (err) {
      console.error("Admin getBookings error:", err);
      toast.error("Failed to load bookings");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    loadBookings();
  }, []);

  // 🔹 status change
  const handleStatusChange = async (bookingId, newStatus) => {
    try {
      // tumhara function: updateBookingStatus(id, status)
      await adminApi.updateBookingStatus(bookingId, newStatus);
      toast.success("Status updated");

      setBookings((prev) =>
        prev.map((b) =>
          b._id === bookingId ? { ...b, status: newStatus } : b
        )
      );
    } catch (err) {
      console.error("Admin updateBookingStatus error:", err);
      toast.error("Failed to update status");
    }
  };

  return (
    <Box>
      <Typography variant="h5" gutterBottom marginTop={1} marginLeft={1} >
        All Bookings
      </Typography>

      {loading ? (
<div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-slate-50 via-blue-50/30 to-slate-50">
        <div className="text-center">
          <div className="relative mx-auto mb-4 h-16 w-16">
            <div className="absolute inset-0 rounded-full border-4 border-blue-200"></div>
            <div className="absolute inset-0 animate-spin rounded-full border-4 border-transparent border-t-blue-600"></div>
            <Wrench className="absolute inset-0 m-auto text-blue-600 animate-pulse" size={24} />
          </div>
          <p className="text-sm font-medium text-slate-600 animate-pulse">
            Loading Bookings...
          </p>
        </div>
      </div>      ) : bookings.length === 0 ? (
        <Typography>No bookings found.</Typography>
      ) : (
        <TableContainer component={Paper}>
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
            <TableHead align="center">
              <TableRow  className="bg-gray-300">
                <TableCell>S. No</TableCell>
                <TableCell>User</TableCell>
                <TableCell>Service</TableCell>
                <TableCell>Date & Time</TableCell>
                <TableCell>Address</TableCell>
                <TableCell>Status</TableCell>
                <TableCell>Payment</TableCell>
              </TableRow>
            </TableHead>
            <TableBody className="bg-white">
              {bookings.map((b, index) => (
                <TableRow key={b._id}>
                  {/* 👤 User */}
               <TableCell align="center">{index + 1}</TableCell>   {/* <-- SERIAL NUMBER */}

                  <TableCell>
                    <Typography variant="subtitle2">
                      {b.user?.name || "-"}
                    </Typography>
                    <Typography variant="body2" color="text.secondary">
                      {b.user?.email || "-"}
                    </Typography>
                    <Typography variant="body2" color="text.secondary">
                      {b.user?.phone || "-"}
                    </Typography>
                  </TableCell>

                  {/* 🛠 Service */}
                  <TableCell>
                    <Typography variant="subtitle2">
                      {b.service?.name || "-"}
                    </Typography>
                    <Typography variant="body2" color="text.secondary">
                      ₹{b.service?.price ?? "-"}
                    </Typography>
                  </TableCell>

                  {/* 📅 Date & Time */}
                  <TableCell>
                    <Typography>{b.date || "-"}</Typography>
                    <Typography variant="body2" color="text.secondary">
                      {b.timeSlot || "-"}
                    </Typography>
                  </TableCell>

                  {/* 📍 Address */}
                  <TableCell>
                    <Typography variant="body2">{b.address || "-"}</Typography>
                    {b.notes && (
                      <Typography variant="caption" color="text.secondary">
                        Note: {b.notes}
                      </Typography>
                    )}
                  </TableCell>

                  {/* 🔄 Booking Status */}
                  <TableCell>
                    <Select
                      size="small"
                      value={b.status}
                      onChange={(e) =>
                        handleStatusChange(b._id, e.target.value)
                      }
                    >
                      <MenuItem value="pending">Pending</MenuItem>
                      <MenuItem value="confirmed">Confirmed</MenuItem>
                      <MenuItem value="completed">Completed</MenuItem>
                      <MenuItem value="cancelled">Cancelled</MenuItem>
                    </Select>
                    <Box mt={1}>
                      <Chip
                        label={(b.status || "").toUpperCase()}
                        size="small"
                        color={statusColors[b.status] || "default"}
                      />
                    </Box>
                  </TableCell>

                  {/* 💳 Payment */}
                  <TableCell>
                    <Typography variant="body2">
                      Method:{" "}
                      <b>{(b.paymentMethod || "cod").toUpperCase()}</b>
                    </Typography>
                    <Box mt={1}>
                      <Chip
                        label={(b.paymentStatus || "pending").toUpperCase()}
                        size="small"
                        color={
                          paymentStatusColors[b.paymentStatus] || "default"
                        }
                      />
                    </Box>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </TableContainer>
      )}
    </Box>
  );
};

export default AdminBookings;
