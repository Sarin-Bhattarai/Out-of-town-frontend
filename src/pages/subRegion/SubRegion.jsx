import React, { useState, useEffect } from "react";
import "./subregion.css";
import { getSubRegion } from "../../utils/api/subregionApi";
import ShowImage from "../../utils/data/showImage";

const SubRegion = () => {
  const [state, setState] = useState({
    subRegions: [],
    error: null,
  });

  const fetchSubRegions = () => {
    setState({ ...state, error: null });
    getSubRegion()
      .then(({ data }) => setState({ ...state, subRegions: data, error: null }))
      .catch({ ...state, error: null });
  };

  useEffect(() => {
    fetchSubRegions();
  }, []);

  console.log(state);

  return (
    <section className="subregion">
      <div className="container">
        <div className="s-region">
          {state?.subRegions?.map((sr) => {
            return (
              <>
                <div className="subregion-grid">
                  <h1
                    style={{
                      textAlign: "center",
                      fontSize: "42px",
                    }}
                  >
                    {sr?.title}
                  </h1>
                  <p>{sr?.description}</p>
                  <div className="subregion-grid-img">
                    {/* <ShowImage region={sr?.image?.[0]} url="uploads" />
                    <ShowImage region={sr?.image?.[1]} url="uploads" />
                    <ShowImage region={sr?.image?.[2]} url="uploads" /> */}
                  </div>
                </div>
              </>
            );
          })}
        </div>
      </div>
    </section>
  );
};

export default SubRegion;
