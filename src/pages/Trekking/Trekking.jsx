import "./trekking.css";
import React, { useState, useEffect } from "react";
import { getRegion } from "../../utils/api/regionApi";
import ShowImage from "../../utils/data/showImage";
import { useNavigate } from "react-router-dom";

const Trekking = () => {
  const [state, setState] = useState({
    regions: [],
    error: null,
  });
  const navigate = useNavigate();
  const fetchRegions = () => {
    setState({ ...state, error: null });
    getRegion()
      .then(({ data }) => setState({ ...state, regions: data, error: null }))
      .catch({ ...state, error: null });
  };

  useEffect(() => {
    fetchRegions();
  }, []);

  return (
    <section className="trekking">
      <div className="container">
        <div className="heading">
          <h3>Regions</h3>
        </div>
        <h1
          style={{
            textAlign: "center",
            fontSize: "32px",
          }}
        >
          Select a Region
        </h1>
        <div className="trekking-grid">
          {state?.regions?.map((r) => {
            return (
              <>
                <div className="grid-details">
                  <ShowImage region={r?.image} url="uploads" />
                  <h1>{r?.title}</h1>
                  <p>{r?.description}</p>
                  <button
                    onClick={() => {
                      navigate("/trekking/subRegions");
                    }}
                    className="select-btn"
                  >
                    SELECT
                  </button>
                </div>
              </>
            );
          })}
        </div>

        <div className="package-list">
          <h1
            style={{
              textAlign: "center",
              fontSize: "32px",
            }}
          >
            Trekking Packing list
          </h1>
          <p>
            Following is suggested Packing list for trekking in Nepal. Clothing
            Backpacking Checklist is not intended to be a final and
            authoritative checklist. The following is a list of wear and
            accessories that we advise that you take with you. This is not
            intended to be a comprehensive clothing and gear list, rather it is
            intended to act as a reminder of those items that we feel are
            important for your comfort and convenience. However we recommend
            that you may have your own individual favorite for clothing which
            may be equally as suitable.
          </p>

          <div className="details">
            <span>Foot wear</span>
            <ol>
              <li>
                Walking boots with suitable ankle support that have been worn-in
                prior to the trek, and which are waterproof.
              </li>
              <li>
                Trainer or casual shoes, for trekking and/or for traveling.
              </li>
              <li>Warm socks for colder areas.</li>
              <li>Gaiters, in case of rain or snow.</li>
            </ol>
          </div>
          <div className="details">
            <span>Leg wear</span>
            <ol>
              <li>Loose, casual trousers for trekking.</li>
              <li>Thermal leggings for colder areas. </li>
              <li>Long skirt for women as an alternative to trousers.</li>
              <li>Waterproof trousers.</li>
            </ol>
          </div>
          <div className="details">
            <span>Body</span>
            <ol>
              <li>
                Selection of T-shirts, and long sleeved shirts, preferably not
                cotton.
              </li>
              <li>Thermal shirt for colder areas.</li>
              <li>Warm shirt, possibly fleece, for colder areas.</li>
              <li>Fleece jacket or warm wool jumper.</li>
              <li>
                Windproof, waterproof outer shell garment for higher altitudes.
              </li>
              <li>
                Down jacket (optional for cold nights and mornings; can be hired
                in Kathmandu cheaply).
              </li>
              <li>Head/HandsWool or fleece hat, or balaclava.</li>
              <li>Hat or cap for sun protection while trekking.</li>
              <li>Sunglasses or goggles</li>
              <li>Warm gloves.</li>
            </ol>
          </div>

          <div className="details">
            <span>Other items</span>
            <ol>
              <li>
                Strong rucksack or large hold all to be carried by porters.
              </li>
              <li>
                Day sack to carry valuables such as passport, cash, camera,
                travel documents personally.
              </li>
              <li>Long skirt for women as an alternative to trousers.</li>
              <li>
                Plastic bags or stuff sacks to store/separate trekking gear
                inside your main bag.
              </li>
              <li>
                One liter water bottle, Personal first aid kit to include
                essential items.
              </li>
              <li>4 Season sleeping bag, head lamp/torch.</li>
              <li>Camera and memory cards, charger, tripod if necessary.</li>
              <li>
                Large handkerchief/bandana for neck, towel and toiletries.
              </li>
              <li>Vacuum flask, a cup, portable spoon/fork and opener etc.</li>
              <li>Traveling multi-functional pocket knife.</li>
              <li>
                Optional items:Satellite Phone with GPS if you are trekking very
                high remote area
              </li>
              <li>
                Binocular, Books or an eBook, Altimeter, Compass, Playing cards,
                backgammon and chess set etc.
              </li>
            </ol>
          </div>

          <div className="details">
            <span>Recommended Mountaineering Kit</span>
            <ol>
              <li>
                In addition to the items mentioned above for trekking, the
                following is a list of the additional specialist items which are
                required for the trekking peaks.
              </li>
              <li>
                Plastic or leather mountaineering boots, with gaiters and
                crampons that have been tested for a good fit.
              </li>
              <li>
                And lastly, the most essential things that you must have with
                you are a sense of humor, an open mind, and an understanding
                that a trip to Nepal is an adventure to a land which is very
                different to your own country. Have a happy packing!
              </li>
            </ol>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Trekking;
