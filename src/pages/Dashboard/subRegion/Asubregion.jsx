import React, { useState, useEffect } from "react";
import Admin from "../../../resources/images/admin.jpg";
import { AiFillEdit, AiFillDelete, AiOutlineUpload } from "react-icons/ai";
import { Row, Button, Modal, Table, message, Space, Input, Upload } from "antd";
import ShowImage from "../../../utils/data/showImage";
import { getSubRegion } from "../../../utils/api/subregionApi";
const { TextArea } = Input;

const Asubregion = () => {
  const [state, setState] = useState({
    subRegions: [],
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
              title="Edit Sub-Region"
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
                  value={state?.subRegions?.map((element) => element?.title)}
                  name="title"
                />
                <label>Description</label>
                <TextArea
                  rows={6}
                  // onChange={(e) =>
                  //   handleChange("description", e.target.value)
                  // }
                  value={state?.subRegions?.map(
                    (element) => element?.description
                  )}
                  name="description"
                />
                <label>Includedetails</label>
                <TextArea
                  rows={6}
                  // onChange={(e) =>
                  //   handleChange("description", e.target.value)
                  // }
                  value={state?.subRegions?.map(
                    (element) => element?.includedetails
                  )}
                  name="includedetails"
                />
                <label>Excludedetails</label>
                <TextArea
                  rows={6}
                  // onChange={(e) =>
                  //   handleChange("description", e.target.value)
                  // }
                  value={state?.subRegions?.map(
                    (element) => element?.excludedetails
                  )}
                  name="excludedetails"
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
    title: item?.title,
    description: item?.description,
    includedetails: item?.includedetails,
    excludedetails: item?.excludedetails,
    image: [
      <ShowImage region={item?.image?.[0]} url="uploads" />,
      <ShowImage region={item?.image?.[1]} url="uploads" />,
      <ShowImage region={item?.image?.[2]} url="uploads" />,
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
              <TextArea rows={4} name="title" />
              <label>Description</label>
              <TextArea rows={6} name="description" />
              <label>Includedetails</label>
              <TextArea rows={6} name="includedetails" />
              <label>Excludedetails</label>
              <TextArea rows={6} name="excludedetails" />
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

export default Asubregion;
