import React, { useEffect, useState } from "react";
import { Wrench, CheckCircle, Trash2 } from "lucide-react";
import toast from "react-hot-toast";

// Import your API functions
import {
  getAdminTestimonials,
  updateTestimonialStatus,
  deleteTestimonial,
} from "../Services/AdminApi";

const AdminTestimonials = () => {
  const [items, setItems] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    load();
  }, []);

  const load = async () => {
    try {
      setLoading(true);
      const res = await getAdminTestimonials();
      console.log("ADMIN TESTIMONIALS:", res.data.testimonial);
      setItems(res.data.testimonials || []);
    } catch (err) {
      console.error("Admin testimonials error:", err);
      toast.error("Failed to load testimonials");
    } finally {
      setLoading(false);
    }
  };

  const approve = async (id) => {
    try {
      await updateTestimonialStatus(id, true);
      toast.success("Testimonial approved");
      load();
    } catch (error) {
      console.error("Approve error:", error);
      toast.error("Error approving testimonial");
    }
  };

  const remove = async (id) => {
    if (!window.confirm("Delete this testimonial?")) return;
    try {
      await deleteTestimonial(id);
      toast.success("Testimonial deleted");
      load();
    } catch (error) {
      console.error("Delete error:", error);
      toast.error("Error deleting testimonial");
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
            Loading testimonials...
          </p>
        </div>
      </div>
    );
  }

  return (
    <div className="p-4">
      {/* Header */}
      <div className="flex justify-between items-center mb-4">
        <h2 className="text-2xl font-semibold ml-2 mt-1">All Testimonials</h2>
      </div>

      {/* Table */}
      <div className="bg-white rounded-lg shadow overflow-x-auto">
        <table className="w-full">
          <thead>
            <tr className="bg-gray-200">
              <th className="px-6 py-3 text-left font-bold">S. No</th>
              <th className="px-6 py-3 text-left font-bold">Name</th>
              <th className="px-6 py-3 text-left font-bold">Rating</th>
              <th className="px-6 py-3 text-left font-bold">Status</th>
              <th className="px-6 py-3 text-right font-bold">Actions</th>
            </tr>
          </thead>
          <tbody>
            {items?.length > 0 ? (
              items.map((i, index) => (
                <tr key={i._id} className="border-b hover:bg-green-50 transition-colors">
                  <td className="px-6 py-3 text-center">{index + 1}</td>
                  <td className="px-6 py-3">{i.name}</td>
                  <td className="px-6 py-3">{i.rating} ⭐</td>
                  <td className="px-6 py-3">
                    {i.isApproved ? (
                      <span className="inline-flex items-center px-3 py-1 rounded-full text-xs font-medium bg-green-100 text-green-800">
                        Approved
                      </span>
                    ) : (
                      <span className="inline-flex items-center px-3 py-1 rounded-full text-xs font-medium bg-yellow-100 text-yellow-800">
                        Pending
                      </span>
                    )}
                  </td>
                  <td className="px-6 py-3 text-right">
                    {!i.isApproved && (
                      <button
                        onClick={() => approve(i._id)}
                        className="inline-flex items-center justify-center w-8 h-8 rounded-full hover:bg-green-100 text-green-600 transition-colors mr-2"
                        title="Approve"
                      >
                        <CheckCircle size={20} />
                      </button>
                    )}
                    <button
                      onClick={() => remove(i._id)}
                      className="inline-flex items-center justify-center w-8 h-8 rounded-full hover:bg-red-100 text-red-600 transition-colors"
                      title="Delete"
                    >
                      <Trash2 size={20} />
                    </button>
                  </td>
                </tr>
              ))
            ) : (
              <tr>
                <td colSpan="5" className="px-6 py-8 text-center text-gray-500">
                  No testimonials found
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default AdminTestimonials;