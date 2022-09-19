import React from "react";
import "./footer.css";
import { FaMapMarkerAlt, FaEnvelope, FaPhoneAlt } from "react-icons/fa";
import moment from "moment";
import { Row } from "antd";
import logo from "../../resources/images/logo.jpg";
import logo1 from "../../resources/images/logo1.jpg";
import logo2 from "../../resources/images/logo2.jpg";
import logo3 from "../../resources/images/logo3.jpg";
import logo4 from "../../resources/images/logo4.png";
import logo5 from "../../resources/images/logo5.png";

const Footer = () => {
  return (
    <>
      <footer>
        <div className="container footer-grid">
          <div className="box">
            <img src={logo} alt="footerLogo" />
          </div>

          <div className="box">
            <div className="footer-info">
              <h2
                style={{
                  textDecoration: "underline",
                }}
              >
                Affiliated With
              </h2>
              <Row>
                <img src={logo1} alt="Affiliated Partners" />
                <img src={logo2} alt="Affiliated Partners" />
                <img src={logo3} alt="Affiliated Partners" />
                <img src={logo4} alt="Affiliated Partners" />
                <img src={logo5} alt="Affiliated Partners" />
              </Row>
            </div>
          </div>

          <div className="box">
            <p
              style={{
                fontSize: "20px",
                fontWeight: "bold",
              }}
            >
              “The world reveals itself to those who travel on foot.”
            </p>
            <div className="icon">
              <FaMapMarkerAlt className="ia" />
              <label>
                Location: Lakeside, 6 Pokhara, Khahare, Nahar Marga, Nepal
              </label>
            </div>
            <div className="icon">
              <FaPhoneAlt className="ia" />
              <label>Phone: +977-9825107555</label>
            </div>
            <div className="icon">
              <FaEnvelope className="ia" />
              <label>Email: bishow47@gmail.com</label>
            </div>
          </div>
        </div>

        <div className="legal container">
          <p>Copyright @ {moment().year()} All rights reserved.</p>
          <label>
            Design & Developed by <span>P & S</span>
          </label>
        </div>
      </footer>
    </>
  );
};

export default Footer;
