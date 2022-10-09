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
                  fontWeight: "500",
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
                    fontSize: "30px",
                  }}
                >
                  Travel with us to
                  <br /> the mountains.
                  <br /> Explore Hidden Beauty
                  <br /> of Nature.
                </h4>
                <p
                  style={{
                    textAlign: "justify",
                    lineHeight: "32px",
                    fontSize: "16px",
                  }}
                >
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
                    <p
                      style={{
                        color: "black",
                        lineHeight: "27px",
                        fontSize: "16px",
                      }}
                    >
                      Trekking could be a motive, It could be a commitment, an
                      aim, an objective, a mission, a party, a social gathering.
                      It could be a place where you find friends, and it could
                      be a journey.
                    </p>
                  </div>
                  <div className="sg-row">
                    <h3>Tour package</h3>
                    <p
                      style={{
                        color: "black",
                        lineHeight: "27px",
                        fontSize: "16px",
                      }}
                    >
                      An all-inclusive package offered by either a local
                      entrepreneur or a foreign tour operator consisting of,
                      amongst others, transport, accommodation, meals, guided
                      tours and excursions.
                    </p>
                  </div>
                </div>
                <div className="home-grid">
                  <div className="sg-row">
                    <h3>Hiking & Homestay</h3>
                    <p
                      style={{
                        color: "black",
                        lineHeight: "27px",
                        fontSize: "16px",
                      }}
                    >
                      All Nepal Hiking has explored some rare hiking routes
                      around the middle and western parts of Nepal. Our Chairman
                      has discovered some hidden villages with lots of tourist
                      potential.
                    </p>
                  </div>
                  <div className="sg-row">
                    <h3>Sightseeing</h3>
                    <p
                      style={{
                        color: "black",
                        lineHeight: "27px",
                        fontSize: "16px",
                      }}
                    >
                      As a broad definition, tourist attractions are those
                      places of culture, heritage, nature, or activities that
                      draw people to visit. We make sure that you have the best
                      view of every place you go.
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
