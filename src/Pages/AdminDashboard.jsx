// import React, { useEffect, useState } from "react";
// import { getBookingStats } from "../Services/AdminApi";
// import { Card, CardContent, Typography, Grid } from "@mui/material";

// const AdminDashboard = () => {
//   const [stats, setStats] = useState(null);

//   useEffect(() => {
//     const loadStats = async () => {
//       try {
//         const res = await getBookingStats();
//         setStats(res.data.stats);
//       } catch (err) {
//         console.error("Stats error:", err);
//       }
//     };

//     loadStats();
//   }, []);

//   if (!stats) {
//     return <Typography>Loading stats...</Typography>;
//   }

//   const {
//     total,
//     pending,
//     confirmed,
//     completed,
//     cancelled,
//     onlinePaid,
//     cashOnDelivery,
//     totalRevenue,
//   } = stats;

//   return (
//     <Grid container spacing={2}>
//       <Grid item xs={12} sm={6} md={3}>
//         <Card>
//           <CardContent>
//             <Typography variant="subtitle2" color="textSecondary">
//               Total Bookings
//             </Typography>
//             <Typography variant="h5">{total}</Typography>
//           </CardContent>
//         </Card>
//       </Grid>

//       <Grid item xs={12} sm={6} md={3}>
//         <Card>
//           <CardContent>
//             <Typography variant="subtitle2" color="textSecondary">
//               Pending
//             </Typography>
//             <Typography variant="h5">{pending}</Typography>
//           </CardContent>
//         </Card>
//       </Grid>

//       <Grid item xs={12} sm={6} md={3}>
//         <Card>
//           <CardContent>
//             <Typography variant="subtitle2" color="textSecondary">
//               Confirmed
//             </Typography>
//             <Typography variant="h5">{confirmed}</Typography>
//           </CardContent>
//         </Card>
//       </Grid>

//       <Grid item xs={12} sm={6} md={3}>
//         <Card>
//           <CardContent>
//             <Typography variant="subtitle2" color="textSecondary">
//               Completed
//             </Typography>
//             <Typography variant="h5">{completed}</Typography>
//           </CardContent>
//         </Card>
//       </Grid>

//       <Grid item xs={12} sm={6} md={3}>
//         <Card>
//           <CardContent>
//             <Typography variant="subtitle2" color="textSecondary">
//               Cancelled
//             </Typography>
//             <Typography variant="h5">{cancelled}</Typography>
//           </CardContent>
//         </Card>
//       </Grid>

//       <Grid item xs={12} sm={6} md={3}>
//         <Card>
//           <CardContent>
//             <Typography variant="subtitle2" color="textSecondary">
//               Online Paid
//             </Typography>
//             <Typography variant="h5">{onlinePaid}</Typography>
//           </CardContent>
//         </Card>
//       </Grid>
//       {/* ✅ NEW – Cash on Delivery */}
// <Grid item xs={12} sm={6} md={3}>
//   <Card>
//     <CardContent>
//       <Typography variant="subtitle2">Cash on Delivery</Typography>
//       <Typography variant="h5">{cashOnDelivery}</Typography>
//     </CardContent>
//   </Card>
// </Grid>

//       <Grid item xs={12} sm={6} md={3}>
//         <Card>
//           <CardContent>
//             <Typography variant="subtitle2" color="textSecondary">
//               Total Revenue (₹)
//             </Typography>
//             <Typography variant="h5">{totalRevenue}</Typography>
//           </CardContent>
//         </Card>
//       </Grid>
//     </Grid>
//   );
// };

// export default AdminDashboard;

// import React, { useEffect, useState } from "react";
// import { getBookingStats } from "../Services/AdminApi";
// import { Card, CardContent, Typography, Grid, Box } from "@mui/material";
// import {
//   TrendingUp as TrendingUpIcon,
//   AccessTime as AccessTimeIcon,
//   CheckCircle as CheckCircleIcon,
//   Verified as VerifiedIcon,
//   Cancel as CancelIcon,
//   Payment as PaymentIcon,
//   AttachMoney as AttachMoneyIcon,
//   MonetizationOn as MonetizationOnIcon,
// } from "@mui/icons-material";

// const AdminDashboard = () => {
//   const [stats, setStats] = useState(null);

