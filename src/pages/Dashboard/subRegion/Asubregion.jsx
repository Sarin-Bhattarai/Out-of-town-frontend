import React, { useState, useEffect } from "react";
import Admin from "../../../resources/images/admin.jpg";
import { AiFillEdit, AiFillDelete, AiOutlineUpload } from "react-icons/ai";
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
import {
  getSubRegion,
  postSubRegion,
  editSubRegion,
  deleteSubRegion,
} from "../../../utils/api/subregionApi";
import SubRegionImage from "../../../utils/data/subregionImage";
import { useNavigate } from "react-router-dom";
const { TextArea } = Input;

const Asubregion = () => {
  const navigate = useNavigate();
  const [state, setState] = useState({
    subRegions: [],
    error: null,
    newSubRegion: {
      id: "",
      title: "",
      description: "",
      image: [],
      includedetails: "",
      excludedetails: "",
    },
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
    setState({ ...state, newSubRegion: "" });
    setIsModalOpen(false);
  };

  const handleChange = (name, value, isEdit) => {
    if (isEdit) {
      setNewImage(value);
      setState({
        ...state,
        error: null,
        subRegions: state?.subRegions?.map((subRegion) => {
          if (subRegion._id === state.newSubRegion.id) {
            setState({
              ...state,
              error: null,
              newSubRegion: { ...state.newSubRegion, [name]: value },
            });
            return subRegion;
          } else {
            return subRegion;
          }
        }),
      });
    } else if (name === "image") {
      setState({
        ...state,
        error: null,
        newSubRegion: {
          ...state.newSubRegion,
          image: [...state.newSubRegion.image, ...value],
        },
      });
    } else {
      setState({
        ...state,
        error: null,
        newSubRegion: { ...state.newSubRegion, [name]: value },
      });
    }
  };

  const clickSubmit = async () => {
    const { title, description, image, includedetails, excludedetails } =
      state.newSubRegion;
    try {
      const response = await postSubRegion(
        title,
        description,
        image,
        includedetails,
        excludedetails
      );
      setState({
        ...state,
        newSubRegion: response?.data,
        error: null,
        modalVisible: false,
        subRegions: [...state.subRegions, response?.data],
      });
      message.success("Subregion added");
    } catch (error) {
      setState({
        ...state,
        error: error,
        modalVisible: false,
      });
      message.error("Error adding subregion");
    }
  };

  const handleSubmit = (name, id, value) => {
    const newSubRegions = [...state.subRegions];
    const index = newSubRegions.findIndex((element) => element?._id === id);
    newSubRegions[index] = { ...newSubRegions[index], [name]: value }; //update the new value of element
    setState((prev) => {
      return { ...prev, subRegions: newSubRegions };
    });
  };

  const handleEditImageUpload = (
    id,
    title,
    description,
    image,
    includedetails,
    excludedetails
  ) => {
    setState({ ...state, updateLoading: true });
    editSubRegion(id, title, description, image, includedetails, excludedetails)
      .then((response) => {
        const updatedSubRegions = state?.subRegions?.map((subregion) => {
          if (subregion._id === id) {
            return response?.data;
          } else {
            return subregion;
          }
        });
        setState({
          ...state,
          subRegions: updatedSubRegions,
          updateLoading: false,
          modalVisible: false,
          newSubRegion: {}, // reset the newSubRegion object in state
        });
        message.success("Successfully updated subregion");
        setTimeout(() => {
          navigate("/api/dashboard");
        }, 1000);
      })
      .catch((error) => {
        setState({ ...state, updateLoading: false });
        message.error(error?.message || "Error updating subregion");
      });
  };

  const confirm = (id) => {
    deleteSubRegion(id)
      .then((subregion) => {
        message.success("subregion deleted");
        setTimeout(() => {
          navigate("/api/dashboard");
        }, 1000);
      })
      .catch((error) => {
        setState({ ...state, error: error, loading: false });
        message.error(error?.message || "Error deleting subregion");
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
      title: "Includedetails",
      dataIndex: "includedetails",
      key: "includedetails",
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
      title: "Excludedetails",
      dataIndex: "excludedetails",
      key: "excludedetails",
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
                  newSubRegion: {
                    ...state.newSubRegion,
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
              title="Edit Sub-Region"
              okText="Edit"
              style={{ top: 20 }}
              visible={state.modalVisible[_id._id]}
              okButtonProps={{ loading: state.updateLoading }}
              onOk={(e) => {
                e.preventDefault();
                const subregion = state?.subRegions?.find(
                  (el) => el._id === _id._id
                );
                const {
                  title,
                  description,
                  image,
                  includedetails,
                  excludedetails,
                } = subregion;
                handleEditImageUpload(
                  _id._id,
                  title,
                  description,
                  newImage || image,
                  includedetails,
                  excludedetails
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
                    state?.subRegions?.find((el) => el._id === _id._id)
                      ?.title || ""
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
                    state?.subRegions?.find((el) => el._id === _id._id)
                      ?.description || ""
                  }
                  name="description"
                />
                <label>Includedetails</label>
                <TextArea
                  rows={6}
                  onChange={(e) =>
                    handleSubmit("includedetails", _id._id, e.target.value)
                  }
                  value={
                    state?.subRegions?.find((el) => el._id === _id._id)
                      ?.includedetails || ""
                  }
                  name="includedetails"
                />
                <label>Excludedetails</label>
                <TextArea
                  rows={6}
                  onChange={(e) =>
                    handleSubmit("excludedetails", _id._id, e.target.value)
                  }
                  value={
                    state?.subRegions?.find((el) => el._id === _id._id)
                      ?.excludedetails || ""
                  }
                  name="excludedetails"
                />
                <br />
                <br />
                <Upload
                  accept="image/*"
                  beforeUpload={(_, fileList) => {
                    handleChange("image", fileList, true);
                    return false;
                  }}
                  name="image"
                  multiple={true}
                >
                  <Button icon={<AiOutlineUpload />}>Click to Upload</Button>
                </Upload>
              </form>
            </Modal>
          </Space>

          <Popconfirm
            title="Delete the subregion"
            description="Are you sure to delete this subregion?"
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

  const fetchSubRegions = () => {
    setState({ ...state, error: null });
    getSubRegion()
      .then(({ data }) => setState({ ...state, subRegions: data, error: null }))
      .catch({ ...state, error: null });
  };

  useEffect(() => {
    fetchSubRegions();
  }, []);

  const mappedData = state?.subRegions?.map((item) => ({
    _id: item?._id,
    title: item?.title,
    description: item?.description,
    includedetails: item?.includedetails,
    excludedetails: item?.excludedetails,
    image: [
      <SubRegionImage region={item?.image?.[0]} url="uploads" />,
      <SubRegionImage region={item?.image?.[1]} url="uploads" />,
      <SubRegionImage region={item?.image?.[2]} url="uploads" />,
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
          <h1>Action to your sub-region-section</h1>
          <Button type="primary" onClick={showModal}>
            Add
          </Button>
          <Modal
            title="Add Sub-region"
            open={isModalOpen}
            onOk={handleOk}
            onCancel={handleCancel}
          >
            <form>
              <label>Title</label>
              <TextArea
                type="text"
                placeholder="Subregion title"
                onChange={(e) => handleChange("title", e.target.value)}
                value={state.newSubRegion.title}
                required
                rows={4}
                name="title"
              />
              <label>Description</label>
              <TextArea
                type="text"
                placeholder="Subregion description"
                onChange={(e) => handleChange("description", e.target.value)}
                value={state.newSubRegion.description}
                required
                rows={6}
                name="description"
              />
              <label>Includedetails</label>
              <TextArea
                type="text"
                placeholder="Subregion includedetails"
                onChange={(e) => handleChange("includedetails", e.target.value)}
                value={state.newSubRegion.includedetails}
                required
                rows={6}
                name="includedetails"
              />
              <label>Excludedetails</label>
              <TextArea
                type="text"
                placeholder="Subregion excludedetails"
                onChange={(e) => handleChange("excludedetails", e.target.value)}
                value={state.newSubRegion.excludedetails}
                required
                rows={6}
                name="excludedetails"
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
                fileList={state.newSubRegion.image}
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

export default Asubregion;
