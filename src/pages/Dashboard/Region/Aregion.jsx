import React, { useState, useEffect } from "react";
import Admin from "../../../resources/images/admin.jpg";
import { Row, Button, Modal, Table, message, Space, Input, Upload } from "antd";
import { AiFillEdit, AiFillDelete, AiOutlineUpload } from "react-icons/ai";
import { getRegion } from "../../../utils/api/regionApi";
import ShowImage from "../../../utils/data/showImage";
const { TextArea } = Input;

const Aregion = () => {
  const [state, setState] = useState({
    regions: [],
    error: null,
    modalVisible: false,
  });
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

  const fetchRegions = () => {
    setState({ ...state, error: null });
    getRegion()
      .then(({ data }) => setState({ ...state, regions: data, error: null }))
      .catch({ ...state, error: null });
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
      title: "Image",
      dataIndex: "image",
      key: "image",
      render: (image) => <div>{image}</div>,
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
              title="Edit Region"
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
                  value={state?.regions?.map((element) => element?.title)}
                  name="title"
                />
                <label>Description</label>
                <TextArea
                  rows={6}
                  // onChange={(e) =>
                  //   handleChange("description", e.target.value)
                  // }
                  value={state?.regions?.map((element) => element?.description)}
                  name="description"
                />
                <br />
                <br />
                <Upload>
                  <Button icon={<AiOutlineUpload />}>Click to Upload</Button>
                </Upload>
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

  useEffect(() => {
    fetchRegions();
  }, []);

  const mappedData = state?.regions?.map((item) => ({
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
              <TextArea rows={4} name="title" />
              <label>Description</label>
              <TextArea rows={6} name="description" />
              <br />
              <br />
              <label>Image</label>
              <br />
              <br />
              <Upload>
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
