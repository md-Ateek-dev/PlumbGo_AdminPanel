import React from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { AdminAuthProvider } from "./Context/Admin_AuthContext";
import AdminProtectedRoute from "./Routes/AdminProtectedRoute";
import AdminLayout from "./Layouts/AdminLayout";
import AdminLogin from "./Pages/AdminLogin";
import AdminBookings from "./Pages/AdminBookings";
import AdminServices from "./Pages/AdminServices";
import AdminDashboard from "./Pages/AdminDashboard";
import { Navigate } from "react-router-dom";
import AdminCarousel from "./Pages/AdminCarousel";
import AdminContacts from "./Pages/AdminContacts";
import AdminBlogs from "./Pages/AdminBlogs";
import AdminGallery from "./Pages/AdminGallery";
import AdminTestimonials from "./Pages/AdminTestimonials";

// const AdminDashboard = () => <div>Admin Dashboard (coming soon)</div>;

const App = () => {
  return (
    <BrowserRouter>
      <AdminAuthProvider>
        <Routes>
          
          {/* root redirect */}
          <Route path="/" element={<Navigate to="/admin/login" replace />} />
          {/* Login page */}
          <Route path="/admin/login" element={<AdminLogin />} />

          {/* Protected admin area */}
          <Route
            path="/admin"
            element={
              <AdminProtectedRoute>
                <AdminLayout />
              </AdminProtectedRoute>
            }
          >
            {/* /admin -> /admin/dashboard */}
            <Route index element={<Navigate to="dashboard" replace />} />

            {/* Dashboard page – ye sidebar wala "/admin/dashboard" hai */}
            <Route path="dashboard" element={<AdminDashboard />} />   
              
                   {/* <Route index element={<AdminDashboard />} /> */}
            <Route path="bookings" element={<AdminBookings />} />
            <Route path="services" element={<AdminServices />} />
            <Route path="carousel" element={<AdminCarousel/>}/>
            <Route path="contacts" element={<AdminContacts />} />
            <Route path="gallery" element={<AdminGallery/>} />
            <Route path="blogs" element={<AdminBlogs />} />
            <Route path="testimonial" element={<AdminTestimonials/>} />

          </Route>
        </Routes>
      </AdminAuthProvider>
    </BrowserRouter>
  );
};

export default App;
