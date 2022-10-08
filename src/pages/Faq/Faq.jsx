import "./faq.css";
import Faq from "react-faq-component";
import { getFaq } from "../../utils/api/faqApi";
import React, { useState, useEffect } from "react";

const Faqs = () => {
  const [state, setState] = useState({
    faqs: [],
    error: null,
  });

  const fetchFaqs = () => {
    setState({ ...state, error: null });
    getFaq()
      .then(({ data }) => setState({ ...state, faqs: data, error: null }))
      .catch({ ...state, error: null });
  };

  useEffect(() => {
    fetchFaqs();
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
    <>
      <section className="faq">
        <div className="container">
          <div className="heading">
            <h3>Frequently Asked Questions</h3>
          </div>
          {state?.faqs?.map((f) => {
            const data = {
              rows: [
                {
                  title: f.title,
                  content: f.description,
                },
              ],
            };
            return (
              <>
                <div className="faq-section">
                  <Faq data={data} styles={styles} config={config} />
                </div>
              </>
            );
          })}
        </div>
      </section>
    </>
  );
};

export default Faqs;
