import "./afaq.css";
import React, { useState, useEffect } from "react";
import Admin from "../../../resources/images/admin.jpg";
import { AiFillEdit, AiFillDelete } from "react-icons/ai";
import { getFaq, createFaq } from "../../../utils/api/faqApi";
import { Row, Button, Modal, Table, message, Space, Input } from "antd";
import { useNavigate } from "react-router-dom";
const { TextArea } = Input;

const Afaq = () => {
  const [state, setState] = useState({
    faqs: [],
    newFaq: "",
    error: null,
    modalVisible: false,
  });
  const navigate = useNavigate();

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
        // setTimeout(() => {
        //   navigate("/");
        // }, 1000);
      });
  };

  const columns = [
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
              title="Edit Faq"
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
                <label>Title</label>
                <TextArea
                  rows={4}
                  value={state?.faqs?.map((element) => element?.title)}
                  name="title"
                />
                <label>Description</label>
                <TextArea
                  rows={6}
                  // onChange={(e) =>
                  //   handleChange("description", e.target.value)
                  // }
                  value={state?.faqs?.map((element) => element?.description)}
                  name="description"
                />
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
              <TextArea rows={4} name="title" />
              <label>Description</label>
              <TextArea rows={6} name="description" />
            </form>
          </Modal>
        </div>
      </div>
      <Table className="data-table" dataSource={mappedData} columns={columns} />
    </section>
  );
};

export default Afaq;
