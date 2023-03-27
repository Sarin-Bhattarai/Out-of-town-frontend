import React, { useState, useEffect } from "react";
import Admin from "../../../resources/images/admin.jpg";
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
import {
  getOther,
  postOther,
  editOther,
  deleteOther,
} from "../../../utils/api/otherApi";
import ShowImage from "../../../utils/data/showImage";
import { useNavigate } from "react-router-dom";
const { TextArea } = Input;

const Aother = () => {
  const navigate = useNavigate();
  const [state, setState] = useState({
    others: [],
    error: null,
    newOther: { id: "", title: "", image: null },
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
    setState({ ...state, newOther: "" });
    setIsModalOpen(false);
  };

  // create region process
  const handleChange = (name, value, isEdit) => {
    if (isEdit) {
      setNewImage(value);
      setState({
        ...state,
        error: null,
        others: state?.others?.map((other) => {
          if (other._id === state.newOther.id) {
            setState({
              ...state,
              error: null,
              newOther: { ...state.newOther, [name]: value },
            });
            return other;
          } else {
            return other;
          }
        }),
      });
    } else {
      setState({
        ...state,
        error: null,
        newOther: { ...state.newOther, [name]: value },
      });
    }
  };

  const clickSubmit = async () => {
    const { title, image } = state.newOther;
    try {
      const response = await postOther(title, image);
      setState({
        ...state,
        newOther: response?.data,
        error: null,
        modalVisible: false,
        others: [...state.others, response?.data],
      });
      message.success("Other service added");
    } catch (error) {
      setState({
        ...state,
        error: error,
        modalVisible: false,
      });
      message.error("Error adding other service");
    }
  };

  //for edit region process

  const handleSubmit = (name, id, value) => {
    const newOthers = [...state.others];
    const index = newOthers.findIndex((element) => element?._id === id);
    newOthers[index] = { ...newOthers[index], [name]: value }; //update the new value of element
    setState((prev) => {
      return { ...prev, others: newOthers };
    });
  };

  const handleEditImageUpload = (id, title, image) => {
    setState({ ...state, updateLoading: true });
    editOther(id, title, image)
      .then((response) => {
        const updatedOthers = state?.others?.map((other) => {
          if (other._id === id) {
            return response?.data;
          } else {
            return other;
          }
        });
        setState({
          ...state,
          others: updatedOthers,
          updateLoading: false,
          modalVisible: false,
          newOther: {}, // reset the newRegion object in state
        });
        message.success("Successfully updated other");
        setTimeout(() => {
          navigate("/api/dashboard");
        }, 1000);
      })
      .catch((error) => {
        setState({ ...state, updateLoading: false });
        message.error(error?.message || "Error updating other");
      });
  };

  //for delete process
  const confirm = (id) => {
    deleteOther(id)
      .then((other) => {
        message.success("Other deleted");
        setTimeout(() => {
          navigate("/api/dashboard");
        }, 1000);
      })
      .catch((error) => {
        setState({ ...state, error: error, loading: false });
        message.error(error?.message || "Error deleting other");
      });
  };
  const cancel = (e) => {
    console.log(e);
    message.error("Delete cancelled");
  };

  const fetchOthers = () => {
    setState({ ...state, error: null });
    getOther()
      .then(({ data }) => setState({ ...state, others: data, error: null }))
      .catch({ ...state, error: null });
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
        <>
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
                onClick={() => {
                  setState({
                    ...state,
                    newOther: {
                      ...state.newOther,
                      id: _id._id,
                    },
                    modalVisible: {
                      ...state.modalVisible,
                      [_id._id]: true,
                    },
                  });
                }}
              >
                <AiFillEdit
                  style={{
                    color: "#4eae98",
                  }}
                  size={18}
                />
              </Button>
              <Modal
                title="Edit Other"
                okText="Edit"
                style={{ top: 20 }}
                visible={state.modalVisible[_id._id]}
                okButtonProps={{ loading: state.updateLoading }}
                onOk={(e) => {
                  e.preventDefault();
                  const other = state?.others?.find((el) => el._id === _id._id);
                  const { title, image } = other;
                  handleEditImageUpload(_id._id, title, newImage || image);
                  setState({ ...state, modalVisible: false });
                }}
                onCancel={() => setState({ ...state, modalVisible: false })}
              >
                <form>
                  <label>Title</label>
                  <TextArea
                    rows={4}
                    onChange={(e) =>
                      handleSubmit("title", _id._id, e.target.value)
                    }
                    value={
                      state?.others?.find((el) => el._id === _id._id)?.title ||
                      ""
                    }
                    name="title"
                  />
                  <br />
                  <br />
                  <Upload
                    accept="image/*"
                    beforeUpload={(file) => {
                      handleChange("image", file, true);
                      return false; // prevent Ant Design from automatically uploading the file
                    }}
                    fileList={state?.others
                      ?.filter((other) => other._id === _id._id)
                      ?.map((other) =>
                        other?.image
                          ? {
                              uid: other._id,
                              name: other?.title,
                              status: "done",
                              url: other?.image,
                            }
                          : null
                      )
                      .filter((other) => other !== null)}
                    name="image"
                  >
                    <Button icon={<AiOutlineUpload />}>Upload Image</Button>
                  </Upload>
                </form>
              </Modal>
            </Space>

            <Popconfirm
              title="Delete the other"
              description="Are you sure to delete this other?"
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
        </>
      ),
    },
  ];

  useEffect(() => {
    fetchOthers();
  }, []);

  const mappedData = state?.others?.map((item) => ({
    _id: item?._id,
    title: item?.title,
    image: <ShowImage region={item?.image} url="uploads" />,
  }));

  return (
    <section className="dashboard-container">
      <div className="mini-container">
        <div className="head-container">
          <div className="head-section">
            <h1>Other Service</h1>
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
          <h1>Action to your other-section</h1>
          <Button type="primary" onClick={showModal}>
            Add
          </Button>
          <Modal
            title="Add Other"
            open={isModalOpen}
            onOk={handleOk}
            onCancel={handleCancel}
          >
            <form>
              <label>Title</label>
              <TextArea
                type="text"
                placeholder="Other title"
                onChange={(e) => handleChange("title", e.target.value)}
                value={state.newOther.title}
                required
                rows={4}
                name="title"
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
                  return false; // prevent Ant Design from automatically uploading the file
                }}
                fileList={state.newOther.image ? [state.newOther.image] : []}
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

export default Aother;
