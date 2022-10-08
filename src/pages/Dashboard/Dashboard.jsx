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
} from "react-icons/md";

const { Sider, Content } = Layout;
const Dashboard = () => {
  const navigate = useNavigate();
  const [collapsed, setCollapsed] = useState(false);

  const toggleCollapsed = () => {
    setCollapsed(!collapsed);
  };

  const items = [
    {
      key: "/dashboard/homeDesc",
      icon: <MdOutlineWindow />,
      label: "Home Description",
    },
    {
      key: "/dashboard/faq",
      icon: <MdOutlineArrowForward />,
      label: "Faq",
    },
    {
      key: "/dashboard/region",
      icon: <MdOutlineMyLocation />,
      label: "Region",
    },
    {
      key: "/dashboard/team",
      icon: <MdSportsKabaddi />,
      label: "Team",
    },
    {
      key: "/dashboard/services",
      icon: <MdConstruction />,
      label: "Services",
    },
    {
      key: "/dashboard/subRegion",
      icon: <MdNature />,
      label: "SubRegion",
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
          >
            <Menu.Item></Menu.Item>
          </Menu>
        </div>
      </Sider>
      <Content className="main-content">
        <Routes>
          <Route />
        </Routes>
      </Content>
    </Layout>
  );
};

export default Dashboard;