//   useEffect(() => {
//     const loadStats = async () => {
//       try {
//         const res = await getBookingStats();
//         setStats(res.data.stats);
//       } catch (err) {
//         console.error("Stats error:", err);
//       }
//     };

//     loadStats();
//   }, []);

//   if (!stats) {
//     return (
//       <Box display="flex" justifyContent="center" alignItems="center" minHeight="400px">
//         <Typography variant="h6" color="textSecondary">
//           Loading stats...
//         </Typography>
//       </Box>
//     );
//   }

//   const {
//     total,
//     pending,
//     confirmed,
//     completed,
//     cancelled,
//     onlinePaid,
//     cashOnDelivery,
//     totalRevenue,
//   } = stats;

//   const statCards = [
//     { label: "Total Bookings", value: total, icon: TrendingUpIcon, color: "#6366f1" },
//     { label: "Pending", value: pending, icon: AccessTimeIcon, color: "#f59e0b" },
//     { label: "Confirmed", value: confirmed, icon: VerifiedIcon, color: "#06b6d4" },
//     { label: "Completed", value: completed, icon: CheckCircleIcon, color: "#10b981" },
//     { label: "Cancelled", value: cancelled, icon: CancelIcon, color: "#ef4444" },
//     { label: "Online Paid", value: onlinePaid, icon: PaymentIcon, color: "#ec4899" },
//     { label: "Cash on Delivery", value: cashOnDelivery, icon: AttachMoneyIcon, color: "#059669" },
//     { label: "Total Revenue (₹)", value: totalRevenue, icon: MonetizationOnIcon, color: "#8b5cf6" },
//   ];

//   return (
//     <>
//       <Box 
//         sx={{ 
//           p: 3, 
//           minHeight: "100vh",
//           background: "linear-gradient(135deg, #667eea 0%, #764ba2 100%)",
//           position: "relative",
//           overflow: "hidden"
//         }}
//       >
//         {/* Animated Background */}
//         <Box
//           sx={{
//             position: "absolute",
//             top: 0,
//             left: 0,
//             right: 0,
//             bottom: 0,
//             backgroundImage: "radial-gradient(circle at 20% 80%, rgba(120,119,198,0.3) 0%, transparent 50%), radial-gradient(circle at 80% 20%, rgba(255,119,198,0.3) 0%, transparent 50%)",
//             animation: "float 20s ease-in-out infinite",
//             zIndex: 0
//           }}
//         />
        
//         <Grid container spacing={3} sx={{ position: "relative", zIndex: 1 }}>
//           {statCards.map((stat, index) => (
//             <Grid item xs={12} sm={6} md={3} key={stat.label}>
//               <Card
//                 sx={{
//                   background: "rgba(255, 255, 255, 0.9)",
//                   backdropFilter: "blur(20px)",
//                   border: "1px solid rgba(255, 255, 255, 0.2)",
//                   borderRadius: 3,
//                   boxShadow: "0 20px 40px rgba(0,0,0,0.1)",
//                   transition: "all 0.4s cubic-bezier(0.175, 0.885, 0.32, 1.275)",
//                   transform: "translateY(20px)",
//                   opacity: 0,
//                   animation: `slideUp 0.6s cubic-bezier(0.175, 0.885, 0.32, 1.275) ${index * 0.1}s forwards`,
//                   position: "relative",
//                   overflow: "hidden",
//                   "&:hover": {
//                     transform: "translateY(-12px) scale(1.02)",
//                     boxShadow: "0 30px 60px rgba(0,0,0,0.2)",
//                     background: "rgba(255, 255, 255, 0.95)",
//                   },
//                 }}
//               >
//                 <CardContent sx={{ p: 3, textAlign: "center", position: "relative" }}>
//                   <Box
//                     sx={{
//                       width: 64,
//                       height: 64,
//                       borderRadius: "50%",
//                       background: `linear-gradient(135deg, ${stat.color}, ${stat.color}80)`,
//                       display: "flex",
//                       alignItems: "center",
//                       justifyContent: "center",
//                       mx: "auto",
//                       mb: 2.5,
//                       boxShadow: `0 12px 32px ${stat.color}30`,
//                       transform: "scale(0.8)",
//                       transition: "all 0.4s ease",
//                       "&:hover": {
//                         transform: "scale(1.1) rotate(5deg)",
//                       }
//                     }}
//                   >
//                     <stat.icon sx={{ color: "white", fontSize: 32 }} />
//                   </Box>
                  
