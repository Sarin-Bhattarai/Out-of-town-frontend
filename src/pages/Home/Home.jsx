import "./home.css";
import React from "react";
import banner from "../../resources/images/banner.jpg";

const Home = () => {
  return (
    <>
      <section className="home">
        <div className="container">
          <div className="home-grid">
            <div className="home-image">
              <img src={banner} alt="banner" />
            </div>
            <div className="home-image-details">
              <h4
                style={{
                  fontSize: "60px",
                  fontWeight: "bold",
                  marginBottom: "15px",
                }}
              >
                OUT OF TOWN
                <br /> ADVENTURE
              </h4>
              <h2
                style={{
                  marginBottom: "15px",
                  fontWeight: "600",
                }}
              >
                FLAT 10% OFF INSTANT <br /> DISCOUNT OFFER, HURRY UP!
              </h2>
              <p
                style={{
                  fontSize: "18px",
                  opacity: 0.8,
                }}
              >
                Trek, Expedition, Tours and ​Travel Agencgy authorized by
                Government of Nepal.
              </p>
            </div>
          </div>

          <div className="home-second topMargin">
            <div className="heading">
              <h3>About 'Out of Town'</h3>
            </div>
            <div className="home-second-details"></div>
          </div>
        </div>
      </section>
    </>
  );
};

export default Home;
