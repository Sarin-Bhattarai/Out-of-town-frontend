import "./navbar.css";
import React, { useState } from "react";
import { Link } from "react-router-dom";
import logo from "../../resources/images/logo.jpg";
import { MdOutlineMenu, MdOutlineClose } from "react-icons/md";

const Navbar = () => {
  const [sidebar, setSidebar] = useState(false);
  window.addEventListener("scroll", function () {
    const header = document.querySelector(".header");
    header.classList.toggle("active", window.scrollY > 150);
  });
  return (
    <>
      <header className="header">
        <div className="container flex">
          {/*  --------------logo--------------   */}
          <div className="logo">
            <a href="/">
              <img src={logo} alt="logo" />
            </a>
          </div>
          {/*  --------------nav--------------   */}
          <div className="nav">
            <ul
              className={sidebar ? "nav-links-sidebar" : "nav-links"}
              onClick={() => setSidebar(false)}
            >
              <li>
                <Link to="/">Home</Link>
              </li>
              <li>
                <Link to="/trekking">Trekking</Link>
              </li>
              <li>
                <Link to="/contact">Contact</Link>
              </li>
              <li>
                <Link to="/ourTeam">Our Team</Link>
              </li>
              <li>
                <Link to="/services">Social Services</Link>
              </li>
              <li>
                <Link to="/faq">Faqs</Link>
              </li>
            </ul>
          </div>
          <button
            className="navbar-items-icon"
            onClick={() => setSidebar(!sidebar)}
          >
            {sidebar ? <MdOutlineClose /> : <MdOutlineMenu />}
          </button>
        </div>
      </header>
    </>
  );
};

export default Navbar;
