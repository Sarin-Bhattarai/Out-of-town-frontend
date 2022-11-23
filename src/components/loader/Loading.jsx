import { Row } from "antd";
import React from "react";
import "./loading.css";

export default function Loading() {
  return (
    <Row className="content-center">
      <div className="loading-spinner"></div>
    </Row>
  );
}
