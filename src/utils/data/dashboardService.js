import React from "react";
import { Image } from "antd";
const URL = "https://out-of-town.onrender.com/";

const DashboardService = ({ region, url }) => {
  return (
    <div>
      <Image
        className="d-service"
        src={`${URL}${region}`}
        alt={region?.title}
      />
    </div>
  );
};

export default DashboardService;
