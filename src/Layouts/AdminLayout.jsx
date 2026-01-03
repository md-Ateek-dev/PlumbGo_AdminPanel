// import React from "react";
// import {
//   AppBar,
//   Toolbar,
//   Typography,
//   Drawer,
//   List,
//   ListItemButton,
//   ListItemText,
//   Box,
//   Button,
// } from "@mui/material";
// import { Outlet, useLocation, useNavigate } from "react-router-dom";
// import { useAdminAuth } from "../Context/Admin_AuthContext";

// const drawerWidth = 220;

// const AdminLayout = () => {
//   const navigate = useNavigate();
//   const location = useLocation();
//   const { logout } = useAdminAuth();

//   const menuItems = [
//     { label: "Dashboard", path: "/admin/dashboard" },
//     { label: "Bookings", path: "/admin/bookings" },
//     { label: "Services", path: "/admin/services" }, 
//     { label: "Carousel", path: "/admin/Carousel" }, 
//     { label: "Contacts", path: "/admin/Contacts" }, 
//   ];

//   return (
//     <Box sx={{ display: "flex" }}>
//       {/* Sidebar */}
//       <Drawer
//         variant="permanent"
//         sx={{
//           width: drawerWidth,
//           [`& .MuiDrawer-paper`]: {
//             width: drawerWidth,
//             boxSizing: "border-box",
//           },
//         }}
//       >
//         <Toolbar />
//         <List>
//           {menuItems.map((item) => (
//             <ListItemButton
//               key={item.path}
//               selected={location.pathname === item.path}
//               onClick={() => navigate(item.path)}
//             >
//               <ListItemText primary={item.label} />
//             </ListItemButton>
//           ))}
//         </List>
//       </Drawer>

//       {/* Topbar + content */}
//       <Box sx={{ flexGrow: 1 }}>
//         <AppBar
//           position="fixed"
//           sx={{ ml: `${drawerWidth}px`, width: `calc(100% - ${drawerWidth}px)` }}
//         >
//           <Toolbar sx={{ display: "flex", justifyContent: "space-between" }}>
//             <Typography variant="h6" noWrap>
//               PlumbGo Admin
//             </Typography>
//             <Button color="inherit" onClick={logout}>
//               Logout
//             </Button>
//           </Toolbar>
//         </AppBar>

//         <Box component="main" sx={{mt: 8 }}>
//           <Outlet />
//         </Box>
//       </Box>
//     </Box>
//   );
// };

// export default AdminLayout;


// import React from "react";
// import {
//   AppBar,
//   Toolbar,
//   Typography,
//   Drawer,
//   List,
//   ListItemButton,
//   ListItemText,
//   Box,
//   Button,
//   IconButton,
//   useTheme,
//   useMediaQuery,
// } from "@mui/material";
// import {
//   Menu as MenuIcon,
//   Dashboard as DashboardIcon,
//   Book as BookIcon,
//   Build as BuildIcon,
//   Image as ImageIcon,
//   ContactPhone as ContactIcon,
//   Logout as LogoutIcon,
// } from "@mui/icons-material";
// import { Outlet, useLocation, useNavigate } from "react-router-dom";
// import { useAdminAuth } from "../Context/Admin_AuthContext";
// import { alpha } from "@mui/material/styles";

// const drawerWidth = 260;

// const AdminLayout = () => {
//   const navigate = useNavigate();
//   const location = useLocation();
//   const { logout } = useAdminAuth();
//   const theme = useTheme();
//   const isMobile = useMediaQuery(theme.breakpoints.down('md'));
//   const [mobileOpen, setMobileOpen] = React.useState(false);

//   const menuItems = [
//     { label: "Dashboard", path: "/admin/dashboard", icon: DashboardIcon },
//     { label: "Bookings", path: "/admin/bookings", icon: BookIcon },
//     { label: "Services", path: "/admin/services", icon: BuildIcon },
//     { label: "Carousel", path: "/admin/Carousel", icon: ImageIcon },
//     { label: "Contacts", path: "/admin/Contacts", icon: ContactIcon },
//   ];

//   const handleDrawerToggle = () => {
//     setMobileOpen(!mobileOpen);
//   };

