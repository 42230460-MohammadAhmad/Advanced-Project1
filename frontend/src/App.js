import React, { useContext } from "react";
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import Navbar from "./Components/Navbar";
import Footer from "./Components/Footer";

import Home from "./Pages/Home";
import About from "./Pages/About";
import Contact from "./Pages/Contact";
import Menu from "./Pages/Menu";
import Cart from "./Pages/Cart";
import OrderTracking from "./Pages/OrderTracking";
import Kitchen from "./Pages/Kitchen";
import Login from "./Pages/Login";

import { CartProvider } from "./Context/CartContext";
import { AuthProvider, AuthContext } from "./Context/AuthContext";

// Protected Route Component
const ProtectedRoute = ({ children, role }) => {
  const { currentUser } = useContext(AuthContext);
  if (!currentUser) return <Navigate to="/login" />;
  if (role && currentUser.role !== role) return <Navigate to="/" />;
  return children;
};

function App() {
  return (
    <BrowserRouter>
      <AuthProvider>
        <CartProvider>
          <div className="d-flex flex-column min-vh-100">
            <Navbar />
            <div className="flex-grow-1">
              <Routes>
                <Route path="/" element={<Home />} />
                <Route path="/about" element={<About />} />
                <Route path="/contact" element={<Contact />} />
                <Route path="/menu" element={<ProtectedRoute role="customer"><Menu /></ProtectedRoute>} />
                <Route path="/cart" element={<ProtectedRoute role="customer"><Cart /></ProtectedRoute>} />
                <Route path="/order-tracking" element={<ProtectedRoute role="customer"><OrderTracking /></ProtectedRoute>} />
                <Route path="/kitchen" element={<ProtectedRoute role="admin"><Kitchen /></ProtectedRoute>} />
                <Route path="/login" element={<Login />} />
              </Routes>
            </div>
            <Footer />
          </div>
        </CartProvider>
      </AuthProvider>
    </BrowserRouter>
  );
}

export default App;
