import React, { useState, useEffect } from "react";
import "./services.css";
import { getServices } from "../../utils/api/serviceApi";
import ServiceImage from "../../utils/data/serviceImage";

const Services = () => {
  const [state, setState] = useState({
    services: [],
    error: null,
  });

  const fetchServices = () => {
    setState({ ...state, error: null });
    getServices()
      .then(({ data }) => setState({ ...state, services: data, error: null }))
      .catch({ ...state, error: null });
  };

  useEffect(() => {
    fetchServices();
  }, []);

  return (
    <section className="services">
      <div className="container">
        <div className="heading">
          <h3>Social Services</h3>
        </div>

        <div>
          {state?.services?.map((s) => {
            return (
              <>
                <div className="subregion-grid">
                  <h1
                    style={{
                      fontSize: "22px",
                    }}
                  >
                    {s?.title}
                  </h1>
                  <p>{s?.description}</p>
                  <div
                    className="subregion-grid-img"
                    style={{
                      marginTop: "10px",
                    }}
                  >
                    <ServiceImage region={s?.image?.[0]} url="uploads" />
                    <ServiceImage region={s?.image?.[1]} url="uploads" />
                    <ServiceImage region={s?.image?.[2]} url="uploads" />
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

export default Services;