//   const drawer = (
//     <Box sx={{ width: drawerWidth }}>
//       <Toolbar sx={{ 
//         justifyContent: 'center', 
//         py: 3,
//         background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
//         mb: 4,
//         borderRadius: '0 0 20px 20px',
//         boxShadow: '0 10px 30px rgba(102, 126, 234, 0.4)'
//       }}>
//         <Typography
//           variant="h5"
//           sx={{
//             fontWeight: 800,
//             background: 'linear-gradient(135deg, #fff 0%, #f0f0ff 100%)',
//             WebkitBackgroundClip: 'text',
//             backgroundClip: 'text',
//             WebkitTextFillColor: 'transparent',
//           }}
//         >
//           PlumbGo
//         </Typography>
//       </Toolbar>
      
//       <List sx={{ px: 2 }}>
//         {menuItems.map((item, index) => (
//           <ListItemButton
//             key={item.path}
//             selected={location.pathname === item.path}
//             onClick={() => {
//               navigate(item.path);
//               if (isMobile) setMobileOpen(false);
//             }}
//             sx={{
//               my: 1,
//               borderRadius: 3,
//               transition: 'all 0.3s cubic-bezier(0.4, 0, 0.2, 1)',
//               background: location.pathname === item.path 
//                 ? 'linear-gradient(135deg, rgba(102,126,234,0.2) 0%, rgba(118,75,162,0.2) 100%)'
//                 : 'transparent',
//               backdropFilter: 'blur(10px)',
//               border: '1px solid transparent',
//               position: 'relative',
//               opacity: 0,
//               transform: 'translateX(-20px)',
//               animation: `slideInRight 0.6s cubic-bezier(0.4, 0, 0.2, 1) ${index * 0.1 + 0.2}s both`,
//               '&:hover': {
//                 background: `linear-gradient(135deg, ${alpha('#667eea', 0.1)} 0%, ${alpha('#764ba2', 0.1)} 100%)`,
//                 transform: 'translateX(5px)',
//                 boxShadow: '0 8px 25px rgba(102,126,234,0.3)',
//                 borderColor: alpha('#667eea', 0.3),
//               },
//               '&.Mui-selected': {
//                 background: 'linear-gradient(135deg, rgba(102,126,234,0.3) 0%, rgba(118,75,162,0.3) 100%)',
//                 boxShadow: '0 8px 25px rgba(102,126,234,0.4)',
//                 borderColor: '#667eea',
//               }
//             }}
//           >
//             <item.icon 
//               sx={{ 
//                 mr: 2, 
//                 fontSize: 24,
//                 color: location.pathname === item.path ? '#667eea' : 'text.primary'
//               }} 
//             />
//             <ListItemText 
//               primary={item.label}
//               primaryTypographyProps={{
//                 fontWeight: 600,
//                 letterSpacing: 0.5,
//               }}
//             />
//           </ListItemButton>
//         ))}
        
//         <Box sx={{ mt: 'auto', px: 2, py: 3 }}>
//           <ListItemButton
//             onClick={logout}
//             sx={{
//               borderRadius: 3,
//               transition: 'all 0.3s ease',
//               '&:hover': {
//                 background: `linear-gradient(135deg, ${alpha('#ef4444', 0.1)} 0%, ${alpha('#dc2626', 0.1)} 100%)`,
//                 transform: 'translateX(5px)',
//               }
//             }}
//           >
//             <LogoutIcon sx={{ mr: 2, color: '#ef4444', fontSize: 24 }} />
//             <ListItemText primary="Logout" primaryTypographyProps={{ color: '#ef4444', fontWeight: 600 }} />
//           </ListItemButton>
//         </Box>
//       </List>
//     </Box>
//   );

//   return (
//     <Box sx={{ display: "flex", backgroundColor: '#f8fafc', minHeight: '100vh' }}>
//       {/* Mobile drawer */}
//       <Drawer
//         variant="temporary"
//         open={mobileOpen}
//         onClose={handleDrawerToggle}
//         ModalProps={{ keepMounted: true }}
//         sx={{
//           display: { xs: 'block', md: 'none' },
//           '& .MuiDrawer-paper': {
//             width: drawerWidth,
//             boxShadow: '0 20px 60px rgba(0,0,0,0.3)',
//             backdropFilter: 'blur(20px)',
//           },
//         }}
//       >
//         {drawer}
//       </Drawer>

