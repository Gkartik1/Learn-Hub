// // src/App.jsx
// import { Routes, Route } from 'react-router-dom';
// import Navbar from './components/Navbar';
// import Footer from './components/Footer';
// import Landing from './pages/Landing';
// import Login from './pages/Login';
// import Register from './pages/Register';
// import DashboardStudent from './pages/DashboardStudent';
// import DashboardAdmin from './pages/DashboardAdmin';
// import Materials from './pages/Materials';
// import Roadmaps from './pages/Roadmaps';
// import Profile from './pages/Profile';
// import ManageUsers from './pages/ManageUsers';
// import Announcements from './pages/Announcements';
// import Blog from './pages/Blog';
// import Payment from './pages/Payment';
// import NotFound from './pages/NotFound';
// import ProtectedRoute from './components/ProtectedRoute';
// import { useAuth } from './context/AuthContext';

// import Community from "./pages/Community";
// import Resources from "./pages/Resources";




// function App() {
//   const { user } = useAuth();

//   return (
//     <div>
//       <Navbar />
//         <Routes>
//           <Route path="/" element={<Landing />} />
//           <Route path="/login" element={<Login />} />
//           <Route path="/register" element={<Register />} />

//           {/* Protected Routes */}
//           <Route path="/dashboard" element={
//             <ProtectedRoute role="student">
//               <DashboardStudent />
//             </ProtectedRoute>
//           } />

//           <Route path="/admin" element={
//             <ProtectedRoute role="admin">
//               <DashboardAdmin />
//             </ProtectedRoute>
//           } />

//           <Route path="/admin/users" element={
//             <ProtectedRoute role="admin">
//               <ManageUsers />
//             </ProtectedRoute>
//           } />

//           {/* Accessible to all logged-in users or public if needed */}
//           <Route path="/materials" element={<Materials />} />
//           <Route path="/roadmaps" element={<Roadmaps />} />
//           <Route path="/profile" element={<Profile />} />
//           <Route path="/announcements" element={<Announcements />} />
//           <Route path="/blog" element={<Blog />} />
//           <Route path="/payment" element={<Payment />} />
//           <Route path="/community" element={<Community />} />
//   <Route path="/resources" element={<Resources />} />


 

//           {/* 404 Fallback */}
//           <Route path="*" element={<NotFound />} />



//         </Routes>
//       <Footer />
//     </div>
//   );
// }

// export default App;




// src/App.jsx
// src/App.jsx


import { Routes, Route } from 'react-router-dom';

import Navbar from './components/Navbar';
import Footer from './components/Footer';
import Notifications from './components/Notifications';
// import Onboarding from './components/Onboarding';

import Landing from './pages/Landing';
import Login from './pages/Login';
import Register from './pages/Register';
import DashboardStudent from './pages/DashboardStudent';
import DashboardAdmin from './pages/DashboardAdmin';
import Materials from './pages/Materials';
import Roadmaps from './pages/Roadmaps';
import Profile from './pages/Profile';
import ManageUsers from './pages/ManageUsers';
import Announcements from './pages/Announcements';
import Blog from './pages/Blog';
import Payment from './pages/Payment';
import Community from './pages/Community';
import Resources from './pages/Resources';
import AdminUpload from './pages/AdminUpload';
import NotFound from './pages/NotFound';


import ProtectedRoute from './components/ProtectedRoute';
import { useAuth } from './context/AuthContext';
// import "./styles/App.css";
// import 'bootstrap/dist/css/bootstrap.min.css';

import PrivacyPolicy from "./pages/PrivacyPolicy"; // 1. IMPORT THE NEW COMPONENT
// import TermsOfService from "./pages/TermsOfService";

function App() {
  const { user } = useAuth();

  return (
    <div className="app-container">
      <Navbar />
      <Notifications />
      {/* <Onboarding /> */}

      <Routes>
        {/* Public Routes */}
        <Route path="/" element={<Landing />} />
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />

        {/* Protected Routes for Students */}
        <Route
          path="/dashboard"
          element={
            <ProtectedRoute role="student">
              <DashboardStudent />
            </ProtectedRoute>
          }
        />

        {/* Protected Routes for Admins */}
        <Route
          path="/admin"
          element={
            <ProtectedRoute role="admin">
              <DashboardAdmin />
            </ProtectedRoute>
          }
        />
        <Route
          path="/admin/users"
          element={
            <ProtectedRoute role="admin">
              <ManageUsers />
            </ProtectedRoute>
          }
        />
        <Route
          path="/admin/upload"
          element={
            <ProtectedRoute role="admin">
              <AdminUpload />
            </ProtectedRoute>
          }
        />

        {/* Routes accessible to logged-in users or public */}
        <Route path="/materials" element={<Materials />} />
        <Route path="/roadmaps" element={<Roadmaps />} />
        <Route path="/profile" element={<Profile />} />
        <Route path="/announcements" element={<Announcements />} />
        <Route path="/blog" element={<Blog />} />
         <Route path="/blog/:postId" element={<Blog />} />
        <Route path="/payment" element={<Payment />} />
        <Route path="/community" element={<Community />} />
        <Route path="/resources" element={<Resources />} />
        <Route path="/payment" element={<Payment />} />
        <Route path="/privacy-policy" element={<PrivacyPolicy />} />
       

        {/* 404 Not Found */}
        <Route path="*" element={<NotFound />} />
      </Routes>

      <Footer />
    </div>
  );
}

export default App;