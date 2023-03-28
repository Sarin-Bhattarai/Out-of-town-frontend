import "./other.css";
import React, { useState, useEffect } from "react";
import ShowImage from "../../utils/data/showImage";
import { getOther } from "../../utils/api/otherApi";
import { useForm } from "@formspree/react";
import { Form, Input, Button } from "antd";
import { useNavigate } from "react-router-dom";
const { TextArea } = Input;

const Other = () => {
  const navigate = useNavigate();
  const [query, handleSubmit] = useForm("xaykwvop");
  const [state, setState] = useState({
    others: [],
    error: null,
  });

  useEffect(() => {
    fetchOthers();
  }, []);

  if (query.succeeded) {
    return (
      <>
        <div>
          <p>Thankyou your message has been sent!</p>;
        </div>
        {setTimeout(() => {
          navigate("/");
        }, 1000)}
      </>
    );
  }

  const fetchOthers = () => {
    setState({ ...state, error: null });
    getOther()
      .then(({ data }) => setState({ ...state, others: data, error: null }))
      .catch({ ...state, error: null });
  };

  return (
    <section className="other">
      <div className="container">
        <div className="heading">
          <h3>Other</h3>
        </div>
        <h1
          style={{
            textAlign: "center",
            fontSize: "32px",
          }}
        >
          Other services from us
        </h1>
        <div className="trekking-grid">
          {state?.others?.map((o) => {
            return (
              <>
                <div className="grid-details">
                  <ShowImage region={o?.image} url="uploads" />
                  <h1>{o?.title}</h1>
                </div>
              </>
            );
          })}
        </div>
        <div className="query-section">
          <div className="heading">
            <h3>Ask anything regarding our services</h3>
          </div>
          <div className="query">
            <Form onFinish={handleSubmit} layout="vertical">
              <Form.Item
                rules={[
                  {
                    required: true,
                    message: "Please input your message!",
                  },
                ]}
                name="querymessage"
              >
                <TextArea
                  style={{
                    borderRadius: "4px",
                    marginTop: "10px",
                  }}
                  rows={6}
                />
              </Form.Item>
              <Form.Item>
                <Button
                  style={{
                    width: "20%",
                    marginTop: "10px",
                    backgroundColor: "#4caece",
                    color: "#fff",
                    border: "none",
                    float: "right",
                  }}
                  htmlType="submit"
                >
                  Send
                </Button>
              </Form.Item>
            </Form>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Other;
