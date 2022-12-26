import React from "react";
const URL = "http://localhost:4000/";

const ServiceImage = ({ region, url }) => {
  // console.log(region);
  return (
    <div className="serviceImage">
      <img src={`${URL}${region}`} alt={region?.title} />
    </div>
  );
};

export default ServiceImage;
