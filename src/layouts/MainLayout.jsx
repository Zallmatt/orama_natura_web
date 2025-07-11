import React from "react";
import { Outlet } from "react-router-dom";
import Navbar from "../components/Layout/Navbar";
import Footer from "../components/Layout/Footer";

const MainLayout = () => (
  <div className="main-layout">
    <Navbar />
    <main className="main-content">
      <Outlet />
    </main>
    <Footer />
  </div>
);

export default MainLayout;