//                   <Typography
//                     variant="h4"
//                     sx={{
//                       fontSize: { xs: "2rem", md: "2.5rem" },
//                       fontWeight: 800,
//                       background: `linear-gradient(135deg, ${stat.color}, ${stat.color}cc)`,
//                       WebkitBackgroundClip: "text",
//                       backgroundClip: "text",
//                       WebkitTextFillColor: "transparent",
//                       mb: 1,
//                       lineHeight: 1.2,
//                     }}
//                   >
//                     {typeof stat.value === 'number' ? stat.value.toLocaleString() : stat.value || 0}
//                   </Typography>
                  
//                   <Typography
//                     variant="body2"
//                     sx={{
//                       color: "text.secondary",
//                       fontWeight: 600,
//                       textTransform: "uppercase",
//                       letterSpacing: "0.5px",
//                       fontSize: "0.85rem",
//                     }}
//                   >
//                     {stat.label}
//                   </Typography>
//                 </CardContent>
//               </Card>
//             </Grid>
//           ))}
//         </Grid>
//       </Box>

//       <style jsx global>{`
//         @keyframes slideUp {
//           to {
//             opacity: 1;
//             transform: translateY(0);
//           }
//         }
        
//         @keyframes float {
//           0%, 100% { transform: translateY(0px) rotate(0deg); }
//           33% { transform: translateY(-20px) rotate(120deg); }
//           66% { transform: translateY(-10px) rotate(240deg); }
//         }
        
//         @media (prefers-reduced-motion: reduce) {
//           * {
//             animation-duration: 0.01ms !important;
//             animation-iteration-count: 1 !important;
//             transition-duration: 0.01ms !important;
//           }
//         }
//       `}</style>
//     </>
//   );
// };

// export default AdminDashboard;





import React, { useEffect, useState } from "react";
import { getBookingStats } from "../Services/AdminApi";
import { Card, CardContent, Typography, Grid, Box } from "@mui/material";
import {
  TrendingUp as TrendingUpIcon,
  AccessTime as AccessTimeIcon,
  CheckCircle as CheckCircleIcon,
  Verified as VerifiedIcon,
  Cancel as CancelIcon,
  Payment as PaymentIcon,
  AttachMoney as AttachMoneyIcon,
  MonetizationOn as MonetizationOnIcon,
} from "@mui/icons-material";
import { Wrench } from "lucide-react";
import bgImage from "../assets/bg2_pattern.avif"
import { color } from "framer-motion";

