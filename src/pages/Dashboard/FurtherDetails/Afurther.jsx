import React, { useState, useEffect } from "react";
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
import {
  getFurther,
  createFurther,
  editFurther,
  deleteFurther,
} from "../../../utils/api/furtherApi";
import { useNavigate } from "react-router-dom";
const { TextArea } = Input;

const Afurther = () => {
  const navigate = useNavigate();
  const [state, setState] = useState({
    furthers: [],
    newFurther: "",
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
    setState({ ...state, newFurther: "" });
    setIsModalOpen(false);
  };

  const handleChange = (name, value) => {
    setState({
      ...state,
      error: null,
      newFurther: { ...state.newFurther, [name]: value },
    });
  };

  const clickSubmit = () => {
    setState({ ...state, error: null });
    const addFurther = {
      title: state.newFurther.title,
      subtitle: state.newFurther.subtitle,
      description: state.newFurther.description,
    };
    createFurther(addFurther)
      .then(({ data }) => {
        setState({
          ...state,
          newFurther: data,
          error: null,
          furthers: [...state.furthers, data],
          modalVisible: false,
        });
        message.success("Faq details added");
      })
      .catch((error) => {
        setState({
          ...state,
          error: error,
          modalVisible: false,
        });
        message.error("Error adding faq details");
      });
  };

  //process for edit

  const handleSubmit = (name, id, value) => {
    const newFurthers = [...state.furthers];
    const index = newFurthers.findIndex((element) => element?._id === id);
    newFurthers[index] = { ...newFurthers[index], [name]: value }; //update the new value of element
    setState((prev) => {
      return { ...prev, furthers: newFurthers };
    });
  };

  const handleUpdate = (id, data) => {
    setState({ ...state, updateLoading: true });
    editFurther(id, data)
      .then((response) => {
        setState({
          ...state,
          furthers: response?.data,
          updateLoading: false,
          modalVisible: false,
        });
        message.success("Successfully updated faq");
        setTimeout(() => {
          navigate("/api/dashboard/furtherDetails");
          window.location.reload();
        }, 1000);
      })
      .catch((error) => {
        // Update the state with the error
        setState({ ...state, updateLoading: false });
        message.error(error?.message || "Error updating faq");
      });
  };

  const confirm = (id) => {
    deleteFurther(id)
      .then((faq) => {
        message.success("Faq deleted");
        setTimeout(() => {
          navigate("/api/dashboard");
        }, 1000);
      })
      .catch((error) => {
        setState({ ...state, error: error, loading: false });
        message.error(error?.message || "Error deleting faq");
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
      title: "Title",
      dataIndex: "title",
      key: "title",
      render: (text) => <p className="dashboard-paragraph">{text}</p>,
    },
    {
      title: "SubTitle",
      dataIndex: "subtitle",
      key: "subtitle",
      render: (text) => <p className="dashboard-paragraph">{text}</p>,
    },
    {
      title: "Description",
      dataIndex: "description",
      key: "description",
      render: (text) => (
        <p
          style={{
            width: "90%",
          }}
          className="dashboard-paragraph"
        >
          {text}
        </p>
      ),
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
              title="Edit Faq"
              okText="Edit"
              style={{ top: 20 }}
              visible={state.modalVisible[_id._id]}
              okButtonProps={{ loading: state.updateLoading }}
              onOk={(e) => {
                e.preventDefault();
                handleUpdate(
                  _id._id,
                  state?.furthers?.find((el) => el._id === _id._id)
                );
                setState({ ...state, modalVisible: false });
              }}
              onCancel={() => setState({ ...state, modalVisible: false })}
            >
              <form>
                <label>Title</label>
                <TextArea
                  rows={2}
                  onChange={(e) => {
                    handleSubmit("title", _id._id, e.target.value);
                  }}
                  value={
                    state?.furthers?.find((el) => el._id === _id._id)?.title ||
                    ""
                  }
                  name="title"
                />
                <label>SubTitle</label>
                <TextArea
                  rows={2}
                  onChange={(e) => {
                    handleSubmit("subtitle", _id._id, e.target.value);
                  }}
                  value={
                    state?.furthers?.find((el) => el._id === _id._id)
                      ?.subtitle || ""
                  }
                  name="subtitle"
                />
                <label>Description</label>
                <TextArea
                  rows={6}
                  onChange={(e) =>
                    handleSubmit("description", _id._id, e.target.value)
                  }
                  value={
                    state?.furthers?.find((el) => el._id === _id._id)
                      ?.description || ""
                  }
                  name="description"
                />
              </form>
            </Modal>
          </Space>
          <Popconfirm
            title="Delete the faq"
            description="Are you sure to delete this faq?"
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

  const fetchFurthers = () => {
    setState({ ...state, error: null });
    getFurther()
      .then(({ data }) => setState({ ...state, furthers: data, error: null }))
      .catch({ ...state, error: null });
  };

  useEffect(() => {
    fetchFurthers();
  }, []);

  const mappedData = state?.furthers?.map((item) => ({
    _id: item._id,
    title: item?.title,
    subtitle: item?.subtitle,
    description: item?.description,
  }));

  return (
    <section className="dashboard-container">
      <div className="mini-container">
        <div className="head-container">
          <div className="head-section">
            <h1>FAQ</h1>
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
          <h1>Action to your Further Details section</h1>
          <Button type="primary" onClick={showModal}>
            Add
          </Button>
          <Modal
            title="Add Faq"
            open={isModalOpen}
            onOk={handleOk}
            onCancel={handleCancel}
          >
            <form>
              <label>Title</label>
              <TextArea
                type="text"
                placeholder="Faq title"
                onChange={(e) => handleChange("title", e.target.value)}
                value={state.newFurther.title}
                required
                rows={2}
                name="title"
              />
              <label>SubTitle</label>
              <TextArea
                type="text"
                placeholder="Faq sub title"
                onChange={(e) => handleChange("subtitle", e.target.value)}
                value={state.newFurther.subtitle}
                required
                rows={2}
                name="subtitle"
              />
              <label>Description</label>
              <TextArea
                type="text"
                placeholder="Faq description"
                onChange={(e) => handleChange("description", e.target.value)}
                value={state.newFurther.description}
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

export default Afurther;
