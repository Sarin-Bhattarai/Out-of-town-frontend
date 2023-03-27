import "./homeDesc.css";
import React, { useState, useEffect } from "react";
import {
  getHomeDesc,
  editHomeDesc,
  createDesc,
  deleteDesc,
} from "../../../utils/api/homeApi";
import Admin from "../../../resources/images/admin.jpg";
import { AiFillEdit, AiFillDelete } from "react-icons/ai";
import {
  Row,
  Button,
  Modal,
  Table,
  message,
  Space,
  Input,
  Popconfirm,
} from "antd";
import { useNavigate } from "react-router-dom";
const { TextArea } = Input;

const HomeDesc = () => {
  const navigate = useNavigate();
  const [state, setState] = useState({
    descs: [],
    newDesc: "",
    error: null,
    modalVisible: false,
    updateLoading: false,
  });

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
    setState({ ...state, newDesc: "" });
    setIsModalOpen(false);
  };

  const handleAdd = (name, value) => {
    setState({
      ...state,
      error: null,
      newDesc: { ...state.newDesc, [name]: value },
    });
  };

  const handleChange = (name, id, value) => {
    const newDescs = [...state.descs];
    const index = newDescs.findIndex((element) => element._id === id);
    newDescs[index] = { ...newDescs[index], [name]: value }; //updating the value of element
    setState((prev) => {
      return { ...prev, descs: newDescs };
    });
  };

  const clickSubmit = () => {
    setState({ ...state, error: null });
    const addDesc = {
      description: state.newDesc.description,
    };
    createDesc(addDesc)
      .then(({ data }) => {
        setState({
          ...state,
          newDesc: data,
          error: null,
          descs: [...state.descs, data],
          modalVisible: false,
        });
        message.success("Description added");
      })
      .catch((error) => {
        setState({
          ...state,
          error: error,
          modalVisible: false,
        });
        message.error("Error adding description");
      });
  };

  const confirm = (id) => {
    deleteDesc(id)
      .then((desc) => {
        message.success("Description deleted");
        setTimeout(() => {
          navigate("/api/dashboard/faq");
        }, 1000);
      })
      .catch((error) => {
        setState({ ...state, error: error, loading: false });
        message.error(error?.message || "Error deleting description");
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
      title: "Description",
      dataIndex: "description",
      key: "description",
      render: (text) => <p className="dashboard-paragraph">{text}</p>,
    },

    {
      title: "Actions",
      dataIndex: "action",
      key: "action",
      render: (_, _id) => (
        <Row
          style={{
            gap: "1rem",
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
              title="Edit Parcel"
              okText="Edit"
              style={{ top: 20 }}
              visible={state.modalVisible}
              okButtonProps={{ loading: state.updateLoading }}
              onOk={(e) => {
                e.preventDefault();
                handleUpdate(
                  _id?._id,
                  state.descs.find((e) => e._id === _id?._id)
                );
                setState({ ...state, modalVisible: false });
              }}
              onCancel={() => setState({ ...state, modalVisible: false })}
            >
              <form>
                <label>Description</label>
                <TextArea
                  rows={6}
                  onChange={(e) =>
                    handleChange("description", _id?._id, e.target.value)
                  }
                  value={state?.descs?.map((element) => element?.description)}
                  name="description"
                />
              </form>
            </Modal>
          </Space>
          <Popconfirm
            title="Delete the desc"
            description="Are you sure to delete this desc?"
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

  const fetchDescs = () => {
    setState({ ...state, error: null });
    getHomeDesc()
      .then(({ data }) => setState({ ...state, descs: data, error: null }))
      .catch({ ...state, error: null });
  };

  useEffect(() => {
    fetchDescs();
  }, []);

  const handleUpdate = (id, data) => {
    setState({ ...state, updateLoading: true });
    editHomeDesc(id, data)
      .then((response) => {
        // Update the state with the response data
        setState({
          ...state,
          descs: response?.data,
          updateLoading: false,
          modalVisible: false,
        });
        message.success("Successfully updated description");
        setTimeout(() => {
          navigate("/api/dashboard");
        }, 1000);
      })
      .catch((error) => {
        // Update the state with the error
        setState({ ...state, updateLoading: false });
        message.error(error?.message || "Error updating description");
      });
  };

  const mappedData = state?.descs?.map((item) => ({
    _id: item?._id,
    description: item?.description,
  }));

  return (
    <section className="dashboard-container">
      <div className="mini-container">
        <div className="head-container">
          <div className="head-section">
            <h1>Home Description</h1>
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
          <h1>Action to your home-description</h1>
          <Button type="primary" onClick={showModal}>
            Add
          </Button>
          <Modal
            title="Add Description"
            open={isModalOpen}
            onOk={handleOk}
            onCancel={handleCancel}
          >
            <form>
              <label>Description</label>
              <TextArea
                type="text"
                placeholder="Home description"
                onChange={(e) => handleAdd("description", e.target.value)}
                value={state.newDesc.description}
                required
                rows={6}
                name="description"
              />
            </form>
          </Modal>
        </div>
      </div>
      <Table className="data-table" dataSource={mappedData} columns={columns} />
    </section>
  );
};

export default HomeDesc;
