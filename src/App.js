import React, { useState, useEffect } from "react";
import Faqs from "./pages/Faq/Faq";
import Navbar from "./components/header/Navbar";
import Home from "./pages/Home/Home";
import Contact from "./pages/Contact/Contact";
import OurTeam from "./pages/Our-Team/ourTeam";
import Trekking from "./pages/Trekking/Trekking";
import Dashboard from "./pages/Dashboard/Dashboard";
import Services from "./pages/Social-Services/Services";
import SubRegion from "./pages/subRegion/SubRegion";
import Further from "./pages/Further/Further";
import Other from "./pages/others/Other";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Footer from "./components/footer/Footer";

const App = () => {
  const [loading, setloading] = useState(undefined);
  const [completed, setcompleted] = useState(undefined);

  useEffect(() => {
    setTimeout(() => {
      setloading(true);
      setTimeout(() => {
        setcompleted(true);
      }, 1000);
    }, 2000);
  }, []);

  return (
    <>
      {!completed ? (
        <>
          {!loading ? (
            <div className="spinner">
              <span>Loading...</span>
              <div className="half-spinner"></div>
            </div>
          ) : (
            <div className="completed">&#x2713;</div>
          )}
        </>
      ) : (
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
                path="/trekking/subRegions"
                exact
                element={
                  <>
                    <Navbar />
                    <SubRegion />
                    <Footer />
                  </>
                }
              />
              <Route
                path="/trekking/subRegions/furtherDetails"
                exact
                element={
                  <>
                    <Navbar />
                    <Further />
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
              <Route
                path="/others"
                exact
                element={
                  <>
                    <Navbar />
                    <Other />
                    <Footer />
                  </>
                }
              />
              <Route path="/*" exact element={<Dashboard />} />
            </Routes>
          </Router>
        </>
      )}
    </>
  );
};

export default App;
