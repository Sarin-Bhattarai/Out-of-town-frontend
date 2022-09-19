import "./home.css";
import React, { useState, useEffect } from "react";
import { getHomeDesc } from "../../utils/api/homeApi";
import banner from "../../resources/images/banner.jpg";

const Home = () => {
  const [state, setState] = useState({
    descs: [],
    error: null,
  });

  const fetchDescs = () => {
    setState({ ...state, error: null });
    getHomeDesc()
      .then(({ data }) => setState({ ...state, descs: data, error: null }))
      .catch({ ...state, error: null });
  };

  useEffect(() => {
    fetchDescs();
  }, []);

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
            <div className="home-second-details">
              {state.descs.map((p) => {
                return (
                  <div>
                    <p className="home-paragraph">{p.description}</p>
                  </div>
                );
              })}
            </div>
          </div>

          <div className="home-third topMargin">
            <div className="heading">
              <h3>Services</h3>
            </div>

            <div className="home-grid">
              <div className="box" id="box90">
                <h4
                  style={{
                    color: "white",
                  }}
                >
                  Travel with us to
                  <br /> the mountains.
                  <br /> Explore Hidden Beauty
                  <br /> of Nature.
                </h4>
                <p>
                  Nepal is a country of enchanting natural beauty with
                  mesmerizing views of the Himalayas where eight out of ten
                  highest peak on the Earth including Mount Everest (height:
                  8,848 metres above sea level). Out of Town Pvt. Ltd. is an
                  Organization started by a group of professional trekking and
                  tour guides. It has been offering trekking, tour package,
                  booking air ticket, hotel booking services, hiking,
                  sightseeing and homestay to our valuable guest. Our tour
                  packages incorporate full enjoyment when you receive our
                  services. The best services will be provided for your
                  beautiful vacation with us.
                </p>
              </div>
              <div className="box">
                <div className="home-grid">
                  <div className="sg-row">
                    <h3>Trekking</h3>
                    <p style={{ color: "black" }}>
                      Sample text. Click to select the textbox. Click again or
                      double click to start editing the text.
                    </p>
                  </div>
                  <div className="sg-row">
                    <h3>Tour package</h3>
                    <p style={{ color: "black" }}>
                      Sample text. Click to select the textbox. Click again or
                      double click to start editing the text.
                    </p>
                  </div>
                </div>
                <div className="home-grid">
                  <div className="sg-row">
                    <h3>Hiking & Homestay</h3>
                    <p style={{ color: "black" }}>
                      Sample text. Click to select the textbox. Click again or
                      double click to start editing the text.
                    </p>
                  </div>
                  <div className="sg-row">
                    <h3>Sightseeing</h3>
                    <p style={{ color: "black" }}>
                      Sample text. Click to select the textbox. Click again or
                      double click to start editing the text.
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
    </>
  );
};

export default Home;
