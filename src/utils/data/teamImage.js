import React from "react";

const TeamImage = ({ region, url }) => {
  // console.log(region);
  return (
    <div className="teamImage">
      <img src={region} alt={region.title} />
    </div>
  );
};

export default TeamImage;
