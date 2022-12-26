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
                    <ShowImage region={sr?.image?.[0]} url="uploads" />
                    <ShowImage region={sr?.image?.[1]} url="uploads" />
                    <ShowImage region={sr?.image?.[2]} url="uploads" />
                  </div>

                  <div className="region-row">
                    <div>
                      <h3
                        style={{
                          fontSize: "28px",
                          fontWeight: "400",
                          textDecoration: "underline",
                        }}
                      >
                        Including during the period
                      </h3>
                      <p>{sr?.includedetails}</p>
                    </div>
                    <div>
                      <h3
                        style={{
                          fontSize: "28px",
                          fontWeight: "400",
                          textDecoration: "underline",
                        }}
                      >
                        Cost excludes
                      </h3>
                      <p>{sr?.excludedetails}</p>
                    </div>
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
