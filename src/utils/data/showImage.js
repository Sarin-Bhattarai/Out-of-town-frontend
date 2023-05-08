import React from "react";

const ShowImage = ({ region, url }) => {
  // console.log(region);
  return (
    <div className="showImage">
      <img src={region} alt={region?.title} />
    </div>
  );
};

export default ShowImage;
