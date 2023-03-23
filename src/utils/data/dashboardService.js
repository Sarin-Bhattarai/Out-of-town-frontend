import React from "react";
import { Image } from "antd";
const URL = "http://localhost:4000/";

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
