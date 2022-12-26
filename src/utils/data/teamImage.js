import React from "react";
const URL = "http://localhost:4000/";

const TeamImage = ({ region, url }) => {
  // console.log(region);
  return (
    <div className="teamImage">
      <img src={`${URL}${region}`} alt={region.title} />
    </div>
  );
};

export default TeamImage;
