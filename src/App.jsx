
import React from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";

import Navbar from "./components/navbar";
import Footer from "./components/footer";

import Home from "./pages/home";
import Login from "./pages/login";
import Register from "./pages/register";
import Dashboard from "./pages/dashboard";
import ReportLost from "./pages/reportlost";
import ReportFound from "./pages/reportfound";
import LostItems from "./pages/lostitems";
import FoundItems from "./pages/founditems";
import ItemDetails from "./pages/itemdetails";
import MyReports from "./pages/myreport";
import Profile from "./pages/profile";

function App() {
  return (
    <BrowserRouter>

      <Navbar />

      <main>
        <Routes>
          <Route path="/" element={<Home />} />

          <Route path="/login" element={<Login />} />

          <Route path="/register" element={<Register />} />

          <Route path="/dashboard" element={<Dashboard />} />

          <Route
            path="/report-lost"
            element={<ReportLost />}
          />

          <Route
            path="/report-found"
            element={<ReportFound />}
          />

          <Route
            path="/lost-items"
            element={<LostItems />}
          />

          <Route
            path="/found-items"
            element={<FoundItems />}
          />

          <Route
            path="/item/:id"
            element={<ItemDetails />}
          />

          <Route
            path="/my-reports"
            element={<MyReports />}
          />

          <Route
            path="/profile"
            element={<Profile />}
          />

        </Routes>
      </main>

      <Footer />

    </BrowserRouter>
  );
}

export default App;