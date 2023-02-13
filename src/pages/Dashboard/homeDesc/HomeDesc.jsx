import "./homeDesc.css";
import React, { useState, useEffect } from "react";
import { getHomeDesc, editHomeDesc } from "../../../utils/api/homeApi";
import Admin from "../../../resources/images/admin.jpg";
import { AiFillEdit } from "react-icons/ai";
import { Row, Button, Modal, Table, message, Space, Input } from "antd";
import { useNavigate } from "react-router-dom";
const { TextArea } = Input;

const HomeDesc = () => {
  const navigate = useNavigate();
  const [state, setState] = useState({
    descs: [],
    error: null,
    modalVisible: false,
    updateLoading: false,
  });

  const handleChange = (name, id, value) => {
    const newDescs = [...state.descs];
    const index = newDescs.findIndex((element) => element._id === id);
    newDescs[index] = { ...newDescs[index], [name]: value }; //updating the value of element
    setState((prev) => {
      return { ...prev, descs: newDescs };
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
          navigate("/");
          window.location.reload();
        }, 1000);
      })
      .catch((error) => {
        // Update the state with the error
        setState({ ...state, updateLoading: false });
        message.error("Error updating description");
        setTimeout(() => {
          navigate("/");
          window.location.reload();
        }, 1000);
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
        <div className="content-container">
          <h1>Action to your home-description</h1>
        </div>
      </div>
      <Table className="data-table" dataSource={mappedData} columns={columns} />
    </section>
  );
};

export default HomeDesc;
