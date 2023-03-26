import "./aservice.css";
import React, { useState, useEffect } from "react";
import Admin from "../../../resources/images/admin.jpg";
import { AiFillEdit, AiFillDelete, AiOutlineUpload } from "react-icons/ai";
import {
  getServices,
  postService,
  deleteService,
  editService,
} from "../../../utils/api/serviceApi";
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
import DashboardService from "../../../utils/data/dashboardService";
import { useNavigate } from "react-router-dom";
const { TextArea } = Input;

const Aservice = () => {
  const navigate = useNavigate();
  const [state, setState] = useState({
    services: [],
    error: null,
    newService: { id: "", title: "", description: "", image: [] },
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
    setState({ ...state, newService: "" });
    setIsModalOpen(false);
  };

  // create service process
  const handleChange = (name, value, isEdit) => {
    if (isEdit) {
      setNewImage(value);
      setState({
        ...state,
        error: null,
        services: state?.services?.map((service) => {
          if (service._id === state.newService.id) {
            setState({
              ...state,
              error: null,
              newService: { ...state.newService, [name]: value },
            });
            return service;
          } else {
            return service;
          }
        }),
      });
    } else if (name === "image") {
      setState({
        ...state,
        error: null,
        newService: {
          ...state.newService,
          image: [...state.newService.image, ...value],
        },
      });
    } else {
      setState({
        ...state,
        error: null,
        newService: { ...state.newService, [name]: value },
      });
    }
  };

  const clickSubmit = async () => {
    const { title, description, image } = state.newService;
    try {
      const response = await postService(title, description, image);
      setState({
        ...state,
        newService: response?.data,
        error: null,
        modalVisible: false,
        services: [...state.services, response?.data],
      });
      message.success("Service added");
    } catch (error) {
      setState({
        ...state,
        error: error,
        modalVisible: false,
      });
      message.error("Error adding service");
    }
  };

  //for edit process
  const handleSubmit = (name, id, value) => {
    const newServices = [...state.services];
    const index = newServices.findIndex((element) => element?._id === id);
    newServices[index] = { ...newServices[index], [name]: value }; //update the new value of element
    setState((prev) => {
      return { ...prev, services: newServices };
    });
  };

  const handleEditImageUpload = (id, title, description, image) => {
    setState({ ...state, updateLoading: true });
    editService(id, title, description, image)
      .then((response) => {
        const updatedServices = state?.services?.map((service) => {
          if (service._id === id) {
            return response?.data;
          } else {
            return service;
          }
        });
        setState({
          ...state,
          services: updatedServices,
          updateLoading: false,
          modalVisible: false,
          newService: {}, // reset the newService object in state
        });
        message.success("Successfully updated service");
        setTimeout(() => {
          navigate("/api/dashboard");
        }, 1000);
      })
      .catch((error) => {
        setState({ ...state, updateLoading: false });
        message.error("Error updating service");
      });
  };

  //for delete process
  const confirm = (id) => {
    deleteService(id)
      .then((service) => {
        message.success("Service deleted");
        setTimeout(() => {
          navigate("/services");
        }, 1000);
      })
      .catch((error) => {
        setState({ ...state, error: error, loading: false });
        message.error(error?.message || "Error deleting service");
      });
  };
  const cancel = (e) => {
    console.log(e);
    message.error("Delete cancelled");
  };

  const fetchServices = () => {
    setState({ ...state, error: null });
    getServices()
      .then(({ data }) => setState({ ...state, services: data, error: null }))
      .catch({ ...state, error: null });
  };

  useEffect(() => {
    fetchServices();
  }, []);

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
      title: "Images",
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
                  newService: {
                    ...state.newService,
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
              title="Edit Region"
              okText="Edit"
              style={{ top: 20 }}
              visible={state.modalVisible[_id._id]}
              okButtonProps={{ loading: state.updateLoading }}
              onOk={(e) => {
                e.preventDefault();
                const service = state?.services?.find(
                  (el) => el._id === _id._id
                );
                const { title, description, image } = service;
                handleEditImageUpload(
                  _id._id,
                  title,
                  description,
                  newImage || image
                );
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
                    state?.services?.find((el) => el._id === _id._id)?.title ||
                    ""
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
                    state?.services?.find((el) => el._id === _id._id)
                      ?.description || ""
                  }
                  name="description"
                />
                <br />
                <br />
                <Upload
                  accept="image/*"
                  beforeUpload={(_, fileList) => {
                    handleChange("image", fileList, true);
                    return false;
                  }}
                  fileList={state?.services
                    ?.filter((service) => service._id === _id._id)
                    .filter((service) => service !== null)}
                  name="image"
                  multiple={true}
                >
                  <Button icon={<AiOutlineUpload />}>Click to Upload</Button>
                </Upload>
              </form>
            </Modal>
          </Space>

          <Popconfirm
            title="Delete the service"
            description="Are you sure to delete this service?"
            onConfirm={() => confirm(_id._id)}
            onCancel={cancel}
            okText="Yes"
            cancelText="No"
          >
            <AiFillDelete
              style={{
                color: "#eb1d0f",
                marginLeft: "14px",
              }}
              size={18}
            />
          </Popconfirm>
        </Row>
      ),
    },
  ];

  const mappedData = state?.services?.map((item) => ({
    _id: item?._id,
    title: item?.title,
    description: item?.description,
    image: [
      <DashboardService region={item?.image?.[0]} url="uploads" />,
      <DashboardService region={item?.image?.[1]} url="uploads" />,
      <DashboardService region={item?.image?.[2]} url="uploads" />,
    ],
  }));

  return (
    <section className="dashboard-container">
      <div className="mini-container">
        <div className="head-container">
          <div className="head-section">
            <h1>Service</h1>
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
          <h1>Action to your service-section</h1>
          <Button type="primary" onClick={showModal}>
            Add
          </Button>
          <Modal
            title="Add Service"
            open={isModalOpen}
            onOk={handleOk}
            onCancel={handleCancel}
          >
            <form>
              <label>Title</label>
              <TextArea
                type="text"
                placeholder="Service title"
                onChange={(e) => handleChange("title", e.target.value)}
                value={state.newService.title}
                required
                rows={4}
                name="title"
              />
              <label>Description</label>
              <TextArea
                type="text"
                placeholder="Service description"
                onChange={(e) => handleChange("description", e.target.value)}
                value={state.newService.description}
                required
                rows={6}
                name="description"
              />
              <br />
              <br />
              <label>Image</label>
              <br />
              <br />
              <Upload
                accept="image/*"
                listType="picture"
                beforeUpload={(_, fileList) => {
                  handleChange("image", fileList);
                  return false; // prevent Ant Design from automatically uploading the file
                }}
                fileList={state.newService.image}
                name="image"
                multiple={true}
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

export default Aservice;
