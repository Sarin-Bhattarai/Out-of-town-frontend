import React from "react";
const URL = "https://out-of-town.onrender.com/";

const TeamImage = ({ region, url }) => {
  // console.log(region);
  return (
    <div className="teamImage">
      <img src={`${URL}${region}`} alt={region.title} />
    </div>
  );
};

export default TeamImage;
