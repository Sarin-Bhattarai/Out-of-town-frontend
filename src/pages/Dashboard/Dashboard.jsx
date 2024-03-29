import { Layout, Menu } from "antd";
import React, { useState } from "react";
import { Routes, Route, useNavigate } from "react-router-dom";
import {
  MdOutlineWindow,
  MdOutlineArrowForward,
  MdOutlineMyLocation,
  MdSportsKabaddi,
  MdConstruction,
  MdNature,
  MdReorder,
  MdVerified,
  MdAssistant,
  MdOutlineBuild,
} from "react-icons/md";
import HomeDesc from "./homeDesc/HomeDesc";
import Afaq from "./Faq/Afaq";
import Aregion from "./Region/Aregion";
import Ateam from "./Team/Ateam";
import Aservice from "./Service/Aservice";
import Asubregion from "./subRegion/Asubregion";
import Aother from "./Other/Aother";
import Afurther from "./FurtherDetails/Afurther";

const { Sider, Content } = Layout;
const Dashboard = () => {
  const navigate = useNavigate();
  const [collapsed, setCollapsed] = useState(false);

  const toggleCollapsed = () => {
    setCollapsed(!collapsed);
  };

  const items = [
    {
      key: "/api/dashboard/homeDesc",
      icon: <MdOutlineWindow />,
      label: "Home Description",
    },

    {
      key: "/api/dashboard/region",
      icon: <MdOutlineMyLocation />,
      label: "Trekking",
    },
    {
      key: "/api/dashboard/subRegion",
      icon: <MdNature />,
      label: "Sub Trek",
    },
    {
      key: "/api/dashboard/furtherDetails",
      icon: <MdAssistant />,
      label: "Itinary",
    },
    {
      key: "/api/dashboard/team",
      icon: <MdSportsKabaddi />,
      label: "Team",
    },
    {
      key: "/api/dashboard/services",
      icon: <MdConstruction />,
      label: "Social Services",
    },
    {
      key: "/api/dashboard/faq",
      icon: <MdOutlineArrowForward />,
      label: "Faq",
    },
    {
      key: "/api/dashboard/others",
      icon: <MdOutlineBuild />,
      label: "Other Services",
    },
  ];

  return (
    <Layout>
      <Sider
        collapsedWidth={80}
        trigger={null}
        collapsed={collapsed}
        collapsible
        width={220}
        className="sidebar"
      >
        <div>
          <div className="hammenu">
            <MdReorder size={25} onClick={toggleCollapsed} />
          </div>
          {!collapsed && (
            <>
              <div className="name-icon">
                <h1>
                  Admin
                  <MdVerified
                    style={{
                      color: "#1DA1F2",
                      marginLeft: "5px",
                    }}
                  />
                </h1>
              </div>
            </>
          )}
          <Menu
            className="side-nav"
            onClick={(e) => {
              navigate(e.key);
            }}
            items={items}
          />
        </div>
      </Sider>
      <Content className="main-content">
        <Routes>
          <Route path="/api/dashboard" element={<HomeDesc />} />
          <Route path="/api/dashboard/homeDesc" element={<HomeDesc />} />
          <Route path="/api/dashboard/faq" element={<Afaq />} />
          <Route path="/api/dashboard/region" element={<Aregion />} />
          <Route path="/api/dashboard/team" element={<Ateam />} />
          <Route path="/api/dashboard/services" element={<Aservice />} />
          <Route path="/api/dashboard/subRegion" element={<Asubregion />} />
          <Route path="/api/dashboard/furtherDetails" element={<Afurther />} />
          <Route path="/api/dashboard/others" element={<Aother />} />
        </Routes>
      </Content>
    </Layout>
  );
};

export default Dashboard;
