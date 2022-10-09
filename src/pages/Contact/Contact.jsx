import "./contact.css";
import React from "react";
import { Form, Input, Button, DatePicker } from "antd";
const { RangePicker } = DatePicker;
const { TextArea } = Input;

const Contact = () => {
  return (
    <>
      <section className="contact">
        <div className="container">
          <div className="heading">
            <h3>Book/Contact Us</h3>
          </div>

          <div className="contact-grid">
            <div className="book-section">
              <Form layout="vertical">
                <Form.Item
                  label="Date"
                  name="date"
                  rules={[
                    {
                      required: true,
                      message: "Please input your date!",
                    },
                  ]}
                >
                  <DatePicker />
                </Form.Item>
              </Form>
            </div>
            <div className="contact-section"></div>
          </div>
        </div>
      </section>
    </>
  );
};

export default Contact;
