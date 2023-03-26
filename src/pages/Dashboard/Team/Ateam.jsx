import React, { useState, useEffect } from "react";
import Admin from "../../../resources/images/admin.jpg";
import {
  getTeams,
  postTeam,
  editTeam,
  deleteTeam,
} from "../../../utils/api/teamApi";
import TeamImage from "../../../utils/data/teamImage";
import {
  Row,
  Button,
  Modal,
  Table,
  message,
  Space,
  Input,
  Upload,
  Popconfirm,
} from "antd";
import { AiFillEdit, AiFillDelete, AiOutlineUpload } from "react-icons/ai";
import { useNavigate } from "react-router-dom";
const { TextArea } = Input;

const Ateam = () => {
  const navigate = useNavigate();
  const [state, setState] = useState({
    teams: [],
    error: null,
    newTeam: { id: "", name: "", role: "", image: null },
    modalVisible: false,
    updateLoading: false,
  });

  const [newImage, setNewImage] = useState(null);
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

  //create team process

  const handleChange = (name, value, isEdit) => {
    if (isEdit) {
      setNewImage(value);
      setState({
        ...state,
        error: null,
        teams: state?.teams?.map((team) => {
          if (team._id === state.newTeam.id) {
            setState({
              ...state,
              error: null,
              newTeam: { ...state.newTeam, [name]: value },
            });
            return team;
          } else {
            return team;
          }
        }),
      });
    } else {
      setState({
        ...state,
        error: null,
        newTeam: { ...state.newTeam, [name]: value },
      });
    }
  };

  const clickSubmit = async () => {
    const { name, role, image } = state.newTeam;
    try {
      const response = await postTeam(name, role, image);
      setState({
        ...state,
        newTeam: response?.data,
        error: null,
        modalVisible: false,
        teams: [...state.teams, response?.data],
      });
      message.success("Team member added");
    } catch (error) {
      setState({
        ...state,
        error: error,
        modalVisible: false,
      });
      message.error("Error adding member");
    }
  };

  //for edit team process

  const handleSubmit = (name, id, value) => {
    const newTeams = [...state.teams];
    const index = newTeams.findIndex((element) => element?._id === id);
    newTeams[index] = { ...newTeams[index], [name]: value }; //update the new value of element
    setState((prev) => {
      return { ...prev, teams: newTeams };
    });
  };

  const columns = [
    {
      title: "Id",
      dataIndex: "_id",
      key: "_id",
      render: (text) => <h4>{text}</h4>,
    },
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
    _id: item?._id,
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
