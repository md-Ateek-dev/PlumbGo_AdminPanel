import Clients from "./Clients";

export const adminApi = {
  // SERVICES
  getServices: () => Clients.get("/Services"),
  createService: (data) => Clients.post("/Services", data),
  updateService: (id, data) => Clients.put(`/Services/${id}`, data),
  deleteService: (id) => Clients.delete(`/Services/${id}`),

  // BOOKINGS (agar baad me use karna chaho)
  getBookings: () => Clients.get("/Bookings"),
  updateBookingStatus: (id, status) =>
    Clients.put(`/Bookings/${id}/status`, { status }),
  
//   // Blogs Admin API

// createBlog:  (data) =>
//   Clients.post("/admin/Blogs", data, {
//     headers: adminHeader(),
//   }),

//  getAdminBlogs: () =>
//   Clients.get("/admin/Blogs", {
//     headers: adminHeader(),
//   }),

// updateBlog:  (id, data) =>
//   Clients.put(`/admin/Blogs/${id}`, data, {
//     headers: adminHeader(),
//   }),

// deleteBlog: (id) =>
//   Clients.delete(`/admin/Blogs/${id}`, {
//     headers: adminHeader(),
//   })

  

  
};

const getAdminToken = () => localStorage.getItem("plumbgo_admin_token");

const adminHeader = () => {
  const token = getAdminToken();
  return {
    Authorization: token ? `Bearer ${token}` : "",
  };
};

// Carousel Admin API
export const getCarouselAdmin = () =>
  Clients.get("/admin/Carousel", { headers: adminHeader() });

export const createCarouselSlide = (data) =>
  Clients.post("/admin/Carousel", data, { headers: adminHeader() });

export const updateCarouselSlide = (id, data) =>
  Clients.put(`/admin/Carousel/${id}`, data, { headers: adminHeader() });

export const deleteCarouselSlide = (id) =>
  Clients.delete(`/admin/Carousel/${id}`, { headers: adminHeader() });

// Carousel image upload
// export const uploadCarouselImage = (file) => {
//   const formData = new FormData();
//   formData.append("image", file);

//   return Clients.post("/admin/Carousel/upload-image", formData, {
//     headers: {
//       ...adminHeader(),
//       "Content-Type": "multipart/form-data",
//     },
//   });
// };

export const uploadCarouselImage = (formData) =>
  Clients.post("/admin/Carousel/upload-image", formData, {
    headers: {
      ...adminHeader(),
      "Content-Type": "multipart/form-data",   // 🔥 IMPORTANT
    },
  });


export const getBookingStats = () => {
  return Clients.get("/Bookings/stats", {
    headers: adminHeader(),
  });
};


// ContactUs Api 

export const getContactMessages = () =>
  Clients.get("/admin/Contacts", {
    headers: adminHeader(),
  });
console.log("getContactMessages");


// BLOGS
export const getAdminBlogs = () =>
  Clients.get("/admin/blogs", { headers: adminHeader() });

export const createBlog = (data) =>
  Clients.post("/admin/blogs", data, { headers: adminHeader() });

export const updateBlog = (id, data) =>
  Clients.put(`/admin/blogs/${id}`, data, { headers: adminHeader() });

export const deleteBlog = (id) =>
  Clients.delete(`/admin/blogs/${id}`, { headers: adminHeader() });

// 🔥 Blog Image Upload
export const uploadBlogImage = (formData) =>
  Clients.post("/admin/blogs/upload-image", formData, {
    headers: {
      ...adminHeader(),
      "Content-Type": "multipart/form-data",
    },
  });

  
export const uploadGalleryImage = (formData) =>
  Clients.post("/admin/gallery/upload", formData, {
    headers: { ...adminHeader(), "Content-Type": "multipart/form-data" },
  });

export const getAdminGalleryImage = () =>
  Clients.get("/admin/gallery", { headers: adminHeader() });

export const createGalleryImage = (data) =>
  Clients.post("/admin/gallery", data, { headers: adminHeader() });

export const updateGalleryImage = (id, data) =>
  Clients.put(`/admin/gallery/${id}`, data, {
    headers: adminHeader(),
  });


export const deleteGalleryImage = (id) =>
  Clients.delete(`/admin/gallery/${id}`, { headers: adminHeader() });


// testimonial Api

// ===== TESTIMONIALS =====
export const getAdminTestimonials = () =>
  Clients.get("/admin/testimonials", { headers: adminHeader() });

export const updateTestimonialStatus = (id, isApproved) =>
  Clients.put(
    `/admin/testimonials/${id}`,
    { isApproved },
    { headers: adminHeader() }
  );

export const deleteTestimonial = (id) =>
  Clients.delete(`/admin/testimonials/${id}`, {
    headers: adminHeader(),
  });
// End Testimonial Api