//       {/* Permanent drawer for desktop */}
//       <Drawer
//         variant="permanent"
//         sx={{
//           display: { xs: 'none', md: 'block' },
//           width: drawerWidth,
//           [`& .MuiDrawer-paper`]: {
//             width: drawerWidth,
//             boxSizing: 'border-box',
//             borderRight: 'none',
//             background: 'rgba(255, 255, 255, 0.95)',
//             backdropFilter: 'blur(20px)',
//           },
//         }}
//       >
//         {drawer}
//       </Drawer>

//       {/* Main content */}
//       <Box component="main" sx={{ flexGrow: 1, overflow: 'auto' }}>
//         <AppBar
//           position="fixed"
//           sx={{
//             ml: { md: `${drawerWidth}px` },
//             width: { md: `calc(100% - ${drawerWidth}px)` },
//             background: 'linear-gradient(135deg, rgba(255,255,255,0.95) 0%, rgba(248,250,252,0.95) 100%)',
//             backdropFilter: 'blur(20px)',
//             boxShadow: '0 8px 32px rgba(0,0,0,0.1)',
//             borderBottom: '1px solid rgba(255,255,255,0.2)',
//             transition: 'all 0.3s ease',
//           }}
//         >
//           <Toolbar sx={{ 
//             display: 'flex', 
//             justifyContent: { xs: 'space-between', md: 'flex-end' },
//             minHeight: 70,
//             px: 3
//           }}>
//             <Box sx={{ display: { xs: 'flex', md: 'none' }, mr: 'auto' }}>
//               <IconButton
//                 color="inherit"
//                 onClick={handleDrawerToggle}
//                 sx={{
//                   background: alpha('#667eea', 0.1),
//                   '&:hover': { background: alpha('#667eea', 0.2) }
//                 }}
//               >
//                 <MenuIcon />
//               </IconButton>
//             </Box>
            
//             <Typography
//               variant="h6"
//               sx={{
//                 display: { xs: 'none', md: 'block' },
//                 fontWeight: 700,
//                 background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
//                 WebkitBackgroundClip: 'text',
//                 backgroundClip: 'text',
//                 WebkitTextFillColor: 'transparent',
//                 mr: 'auto'
//               }}
//             >
//               Admin Panel
//             </Typography>
            
//             <Button
//               onClick={logout}
//               sx={{
//                 borderRadius: 25,
//                 px: 3,
//                 py: 1,
//                 fontWeight: 600,
//                 background: 'linear-gradient(135deg, #ef4444 0%, #dc2626 100%)',
//                 color: 'white',
//                 boxShadow: '0 4px 15px rgba(239,68,68,0.4)',
//                 transition: 'all 0.3s cubic-bezier(0.4, 0, 0.2, 1)',
//                 '&:hover': {
//                   transform: 'translateY(-2px)',
//                   boxShadow: '0 8px 25px rgba(239,68,68,0.6)',
//                   background: 'linear-gradient(135deg, #dc2626 0%, #b91c1c 100%)',
//                 }
//               }}
//               endIcon={<LogoutIcon />}
//             >
//               Logout
//             </Button>
//           </Toolbar>
//         </AppBar>

//         <Box
//           component="main"
//           sx={{
//             mt: { xs: '70px', md: '70px' },
//             ml: { md: `${drawerWidth}px` },
//             p: { xs: 2, md: 4 },
//             minHeight: 'calc(100vh - 70px)',
//             transition: 'all 0.3s ease',
//           }}
//         >
//           <Outlet />
//         </Box>
//       </Box>

//       <style jsx global>{`
//         @keyframes slideInRight {
//           to {
//             opacity: 1;
//             transform: translateX(0);
//           }
//         }
        
//         @media (prefers-reduced-motion: reduce) {
//           * {
//             animation-duration: 0.01ms !important;
//             animation-iteration-count: 1 !important;
//             transition-duration: 0.01ms !important;
//           }
//         }
//       `}</style>
//     </Box>
//   );
// };

// export default AdminLayout;

import React from "react";
import {
  AppBar,
  Toolbar,
  Typography,
  Drawer,
  List,
  ListItemButton,
  ListItemText,
  Box,
  IconButton,
  useTheme,
  useMediaQuery,
  Avatar,
  
} from "@mui/material";
import Logs from '@mui/icons-material/Article';

import {
  Menu as MenuIcon,
  Dashboard as DashboardIcon,
  Book as BookIcon,
  Build as BuildIcon,
  Image as ImageIcon,
  ContactPhone as ContactIcon,
  Logout as LogoutIcon,
  WaterDrop as WaterDropIcon,
  Collections as CollectionsIcon,
  ReviewsRounded as ReviewsRoundedIcon
} from "@mui/icons-material";

