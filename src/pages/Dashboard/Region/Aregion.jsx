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
  getRegion,
  postRegion,
  editRegion,
  deleteRegion,
} from "../../../utils/api/regionApi";
import ShowImage from "../../../utils/data/showImage";
import { useNavigate } from "react-router-dom";
const { TextArea } = Input;

const Aregion = () => {
  const navigate = useNavigate();
  const [state, setState] = useState({
    regions: [],
    error: null,
    newRegion: { id: "", title: "", description: "", image: null },
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
    setState({ ...state, newRegion: "" });
    setIsModalOpen(false);
  };

  // create region process
  const handleChange = (name, value, isEdit) => {
    if (isEdit) {
      setNewImage(value);
      setState({
        ...state,
        error: null,
        regions: state?.regions?.map((region) => {
          if (region._id === state.newRegion.id) {
            setState({
              ...state,
              error: null,
              newRegion: { ...state.newRegion, [name]: value },
            });
            return region;
          } else {
            return region;
          }
        }),
      });
    } else {
      setState({
        ...state,
        error: null,
        newRegion: { ...state.newRegion, [name]: value },
      });
    }
  };

  const clickSubmit = async () => {
    const { title, description, image } = state.newRegion;
    try {
      const response = await postRegion(title, description, image);
      setState({
        ...state,
        newRegion: response?.data,
        error: null,
        modalVisible: false,
        regions: [...state.regions, response?.data],
      });
      message.success("Region added");
    } catch (error) {
      setState({
        ...state,
        error: error,
        modalVisible: false,
      });
      message.error("Error adding region");
    }
  };

  //for edit region process

  const handleSubmit = (name, id, value) => {
    const newRegions = [...state.regions];
    const index = newRegions.findIndex((element) => element?._id === id);
    newRegions[index] = { ...newRegions[index], [name]: value }; //update the new value of element
    setState((prev) => {
      return { ...prev, regions: newRegions };
    });
  };

  const handleEditImageUpload = (id, title, description, image) => {
    setState({ ...state, updateLoading: true });
    editRegion(id, title, description, image)
      .then((response) => {
        const updatedRegions = state?.regions?.map((region) => {
          if (region._id === id) {
            return response?.data;
          } else {
            return region;
          }
        });
        setState({
          ...state,
          regions: updatedRegions,
          updateLoading: false,
          modalVisible: false,
          newRegion: {}, // reset the newRegion object in state
        });
        message.success("Successfully updated region");
        setTimeout(() => {
          navigate("/api/dashboard");
        }, 1000);
      })
      .catch((error) => {
        setState({ ...state, updateLoading: false });
        message.error(error?.message || "Error updating region");
      });
  };

  //for delete process
  const confirm = (id) => {
    deleteRegion(id)
      .then((region) => {
        message.success("Region deleted");
        setTimeout(() => {
          navigate("/api/dashboard");
        }, 1000);
      })
      .catch((error) => {
        setState({ ...state, error: error, loading: false });
        message.error(error?.message || "Error deleting region");
      });
  };
  const cancel = (e) => {
    console.log(e);
    message.error("Delete cancelled");
  };

  const fetchRegions = () => {
    setState({ ...state, error: null });
    getRegion()
      .then(({ data }) => setState({ ...state, regions: data, error: null }))
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
                    newRegion: {
                      ...state.newRegion,
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
                title="Edit Region"
                okText="Edit"
                style={{ top: 20 }}
                visible={state.modalVisible[_id._id]}
                okButtonProps={{ loading: state.updateLoading }}
                onOk={(e) => {
                  e.preventDefault();
                  const region = state?.regions?.find(
                    (el) => el._id === _id._id
                  );
                  const { title, description, image } = region;
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
                      state?.regions?.find((el) => el._id === _id._id)?.title ||
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
                      state?.regions?.find((el) => el._id === _id._id)
                        ?.description || ""
                    }
                    name="description"
                  />
                  <br />
                  <br />
                  <Upload
                    accept="image/*"
                    beforeUpload={(file) => {
                      handleChange("image", file, true);
                      return false; // prevent Ant Design from automatically uploading the file
                    }}
                    fileList={state?.regions
                      ?.filter((region) => region._id === _id._id)
                      ?.map((region) =>
                        region?.image
                          ? {
                              uid: region._id,
                              name: region?.title,
                              status: "done",
                              url: region?.image,
                            }
                          : null
                      )
                      .filter((region) => region !== null)}
                    name="image"
                  >
                    <Button icon={<AiOutlineUpload />}>Upload Image</Button>
                  </Upload>
                </form>
              </Modal>
            </Space>

            <Popconfirm
              title="Delete the region"
              description="Are you sure to delete this region?"
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
    fetchRegions();
  }, []);

  const mappedData = state?.regions?.map((item) => ({
    _id: item?._id,
    title: item?.title,
    description: item?.description,
    image: <ShowImage region={item?.image} url="uploads" />,
  }));

  return (
    <section className="dashboard-container">
      <div className="mini-container">
        <div className="head-container">
          <div className="head-section">
            <h1>Region</h1>
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
          <h1>Action to your region-section</h1>
          <Button type="primary" onClick={showModal}>
            Add
          </Button>
          <Modal
            title="Add Region"
            open={isModalOpen}
            onOk={handleOk}
            onCancel={handleCancel}
          >
            <form>
              <label>Title</label>
              <TextArea
                type="text"
                placeholder="Region title"
                onChange={(e) => handleChange("title", e.target.value)}
                value={state.newRegion.title}
                required
                rows={4}
                name="title"
              />
              <label>Description</label>
              <TextArea
                type="text"
                placeholder="Region description"
                onChange={(e) => handleChange("description", e.target.value)}
                value={state.newRegion.description}
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
                beforeUpload={(file) => {
                  handleChange("image", file);
                  return false; // prevent Ant Design from automatically uploading the file
                }}
                fileList={state.newRegion.image ? [state.newRegion.image] : []}
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

export default Aregion;
