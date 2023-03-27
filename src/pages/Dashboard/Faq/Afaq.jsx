import "./afaq.css";
import React, { useState, useEffect } from "react";
import Admin from "../../../resources/images/admin.jpg";
import { AiFillEdit, AiFillDelete } from "react-icons/ai";
import {
  getFaq,
  createFaq,
  editFaq,
  deleteFaq,
} from "../../../utils/api/faqApi";
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

const Afaq = () => {
  const navigate = useNavigate();
  const [state, setState] = useState({
    faqs: [],
    newFaq: "",
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
    setState({ ...state, newFaq: "" });
    setIsModalOpen(false);
  };

  //create faq process
  const handleChange = (name, value) => {
    setState({
      ...state,
      error: null,
      newFaq: { ...state.newFaq, [name]: value },
    });
  };

  const clickSubmit = () => {
    setState({ ...state, error: null });
    const addFaq = {
      title: state.newFaq.title,
      description: state.newFaq.description,
    };
    createFaq(addFaq)
      .then(({ data }) => {
        setState({
          ...state,
          newFaq: data,
          error: null,
          faqs: [...state.faqs, data],
          modalVisible: false,
        });
        message.success("Faq added");
      })
      .catch((error) => {
        setState({
          ...state,
          error: error,
          modalVisible: false,
        });
        message.error("Error adding faq");
      });
  };

  //process for edit

  const handleSubmit = (name, id, value) => {
    const newFaqs = [...state.faqs];
    const index = newFaqs.findIndex((element) => element?._id === id);
    newFaqs[index] = { ...newFaqs[index], [name]: value }; //update the new value of element
    setState((prev) => {
      return { ...prev, faqs: newFaqs };
    });
  };

  const handleUpdate = (id, data) => {
    setState({ ...state, updateLoading: true });
    editFaq(id, data)
      .then((response) => {
        setState({
          ...state,
          faqs: response?.data,
          updateLoading: false,
          modalVisible: false,
        });
        message.success("Successfully updated faq");
        setTimeout(() => {
          navigate("/api/dashboard");
        }, 1000);
      })
      .catch((error) => {
        // Update the state with the error
        setState({ ...state, updateLoading: false });
        message.error(error?.message || "Error updating faq");
      });
  };

  //process for delete

  const confirm = (id) => {
    deleteFaq(id)
      .then((faq) => {
        message.success("Faq deleted");
        setTimeout(() => {
          navigate("/faq");
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
              title="Edit Faq"
              okText="Edit"
              style={{ top: 20 }}
              visible={state.modalVisible}
              okButtonProps={{ loading: state.updateLoading }}
              onOk={(e) => {
                e.preventDefault();
                handleUpdate(
                  _id._id,
                  state?.faqs?.find((el) => el._id === _id._id)
                );
                setState({ ...state, modalVisible: false });
              }}
              onCancel={() => setState({ ...state, modalVisible: false })}
            >
              <form>
                <label>Title</label>
                <TextArea
                  rows={4}
                  onChange={(e) => {
                    handleSubmit("title", _id._id, e.target.value);
                  }}
                  value={
                    state?.faqs?.find((el) => el._id === _id._id)?.title || ""
                  }
                  name="title"
                />
                <label>Description</label>
                <TextArea
                  rows={6}
                  onChange={(e) =>
                    handleSubmit("description", _id._id, e.target.value)
                  }
                  value={
                    state?.faqs?.find((el) => el._id === _id._id)
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

  const fetchFaqs = () => {
    setState({ ...state, error: null });
    getFaq()
      .then(({ data }) => setState({ ...state, faqs: data, error: null }))
      .catch({ ...state, error: null });
  };

  useEffect(() => {
    fetchFaqs();
  }, []);

  const mappedData = state?.faqs?.map((item) => ({
    _id: item?._id,
    title: item?.title,
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
          <h1>Action to your faq-section</h1>
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
                value={state.newFaq.title}
                required
                rows={4}
                name="title"
              />
              <label>Description</label>
              <TextArea
                type="text"
                placeholder="Faq description"
                onChange={(e) => handleChange("description", e.target.value)}
                value={state.newFaq.description}
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

export default Afaq;
