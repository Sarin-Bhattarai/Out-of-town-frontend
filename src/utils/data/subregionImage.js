import React from "react";
import { Image } from "antd";

const SubRegionImage = ({ region, url }) => {
  return (
    <div>
      <Image className="d-service" src={region} alt={region?.title} />
    </div>
  );
};

export default SubRegionImage;