import { Outlet, useLocation, useNavigate } from "react-router-dom";
import { useAdminAuth } from "../Context/Admin_AuthContext";
import { alpha } from "@mui/material/styles";

const drawerWidth = 280;

const AdminLayout = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const { logout } = useAdminAuth();
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down('md'));
  const [mobileOpen, setMobileOpen] = React.useState(false);

  const menuItems = [
    { label: "Dashboard", path: "/admin/dashboard", icon: DashboardIcon },
    { label: "Bookings", path: "/admin/bookings", icon: BookIcon },
    { label: "Services", path: "/admin/services", icon: BuildIcon },
    { label: "Carousel", path: "/admin/Carousel", icon: ImageIcon },
    { label: "Gallery", path: "/admin/Gallery", icon: CollectionsIcon },
    { label: "Inquiry", path: "/admin/Contacts", icon: ContactIcon },
    { label: "Blogs", path: "/admin/Blogs", icon: Logs },
    { label: "Review", path: "/admin/testimonial", icon: ReviewsRoundedIcon  },
  ];

  const handleDrawerToggle = () => {
    setMobileOpen(!mobileOpen);
  };

  const drawer = (
    <Box 
      sx={{ 
        height: '100%',
        display: 'flex',
        flexDirection: 'column',
        background: 'linear-gradient(180deg, #0f172a 0%, #1e293b 100%)',
        position: 'relative',
        overflow: 'hidden',
        '&::before': {
          content: '""',
          position: 'absolute',
          top: 0,
          left: 0,
          right: 0,
          height: '200px',
          background: 'radial-gradient(circle at top, rgba(99, 102, 241, 0.15) 0%, transparent 70%)',
          pointerEvents: 'none',
        }
      }}
    >
      {/* Logo Section */}
      <Box sx={{ 
        p: 4, 
        pb: 3,
        position: 'relative',
        zIndex: 1,
        animation: 'fadeIn 0.8s ease-out'
      }}>
        <Box sx={{ 
          display: 'flex', 
          alignItems: 'center', 
          gap: 2,
          mb: 1
        }}>
          <Box sx={{
            width: 48,
            height: 48,
            borderRadius: '14px',
            background: 'linear-gradient(135deg, #6366f1 0%, #8b5cf6 100%)',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            boxShadow: '0 8px 24px rgba(99, 102, 241, 0.4)',
            position: 'relative',
            animation: 'float 3s ease-in-out infinite',
            '&::after': {
              content: '""',
              position: 'absolute',
              inset: -2,
              borderRadius: '16px',
              padding: '2px',
              background: 'linear-gradient(135deg, #6366f1, #8b5cf6)',
              WebkitMask: 'linear-gradient(#fff 0 0) content-box, linear-gradient(#fff 0 0)',
              WebkitMaskComposite: 'xor',
              maskComposite: 'exclude',
              opacity: 0.6,
            }
          }}>
            <WaterDropIcon sx={{ color: 'white', fontSize: 28 }} />
          </Box>
          <Box>
            <Typography
              variant="h5"
              sx={{
                fontWeight: 800,
                color: 'white',
                letterSpacing: '0.5px',
              }}
            >
              PlumbGo
            </Typography>
            <Typography
              variant="caption"
              sx={{
                color: 'rgba(255,255,255,0.5)',
                fontWeight: 500,
                textTransform: 'uppercase',
                letterSpacing: '1px',
                fontSize: '0.7rem'
              }}
            >
              Admin Panel
            </Typography>
          </Box>
        </Box>
      </Box>
      
      {/* Navigation Menu */}
      <List sx={{ px: 2.5, flex: 1, position: 'relative', zIndex: 1 }}>
        {menuItems.map((item, index) => (
          <ListItemButton
            key={item.path}
            selected={location.pathname === item.path}
            onClick={() => {
              navigate(item.path);
              if (isMobile) setMobileOpen(false);
            }}
            sx={{
              mb: 1,
              borderRadius: 3,
              transition: 'all 0.4s cubic-bezier(0.34, 1.56, 0.64, 1)',
              position: 'relative',
              opacity: 0,
              transform: 'translateX(-30px)',
              animation: `slideInLeft 0.6s cubic-bezier(0.34, 1.56, 0.64, 1) ${index * 0.1 + 0.3}s both`,
              overflow: 'hidden',
              '&::before': {
                content: '""',
                position: 'absolute',
                left: 0,
                top: 0,
                bottom: 0,
                width: '4px',
                background: 'linear-gradient(180deg, #6366f1 0%, #8b5cf6 100%)',
                opacity: location.pathname === item.path ? 1 : 0,
                transition: 'opacity 0.3s ease',
              },
              '&:hover': {
                transform: 'translateX(8px)',
                background: 'rgba(99, 102, 241, 0.1)',
                '&::before': {
                  opacity: 1,
                },
                '& .menu-icon': {
                  transform: 'scale(1.1) rotate(-5deg)',
                  color: '#6366f1',
                }
              },
              '&.Mui-selected': {
                background: 'rgba(99, 102, 241, 0.15)',
                boxShadow: '0 4px 20px rgba(99, 102, 241, 0.2)',
                '&:hover': {
                  background: 'rgba(99, 102, 241, 0.2)',
                }
              }
            }}
          >
            <Box
              className="menu-icon"
              sx={{
                mr: 2,
                width: 40,
                height: 40,
                borderRadius: 2,
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                background: location.pathname === item.path 
                  ? 'linear-gradient(135deg, #6366f1 0%, #8b5cf6 100%)'
                  : 'rgba(255, 255, 255, 0.05)',
                transition: 'all 0.4s cubic-bezier(0.34, 1.56, 0.64, 1)',
              }}
            >
              <item.icon 
                sx={{ 
                  fontSize: 20,
                  color: location.pathname === item.path ? 'white' : 'rgba(255,255,255,0.6)',
                  transition: 'all 0.3s ease',
                }} 
              />
            </Box>
            <ListItemText 
              primary={item.label}
              primaryTypographyProps={{
                fontWeight: 600,
                fontSize: '0.95rem',
                color: location.pathname === item.path ? 'white' : 'rgba(255,255,255,0.7)',
                transition: 'color 0.3s ease',
              }}
            />
          </ListItemButton>
        ))}
      </List>
      
      {/* Logout Button */}
      <Box sx={{ p: 2.5, borderTop: '1px solid rgba(255,255,255,0.05)', position: 'relative', zIndex: 1 }}>
        <ListItemButton
          onClick={logout}
          sx={{
            borderRadius: 3,
            background: 'rgba(239, 68, 68, 0.1)',
            border: '1px solid rgba(239, 68, 68, 0.2)',
            transition: 'all 0.4s cubic-bezier(0.34, 1.56, 0.64, 1)',
            animation: 'fadeIn 1s ease-out 0.8s both',
            '&:hover': {
              background: 'rgba(239, 68, 68, 0.2)',
              transform: 'translateY(-3px)',
              boxShadow: '0 8px 24px rgba(239, 68, 68, 0.3)',
              borderColor: 'rgba(239, 68, 68, 0.4)',
              '& .logout-icon': {
                transform: 'scale(1.15) rotate(15deg)',
              }
            }
          }}
        >
          <Box
            className="logout-icon"
            sx={{
              mr: 2,
              width: 40,
              height: 40,
              borderRadius: 2,
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              background: 'rgba(239, 68, 68, 0.2)',
              transition: 'all 0.4s cubic-bezier(0.34, 1.56, 0.64, 1)',
            }}
          >
            <LogoutIcon sx={{ fontSize: 20, color: '#ef4444' }} />
          </Box>
          <ListItemText 
            primary="Logout" 
            primaryTypographyProps={{ 
              color: '#ef4444', 
              fontWeight: 700,
              fontSize: '0.95rem'
            }} 
          />
        </ListItemButton>
      </Box>
    </Box>
  );

  return (
    <Box sx={{ display: "flex", minHeight: '100vh', background: '#f1f5f9' }}>
      {/* Mobile drawer */}
      <Drawer
        variant="temporary"
        open={mobileOpen}
        onClose={handleDrawerToggle}
        ModalProps={{ keepMounted: true }}
        sx={{
          display: { xs: 'block', md: 'none' },
          '& .MuiDrawer-paper': {
            width: drawerWidth,
            boxShadow: '0 20px 60px rgba(0,0,0,0.4)',
            border: 'none',
          },
        }}
      >
        {drawer}
      </Drawer>

      {/* Permanent drawer for desktop */}
      <Drawer
        variant="permanent"
        sx={{
          display: { xs: 'none', md: 'block' },
          width: drawerWidth,
          flexShrink: 0,
          [`& .MuiDrawer-paper`]: {
            width: drawerWidth,
            boxSizing: 'border-box',
            border: 'none',
            boxShadow: '4px 0 24px rgba(0,0,0,0.12)',
          },
        }}
      >
        {drawer}
      </Drawer>

      {/* Main content */}
      <Box sx={{ flexGrow: 1, display: 'flex', flexDirection: 'column', width: '100%' }}>
        <AppBar
          position="fixed"
          sx={{
            ml: { md: `${drawerWidth}px` },
            width: { md: `calc(100% - ${drawerWidth}px)` },
            background: 'rgba(255, 255, 255, 0.8)',
            backdropFilter: 'blur(20px)',
            boxShadow: '0 1px 3px rgba(0,0,0,0.08)',
            borderBottom: '1px solid rgba(0,0,0,0.06)',
          }}
        >
          <Toolbar sx={{ 
            minHeight: { xs: 64, md: 72 },
            px: { xs: 2, md: 4 },
            justifyContent: 'space-between',
          }}>
            {/* Mobile menu button */}
            <IconButton
              color="inherit"
              onClick={handleDrawerToggle}
              sx={{
                display: { xs: 'flex', md: 'none' },
                background: 'linear-gradient(135deg, #6366f1 0%, #8b5cf6 100%)',
                color: 'white',
                width: 44,
                height: 44,
                boxShadow: '0 4px 14px rgba(99, 102, 241, 0.4)',
                '&:hover': {
                  background: 'linear-gradient(135deg, #4f46e5 0%, #7c3aed 100%)',
                  transform: 'scale(1.05)',
                }
              }}
            >
              <MenuIcon />
            </IconButton>
            
            {/* Page title - shows on desktop */}
            <Typography
              variant="h6"
              sx={{
                display: { marginLeft:'10', md: 'block' },
                fontWeight: 700,
                color: '#0f172a',
                letterSpacing: '0.3px',
              }}
            >
              Welcome Back, Admin
            </Typography>
            
            {/* Mobile title */}
            <Typography
              variant="h6"
              sx={{
                display: { xs: 'block', md: 'none' },
                fontWeight: 700,
                color: '#0f172a',
                ml: 2,
              }}
            >
              PlumbGo
            </Typography>
            
            {/* User avatar with admin indicator */}
            <Box sx={{ display: 'flex', alignItems: 'center', gap: 2 }}>
              <Box sx={{ 
                display: { xs: 'none', sm: 'flex' },
                flexDirection: 'column',
                alignItems: 'flex-end',
              }}>
                <Typography variant="body2" sx={{ fontWeight: 600, color: '#0f172a', lineHeight: 1.2 }}>
                  Administrator
                </Typography>
                <Typography variant="caption" sx={{ color: '#64748b' }}>
                  Online
                </Typography>
              </Box>
              <Avatar
                sx={{
                  width: 44,
                  height: 44,
                  background: 'linear-gradient(135deg, #6366f1 0%, #8b5cf6 100%)',
                  boxShadow: '0 4px 14px rgba(99, 102, 241, 0.3)',
                  fontWeight: 700,
                  fontSize: '1.1rem',
                  border: '2px solid white',
                }}
              >
                A
              </Avatar>
            </Box>
          </Toolbar>
        </AppBar>

        <Box
          component="main"
          sx={{
            flexGrow: 1,
            mt: { xs: '64px', md: '72px' },
            p: 0,
            minHeight: 'calc(100vh - 72px)',
          }}
        >
          <Outlet />
        </Box>
      </Box>

      <style jsx global>{`
        @keyframes slideInLeft {
          to {
            opacity: 1;
            transform: translateX(0);
          }
        }
        
        @keyframes fadeIn {
          from {
            opacity: 0;
          }
          to {
            opacity: 1;
          }
        }
        
        @keyframes float {
          0%, 100% {
            transform: translateY(0px);
          }
          50% {
            transform: translateY(-8px);
          }
        }
        
        @media (prefers-reduced-motion: reduce) {
          * {
            animation-duration: 0.01ms !important;
            animation-iteration-count: 1 !important;
            transition-duration: 0.01ms !important;
          }
        }
      `}</style>
    </Box>
  );
};

export default AdminLayout;