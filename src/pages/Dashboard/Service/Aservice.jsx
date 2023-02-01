import React from "react";
import Admin from "../../../resources/images/admin.jpg";

const Aservice = () => {
  return (
    <section className="dashboard-container">
      <div className="mini-container">
        <div className="head-container">
          <div className="head-section">
            <h1>Service</h1>
          </div>
          <div className="profile-section">
            <h4>Bishow Raj Adhikari</h4>
            <img src={Admin} alt="profile" />
          </div>
        </div>
        <div className="content-container">
          <h1>Action to your service-section</h1>
        </div>
      </div>
    </section>
  );
};

export default Aservice;
