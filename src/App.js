import React from "react";
import Faqs from "./pages/Faq/Faq";
import Navbar from "./components/header/Navbar";
import Home from "./pages/Home/Home";
import Contact from "./pages/Contact/Contact";
import OurTeam from "./pages/Our-Team/ourTeam";
import Trekking from "./pages/Trekking/Trekking";
import Dashboard from "./pages/Dashboard/Dashboard";
import Services from "./pages/Social-Services/Services";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Footer from "./components/footer/Footer";

const App = () => {
  return (
    <>
      <Router>
        <Routes>
          <Route
            path="/"
            exact
            element={
              <>
                <Navbar />
                <Home />
                <Footer />
              </>
            }
          />
          <Route
            path="/trekking"
            exact
            element={
              <>
                <Navbar />
                <Trekking />
                <Footer />
              </>
            }
          />
          <Route
            path="/contact"
            exact
            element={
              <>
                <Navbar />
                <Contact />
                <Footer />
              </>
            }
          />
          <Route
            path="/ourTeam"
            exact
            element={
              <>
                <Navbar />
                <OurTeam />
                <Footer />
              </>
            }
          />
          <Route
            path="/services"
            exact
            element={
              <>
                <Navbar />
                <Services />
                <Footer />
              </>
            }
          />
          <Route
            path="/faq"
            exact
            element={
              <>
                <Navbar />
                <Faqs />
                <Footer />
              </>
            }
          />
          <Route path="/api/dashboard" exact element={<Dashboard />} />
        </Routes>
      </Router>
    </>
  );
};

export default App;
