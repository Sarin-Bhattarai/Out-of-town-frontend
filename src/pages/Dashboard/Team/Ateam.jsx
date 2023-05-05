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
  const handleOk = (e) => {
    e.preventDefault();
    setState({ ...state }, clickSubmit());
    setIsModalOpen(false);
  };
  const handleCancel = () => {
    setState({ ...state, newTeam: "" });
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

  const handleEditImageUpload = (id, name, role, image) => {
    setState({ ...state, updateLoading: true });
    editTeam(id, name, role, image)
      .then((response) => {
        const updatedTeams = state?.teams?.map((team) => {
          if (team._id === id) {
            return response?.data;
          } else {
            return team;
          }
        });
        setState({
          ...state,
          teams: updatedTeams,
          updateLoading: false,
          modalVisible: false,
          newTeam: {}, // reset the newTeam object in state
        });
        message.success("Successfully updated team");
        setTimeout(() => {
          navigate("/api/dashboard");
        }, 1000);
      })
      .catch((error) => {
        setState({ ...state, updateLoading: false });
        message.error(error?.message || "Error updating team");
      });
  };

  //for delete process
  const confirm = (id) => {
    deleteTeam(id)
      .then((team) => {
        message.success("Team deleted");
        setTimeout(() => {
          navigate("/api/dashboard");
        }, 1000);
      })
      .catch((error) => {
        setState({ ...state, error: error, loading: false });
        message.error(error?.message || "Error deleting team");
      });
  };
  const cancel = (e) => {
    console.log(e);
    message.error("Delete cancelled");
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
      render: (_, _id) => (
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
              onClick={() =>
                setState({
                  ...state,
                  newTeam: {
                    ...state.newTeam,
                    id: _id._id,
                  },
                  modalVisible: {
                    ...state.modalVisible,
                    [_id._id]: true,
                  },
                })
              }
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
              visible={state.modalVisible[_id._id]}
              okButtonProps={{ loading: state.updateLoading }}
              onOk={(e) => {
                e.preventDefault();
                const team = state?.teams?.find((el) => el._id === _id._id);
                const { name, role, image } = team;
                handleEditImageUpload(_id._id, name, role, newImage);
                setState({ ...state, modalVisible: false });
              }}
              onCancel={() => setState({ ...state, modalVisible: false })}
            >
              <form>
                <label>Name</label>
                <TextArea
                  rows={2}
                  onChange={(e) =>
                    handleSubmit("name", _id._id, e.target.value)
                  }
                  value={
                    state?.teams?.find((el) => el._id === _id._id)?.name || ""
                  }
                  name="name"
                />
                <label>Role</label>
                <TextArea
                  rows={2}
                  onChange={(e) => {
                    handleSubmit("role", _id._id, e.target.value);
                  }}
                  value={
                    state?.teams?.find((el) => el._id === _id._id)?.role || ""
                  }
                  name="role"
                />
                <br />
                <br />
                <Upload
                  accept="image/*"
                  beforeUpload={(file) => {
                    handleChange("image", file, true);
                    return false; // prevent Ant Design from automatically uploading the file
                  }}
                  fileList={state?.teams
                    ?.filter((team) => team._id === _id._id)
                    ?.map((team) =>
                      team?.image
                        ? {
                            uid: team._id,
                            name: team?.name,
                            status: "done",
                            url: team?.image,
                          }
                        : null
                    )
                    .filter((team) => team !== null)}
                  name="image"
                >
                  <Button icon={<AiOutlineUpload />}>Click to Upload</Button>
                </Upload>
              </form>
            </Modal>
          </Space>
          <Popconfirm
            title="Delete team member"
            description="Are you sure to delete team member?"
            onConfirm={() => confirm(_id._id)}
            onCancel={cancel}
            okText="Yes"
            cancelText="No"
          >
            <AiFillDelete
              style={{
                color: "#eb1d0f",
                marginLeft: "15px",
              }}
              size={18}
            />
          </Popconfirm>
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
              <TextArea
                type="text"
                placeholder="Member name"
                onChange={(e) => handleChange("name", e.target.value)}
                value={state.newTeam.name}
                required
                rows={2}
                name="name"
              />
              <label>Role</label>
              <TextArea
                type="text"
                placeholder="Member role"
                onChange={(e) => handleChange("role", e.target.value)}
                value={state.newTeam.role}
                required
                rows={2}
                name="role"
              />
              <br />
              <br />
              <label>Image</label>
              <br />
              <br />
              <Upload
                accept="image/*"
                listType="picture"
                beforeUpload={(file) => {
                  handleChange("image", file);
                  return false;
                }}
                fileList={state.newTeam.image ? [state.newTeam.image] : []}
                name="image"
              >
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
