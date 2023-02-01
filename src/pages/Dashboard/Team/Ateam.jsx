import React, { useState, useEffect } from "react";
import Admin from "../../../resources/images/admin.jpg";
import { getTeams } from "../../../utils/api/teamApi";
import TeamImage from "../../../utils/data/teamImage";
import { Row, Button, Modal, Table, message, Space, Input, Upload } from "antd";
import { AiFillEdit, AiFillDelete, AiOutlineUpload } from "react-icons/ai";
const { TextArea } = Input;

const Ateam = () => {
  const [state, setState] = useState({
    teams: [],
    error: null,
    modalVisible: false,
  });

  const [isModalOpen, setIsModalOpen] = useState(false);
  const showModal = () => {
    setIsModalOpen(true);
  };
  const handleOk = () => {
    setIsModalOpen(false);
  };
  const handleCancel = () => {
    setIsModalOpen(false);
  };

  const columns = [
    {
      title: "Name",
      dataIndex: "name",
      key: "name",
      render: (text) => <p className="dashboard-paragraph">{text}</p>,
    },
    {
      title: "Role",
      dataIndex: "role",
      key: "role",
      render: (text) => <p className="dashboard-paragraph">{text}</p>,
    },

    {
      title: "Image",
      dataIndex: "image",
      key: "image",
      render: (image) => <div>{image}</div>,
    },

    {
      title: "Actions",
      dataIndex: "action",
      key: "action",
      render: (_) => (
        <Row
          style={{
            gap: "0.2rem",
          }}
        >
          <Space wrap>
            <Button
              style={{
                border: "none",
              }}
              onClick={() => setState({ ...state, modalVisible: true })}
            >
              <AiFillEdit
                style={{
                  color: "#4eae98",
                }}
                size={18}
              />
            </Button>
            <Modal
              title="Edit Team"
              okText="Edit"
              style={{ top: 20 }}
              visible={state.modalVisible}
              // okButtonProps={{ loading: state.updateLoading }}
              // onOk={(e) => {
              //   e.preventDefault();
              //   submitDesc();
              //   setState({ ...state, modalVisible: false });
              // }}
              onCancel={() => setState({ ...state, modalVisible: false })}
            >
              <form>
                <label>Name</label>
                <TextArea
                  rows={2}
                  value={state?.teams?.map((element) => element?.name)}
                  name="name"
                />
                <label>Role</label>
                <TextArea
                  rows={2}
                  // onChange={(e) =>
                  //   handleChange("description", e.target.value)
                  // }
                  value={state?.teams?.map((element) => element?.role)}
                  name="role"
                />
                <br />
                <br />
                <Upload>
                  <Button icon={<AiOutlineUpload />}>Click to Upload</Button>
                </Upload>
              </form>
            </Modal>
          </Space>

          <AiFillDelete
            style={{
              color: "#eb1d0f",
              marginLeft: "14px",
            }}
            size={18}
          />
        </Row>
      ),
    },
  ];

  const fetchTeams = () => {
    setState({ ...state, error: null });
    getTeams()
      .then(({ data }) => setState({ ...state, teams: data, error: null }))
      .catch({ ...state, error: null });
  };

  useEffect(() => {
    fetchTeams();
  }, []);

  const mappedData = state?.teams?.map((item) => ({
    name: item?.name,
    role: item?.role,
    image: <TeamImage region={item?.image} url="uploads" />,
  }));

  return (
    <section className="dashboard-container">
      <div className="mini-container">
        <div className="head-container">
          <div className="head-section">
            <h1>Team</h1>
          </div>
          <div className="profile-section">
            <h4>Bishow Raj Adhikari</h4>
            <img src={Admin} alt="profile" />
          </div>
        </div>
        <div
          style={{
            display: "flex",
            justifyContent: "space-between",
          }}
          className="content-container"
        >
          <h1>Action to your team-section</h1>
          <Button type="primary" onClick={showModal}>
            Add
          </Button>
          <Modal
            title="Add Team"
            open={isModalOpen}
            onOk={handleOk}
            onCancel={handleCancel}
          >
            <form>
              <label>Name</label>
              <TextArea rows={2} name="name" />
              <label>Role</label>
              <TextArea rows={2} name="role" />
              <br />
              <br />
              <label>Image</label>
              <br />
              <br />
              <Upload>
                <Button icon={<AiOutlineUpload />}>Click to Upload</Button>
              </Upload>
            </form>
          </Modal>
        </div>
      </div>
      <Table className="data-table" dataSource={mappedData} columns={columns} />
    </section>
  );
};

export default Ateam;
