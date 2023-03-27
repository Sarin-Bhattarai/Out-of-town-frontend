import "./further.css";
import Faq from "react-faq-component";
import React, { useState, useEffect } from "react";
import { getFurther } from "../../utils/api/furtherApi";

const Further = () => {
  const [state, setState] = useState({
    furthers: [],
    error: null,
  });

  const fetchFurthers = () => {
    setState({ ...state, error: null });
    getFurther()
      .then(({ data }) => setState({ ...state, furthers: data, error: null }))
      .catch({ ...state, error: null });
  };

  useEffect(() => {
    fetchFurthers();
  }, []);

  const styles = {
    titleTextColor: "black",
    rowTitleColor: "black",
    bgColor: "azure",
    rowContentColor: "black",
    arrowColor: "black",
    transitionDuration: "0.8s",
  };

  const config = {
    animate: true,
    arrowIcon: "V",
    openOnload: 0,
    expandIcon: "+",
    collapseIcon: "-",
  };

  return (
    <section className="faq">
      <div className="container">
        <div className="heading">
          <h3>Details about trekking</h3>
        </div>
        {state?.furthers?.map((fu) => {
          const data = {
            rows: [
              {
                title: fu.subtitle,
                content: fu.description,
              },
            ],
          };
          return (
            <>
              <div className="faq-section">
                <h1
                  style={{
                    textAlign: "center",
                  }}
                >
                  {fu.title}
                </h1>
                <Faq data={data} styles={styles} config={config} />
              </div>
            </>
          );
        })}
      </div>
    </section>
  );
};

export default Further;
