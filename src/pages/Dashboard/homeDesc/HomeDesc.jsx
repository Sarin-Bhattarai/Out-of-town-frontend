import "./homeDesc.css";
import React, { useState, useEffect } from "react";
import {
  getHomeDesc,
  editHomeDesc,
  deleteHomeDesc,
} from "../../../utils/api/homeApi";
import Admin from "../../../resources/images/admin.jpg";
import { AiFillEdit, AiFillDelete } from "react-icons/ai";
import { Row, Button, Modal, Table, message, Space, Input } from "antd";
import { useNavigate } from "react-router-dom";
import axios from "axios";
const { TextArea } = Input;

const HomeDesc = () => {
  const navigate = useNavigate();
  const [state, setState] = useState({
    descs: [],
    error: null,
    modalVisible: false,
    updateLoading: false,
  });

  // const handleChange = (name, value) => {
  //   setState({
  //     ...state,
  //     error: null,
  //     descs: { ...state.descs, [name]: value },
  //   });
  // };

  const handleChange = (event, id) => {
    const newDescs = [...state.descs];
    const index = newDescs.findIndex((element) => element.id === id);
    newDescs[index] = { ...newDescs[index], value: event.target.value }; //updating the value of element
    setState(newDescs);
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
      render: (_) => (
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
                submitDesc();
                setState({ ...state, modalVisible: false });
              }}
              onCancel={() => setState({ ...state, modalVisible: false })}
            >
              <form>
                <label>Description</label>
                <TextArea
                  rows={6}
                  onChange={(e) => handleChange("description", e.target.value)}
                  value={state?.descs?.map((element) => element?.description)}
                  name="description"
                />
              </form>
            </Modal>
          </Space>

          {/* <AiFillDelete
            style={{
              color: "#eb1d0f",
            }}
            size={18}
          /> */}
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

  const submitDesc = (id) => {
    editHomeDesc(id)
      .then(({ data }) => {
        setState({ ...state, descs: data, updateLoading: false, error: null });
        message.success("Successfully updated description");
        setTimeout(() => {
          navigate("/");
        }, 1000);
      })
      .catch((error) => {
        setState({ ...state, updateLoading: false });
        message.error("Error updating description");
        setTimeout(() => {
          navigate("/api/dashboard/homeDesc");
        }, 2000);
      });
  };

  //alternative api
  // const handleEdit = async (id) => {
  //   try {
  //     const index = state.descs.findIndex((element) => element.id === id);
  //     const response = await axios.patch(
  //       `http://localhost:4000/api/descs/${id}`,
  //       state.descs[index]
  //     );
  //     setState((prevArray) =>
  //       prevArray?.map((e) => (e.id === id ? response.data : e))
  //     );
  //   } catch (error) {
  //     console.log(error);
  //   }
  // };

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