const AdminDashboard = () => {
  const [stats, setStats] = useState(null);

  useEffect(() => {
    const loadStats = async () => {
      try {
        const res = await getBookingStats();
        setStats(res.data.stats);
      } catch (err) {
        console.error("Stats error:", err);
      }
    };

    loadStats();
  }, []);

  if (!stats) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-slate-50 via-blue-50/30 to-slate-50">
        <div className="text-center">
          <div className="relative mx-auto mb-4 h-16 w-16">
            <div className="absolute inset-0 rounded-full border-4 border-blue-200"></div>
            <div className="absolute inset-0 animate-spin rounded-full border-4 border-transparent border-t-blue-600"></div>
            <Wrench className="absolute inset-0 m-auto text-blue-600 animate-pulse" size={24} />
          </div>
          <p className="text-sm font-medium text-slate-600 animate-pulse">
            Loading Dashboard...
          </p>
        </div>
      </div>
    );
  }

  const {
    total,
    pending,
    confirmed,
    completed,
    cancelled,
    onlinePaid,
    cashOnDelivery,
    totalRevenue,
  } = stats;

  const statCards = [
    { label: "Total Bookings", value: total, icon: TrendingUpIcon, color: "#6366f1", gradient: "linear-gradient(135deg, #6366f1 0%, #8b5cf6 100%)" },
    { label: "Pending", value: pending, icon: AccessTimeIcon, color: "#f59e0b", gradient: "linear-gradient(135deg, #f59e0b 0%, #fb923c 100%)" },
    { label: "Confirmed", value: confirmed, icon: VerifiedIcon, color: "#06b6d4", gradient: "linear-gradient(135deg, #06b6d4 0%, #0891b2 100%)" },
    { label: "Completed", value: completed, icon: CheckCircleIcon, color: "#10b981", gradient: "linear-gradient(135deg, #10b981 0%, #059669 100%)" },
    { label: "Cancelled", value: cancelled, icon: CancelIcon, color: "#ef4444", gradient: "linear-gradient(135deg, #ef4444 0%, #dc2626 100%)" },
    { label: "Online Paid", value: onlinePaid, icon: PaymentIcon, color: "#ec4899", gradient: "linear-gradient(135deg, #ec4899 0%, #db2777 100%)" },
    { label: "Cash on Delivery", value: cashOnDelivery, icon: AttachMoneyIcon, color: "#059669", gradient: "linear-gradient(135deg, #059669 0%, #047857 100%)" },
    { label: "Total Revenue (₹)", value: totalRevenue, icon: MonetizationOnIcon, color: "#8b5cf6", gradient: "linear-gradient(135deg, #8b5cf6 0%, #7c3aed 100%)" },
  ];

  return (
    <>
      <Box 
        sx={{ 
          p: 4,
          minHeight: "100vh",
          backgroundImage: `
  url(${bgImage})
`,

          position: "relative",
          overflow: "hidden"
        }}
      >
        {/* Animated Background Elements */}
        <Box
          sx={{
            position: "absolute",
            top: "-50%",
            left: "-5%",
            width: "600px",
            height: "600px",
            borderRadius: "50%",
            background: "radial-gradient(circle, rgba(99, 102, 241, 0.15) 0%, transparent 70%)",
            animation: "float 25s ease-in-out infinite",
            zIndex: 0
          }}
        />
        <Box
          sx={{
            position: "absolute",
            bottom: "-30%",
            right: "-5%",
            width: "500px",
            height: "500px",
            borderRadius: "50%",
            background: "radial-gradient(circle, rgba(139, 92, 246, 0.12) 0%, transparent 70%)",
            animation: "float 30s ease-in-out infinite reverse",
            zIndex: 0
          }}
        />
        <Box
          sx={{
            position: "absolute",
            top: "40%",
            right: "10%",
            width: "300px",
            height: "300px",
            borderRadius: "50%",
            background: "radial-gradient(circle, rgba(236, 72, 153, 0.1) 0%, transparent 70%)",
            animation: "float 20s ease-in-out infinite",
            zIndex: 0
          }}
        />
        
        {/* Header */}
        <Box sx={{ position: "relative", zIndex: 1, mb: 4 }}>
          <Typography
            variant="h3"
            sx={{
              fontWeight: 800,
              background: "linear-gradient(135deg, #ffffff 0%, #94a3b8 100%)",
              WebkitBackgroundClip: "text",
              backgroundClip: "text",
              WebkitTextFillColor: "",
              mb: 1,
              fontSize: { xs: "2rem", md: "2.5rem" },
              animation: "fadeInDown 0.8s ease-out"
            }}
          >
            Dashboard Overview
          </Typography>
          <Typography
            variant="body1"
            sx={{
              color: "black",
              fontWeight: 500,
              animation: "fadeInDown 0.8s ease-out 0.2s both"
            }}
          >
            Real-time booking statistics and analytics
          </Typography>
        </Box>
        
        <Grid container spacing={3} sx={{ position: "relative", zIndex: 1 }}>
          {statCards.map((stat, index) => (
            <Grid item xs={12} sm={6} md={3} key={stat.label}>
              <Card
                sx={{
                  background: "",
                  backdropFilter: "blur(20px)",
                  border: "1px solid rgba(255, 255, 255, 0.1)",
                  borderRadius: 4,
                  boxShadow: "0 8px 32px rgba(0, 0, 0, 0.4)",
                  transition: "all 0.5s cubic-bezier(0.34, 1.56, 0.64, 1)",
                  transform: "translateY(30px)",
                  opacity: 0,
                  animation: `slideUpFade 0.8s cubic-bezier(0.34, 1.56, 0.64, 1) ${index * 0.1}s forwards`,
                  position: "relative",
                  overflow: "hidden",
                  "&::before": {
                    content: '""',
                    position: "absolute",
                    top: 0,
                    left: 0,
                    right: 0,
                    // height: "3px",
                    background: stat.gradient,
                    opacity: 0,
                    transition: "opacity 0.4s ease",
                  },
                 
                  "&:hover": {
                    transform: "translateY(-16px) scale(1.03)",
                    boxShadow: `0 20px 60px ${stat.color}40, 0 0 0 1px ${stat.color}20`,
                    background: "rgba(30, 41, 59, 0.95)",
                    borderColor: `${stat.color}40`,
                    "&::before": {
                      opacity: 1,
                    },
                    "& .icon-container": {
                      transform: "scale(1.15) rotate(-5deg)",
                      boxShadow: `0 15px 40px ${stat.color}50`,
                    },
                    
                    "& .stat-value": {
                      color:"white",
                    },
                    
                    "& .stat-label": {
                     color: "white",
                    }, 
                    
                  },
                }}
              >
                <CardContent sx={{ p: 3.5, textAlign: "center", position: "relative" }}>
                  {/* Glow Effect */}
                  <Box
                    sx={{
                      position: "absolute",
                      top: "50%",
                      left: "50%",
                      transform: "translate(-50%, -50%)",
                      width: "200px",
                      height: "200px",
                      borderRadius: "50%",
                      background: `radial-gradient(circle, ${stat.color}15 0%, transparent 70%)`,
                      opacity: 0,
                      transition: "opacity 0.5s ease",
                      pointerEvents: "none",
                    }}
                    className="glow-effect"
                  />
                  
                  <Box
                    className="icon-container"
                    sx={{
                      width: 70,
                      height: 70,
                      borderRadius: "20px",
                      background: stat.gradient,
                      display: "flex",
                      alignItems: "center",
                      justifyContent: "center",
                      mx: "auto",
                      mb: 3,
                      boxShadow: `0 10px 30px ${stat.color}40`,
                      position: "relative",
                      transition: "all 0.5s cubic-bezier(0.34, 1.56, 0.64, 1)",
                      "&::after": {
                        content: '""',
                        position: "absolute",
                        inset: -2,
                        borderRadius: "20px",
                        padding: "2px",
                        background: stat.gradient,
                        WebkitMask: "linear-gradient(#fff 0 0) content-box, linear-gradient(#fff 0 0)",
                        WebkitMaskComposite: "xor",
                        maskComposite: "exclude",
                        opacity: 0.5,
                      }
                    }}
                  >
                    <stat.icon sx={{ color: "white", fontSize: 36 }} />
                  </Box>
                  
                  <Typography
                    className="stat-value"
                    variant="h3"
                    sx={{
                      fontSize: { xs: "2.25rem", md: "2.75rem" },
                      fontWeight: 900,
                      color: "black",
                      mb: 1.5,
                      lineHeight: 1,
                      transition: "transform 0.4s cubic-bezier(0.34, 1.56, 0.64, 1)",
                      textShadow: `0 2px 20px ${stat.color}60`,
                    }}
                  >
                    {typeof stat.value === 'number' ? stat.value.toLocaleString() : stat.value || 0}
                  </Typography>
                  
                  <Typography
                    className="stat-label"

                    variant="body2"
                    sx={{
                      color: "black",
                      fontWeight: 600,
                      textTransform: "uppercase",
                      letterSpacing: "1.5px",
                      fontSize: "0.75rem",
                    }}
                  >
                    {stat.label}
                  </Typography>
                </CardContent>
              </Card>
            </Grid>
          ))}
        </Grid>
      </Box>

      <style jsx global>{`
        @keyframes slideUpFade {
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }
        
        @keyframes float {
          0%, 100% { 
            transform: translate(0, 0) scale(1); 
          }
          33% { 
            transform: translate(30px, -30px) scale(1.05); 
          }
          66% { 
            transform: translate(-20px, 20px) scale(0.95); 
          }
        }
        
        @keyframes fadeInDown {
          from {
            opacity: 0;
            transform: translateY(-20px);
          }
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }
        
        .MuiCard-root:hover .glow-effect {
          opacity: 1;
        }
        
        @media (prefers-reduced-motion: reduce) {
          * {
            animation-duration: 0.01ms !important;
            animation-iteration-count: 1 !important;
            transition-duration: 0.01ms !important;
          }
        }
      `}</style>
    </>
  );
};

export default AdminDashboard;
