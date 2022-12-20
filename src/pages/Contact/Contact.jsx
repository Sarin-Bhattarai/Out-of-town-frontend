import "./contact.css";
import React, { useState } from "react";
import { Form, Input, Button, DatePicker, Select, Row } from "antd";
import { useForm } from "@formspree/react";
import { useNavigate } from "react-router-dom";
import moment from "moment";
import { MdCall, MdLocationOn, MdOutlineWatch } from "react-icons/md";
const { Option, OptGroup } = Select;

const Contact = () => {
  const navigate = useNavigate();
  const [state, handleSubmit] = useForm("mleayydw");
  const [trekkingId, setId] = useState(1);
  if (state.succeeded) {
    return (
      <div>
        <p>Thankyou your booking has been placed!</p>;
      </div>
    );
  }

  const TrekkingRegions = [
    {
      label: "Annapurna region",
      value: "Annapurna region",
      id: 1,
    },
    {
      label: "Everest region",
      value: "Everest region",
      id: 2,
    },
    {
      label: "Langtang region",
      value: "Langtang region",
      id: 3,
    },
    {
      label: "Kanchangunga region",
      value: "Kanchangunga region",
      id: 4,
    },
    {
      label: "Manaslu region",
      value: "Manaslu region",
      id: 5,
    },
    {
      label: "Far-western region",
      value: "Far-western region",
      id: 6,
    },
    {
      label: "Dhaulagiri region",
      value: "Dhaulagiri region",
      id: 7,
    },
    {
      label: "One day Trek",
      value: "One day Trek",
      id: 8,
    },
    {
      label: "Other Services",
      value: "Other Services",
      id: 9,
    },
  ];

  const TrekkingSubRegions = [
    {
      label: "Annapurna Basecamp Trek",
      value: "Annapurna Basecamp Trek",
      sub_id: 1,
    },
    {
      label: "Upper Mustang Trek",
      value: "Upper Mustang Trek",
      sub_id: 1,
    },
    {
      label: "Nar Phu Valley Trek",
      value: "Nar Phu Valley Trek",
      sub_id: 1,
    },
    {
      label: "Ghorepani Poonhill Trek",
      value: "Ghorepani Poonhill Trek",
      sub_id: 1,
    },
    {
      label: "Khopra Ridge Trek",
      value: "Khopra Ridge Trek",
      sub_id: 1,
    },
    {
      label: "Mardi Himal Base Camp",
      value: "Mardi Himal Base Camp",
      sub_id: 1,
    },
    {
      label: "Mohare and Khopre danda",
      value: "Mohare and Khopre danda",
      sub_id: 1,
    },
    {
      label: "Jomsom Muktinath Trek",
      value: "Jomsom Muktinath Trek",
      sub_id: 1,
    },
    {
      label: "Tilicho Pass Trek",
      value: "Tilicho Pass Trek",
      sub_id: 1,
    },
    {
      label: "Machhapuchre Model Trek",
      value: "Machhapuchre Model Trek",
      sub_id: 1,
    },
    {
      label: "Panchase Trek",
      value: "Panchase Trek",
      sub_id: 1,
    },
    {
      label: "Everest Base Camp",
      value: "Everest Base Camp",
      sub_id: 2,
    },
    {
      label: "Everest Three High Pass",
      value: "Everest Three High Pass",
      sub_id: 2,
    },
    {
      label: "Gokyo Chola Pass EBC Trek",
      value: "Gokyo Chola Pass EBC Trek",
      sub_id: 2,
    },
    {
      label: "Gokyo Lake Trek",
      value: "Gokyo Lake Trek",
      sub_id: 2,
    },
    {
      label: "Jiri to Everest Base Camp",
      value: "Jiri to Everest Base Camp",
      sub_id: 2,
    },
    {
      label: "Amadablam Base Camp Trek",
      value: "Amadablam Base Camp Trek",
      sub_id: 2,
    },
    {
      label: "Pikey Peak Trek",
      value: "Pikey Peak Trek",
      sub_id: 2,
    },
    {
      label: "Langtang Trek",
      value: "Langtang Trek",
      sub_id: 3,
    },
    {
      label: "Gosaikunda Trek",
      value: "Gosaikunda Trek",
      sub_id: 3,
    },
    {
      label: "Helambu Trek",
      value: "Helambu Trek",
      sub_id: 3,
    },
    {
      label: "Tamang Heritage Trek",
      value: "Tamang Heritage Trek",
      sub_id: 3,
    },
    {
      label: "Kanchangunga Circuit Trek",
      value: "Kanchangunga Circuit Trek",
      sub_id: 4,
    },
    {
      label: "Kanchangunga North Base Camp Trek",
      value: "Kanchangunga North Base Camp Trek",
      sub_id: 4,
    },
    {
      label: "Kanchangunga South Base Camp Trek",
      value: "Kanchangunga South Base Camp Trek",
      sub_id: 4,
    },
    {
      label: "Manaslu Circuit Trek",
      value: "Manaslu Circuit Trek",
      sub_id: 5,
    },
    {
      label: "Manaslu and Tsum Valley Trek",
      value: "Manaslu and Tsum Valley Trek",
      sub_id: 5,
    },
    {
      label: "Tsum Valley Trek",
      value: "Tsum Valley Trek",
      sub_id: 5,
    },
    {
      label: "Api base camp trek",
      value: "Api base camp trek",
      sub_id: 6,
    },
    {
      label: "Khaptad National park trek",
      value: "Khaptad National park trek",
      sub_id: 6,
    },
    {
      label: "Dolpo Trek",
      value: "Dolpo Trek",
      sub_id: 6,
    },
    {
      label: "Upper Dolpo Trek",
      value: "Upper Dolpo Trek",
      sub_id: 6,
    },
    {
      label: "Lower Dolpo Trek",
      value: "Lower Dolpo Trek",
      sub_id: 6,
    },
    {
      label: "Upper Dolpo Upper Mustang Trek",
      value: "Upper Dolpo Upper Mustang Trek",
      sub_id: 6,
    },
    {
      label: "Makalu Trek",
      value: "Makalu Trek",
      sub_id: 6,
    },
    {
      label: "Makalu Base Camp Trekking",
      value: "Makalu Base Camp Trekking",
      sub_id: 6,
    },
    {
      label: "Sherpani Pass Trekking",
      value: "Sherpani Pass Trekking",
      sub_id: 6,
    },
    {
      label: "Arun Valley Trekking",
      value: "Arun Valley Trekking",
      sub_id: 6,
    },
    {
      label: "Rolwaling Trek",
      value: "Rolwaling Trek",
      sub_id: 6,
    },
    {
      label: "Ganesh Himal Trek",
      value: "Ganesh Himal Trek",
      sub_id: 6,
    },
    {
      label: "Dhaulagiri Base camp trek",
      value: "Dhaulagiri Base camp trek",
      sub_id: 7,
    },
    {
      label: "Dhaulagiri circuit trek",
      value: "Dhaulagiri circuit trek",
      sub_id: 7,
    },
    {
      label: "Kathmandu City Sightseeing Tour",
      value: "Kathmandu City Sightseeing Tour",
      sub_id: 8,
    },
    {
      label: "Pokhara City Sightseeing Tour",
      value: "Pokhara City Sightseeing Tour",
      sub_id: 8,
    },
    {
      label: "Annapurna Circuit Half Biking Tour",
      value: "Annapurna Circuit Half Biking Tour",
      sub_id: 8,
    },
    {
      label: "Kathmandu One Day Biking Tour",
      value: "Kathmandu One Day Biking Tour",
      sub_id: 8,
    },
    {
      label: "Pokhara One day Biking Tour",
      value: "Pokhara One day Biking Tour",
      sub_id: 8,
    },
    {
      label: "Rafting",
      value: "Rafting",
      sub_id: 9,
    },
    {
      label: "Jungle Safari",
      value: "Jungle Safari",
      sub_id: 9,
    },
    {
      label: "Adventures",
      value: "Adventures",
      sub_id: 9,
    },
    {
      label: "Village Tour",
      value: "Village Tour",
      sub_id: 9,
    },
    {
      label: "Buddhist Circuit Trek",
      value: "Buddhist Circuit Trek",
      sub_id: 9,
    },
    {
      label: "Bhutan Tour",
      value: "Bhutan Tour",
      sub_id: 9,
    },
    {
      label: "Tibet Tour",
      value: "Tibet Tour",
      sub_id: 9,
    },
  ];

  return (
    <>
      <section className="contact">
        <div className="container">
          <div className="heading">
            <h3>Book/Contact Us</h3>
          </div>

          <div className="contact-grid">
            <div className="book-section">
              <Form onFinish={handleSubmit} layout="vertical">
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
                  <DatePicker
                    format={(value) => moment(value).format("MMM Do, h:mm a")}
                    style={{
                      width: "100%",
                    }}
                  />
                </Form.Item>

                <Form.Item
                  label="Full Name"
                  name="name"
                  rules={[
                    {
                      required: true,
                      message: "Please input your name!",
                    },
                  ]}
                >
                  <Input placeholder="Your full name" />
                </Form.Item>

                <Form.Item
                  label="Email"
                  name="email"
                  rules={[
                    {
                      required: true,
                      message: "Please input your email!",
                    },
                  ]}
                >
                  <Input placeholder="Your email" />
                </Form.Item>

                <Form.Item
                  label="No of people"
                  name="num of people"
                  rules={[
                    {
                      required: true,
                      message: "Please input number of people!",
                    },
                  ]}
                >
                  <Input
                    type="number"
                    min="1"
                    max="100"
                    placeholder="No of people"
                  />
                </Form.Item>
                <Form.Item
                  label="Contact number"
                  name="contact number"
                  rules={[
                    {
                      required: true,
                      message: "Please input your contact number!",
                    },
                  ]}
                >
                  <Input placeholder="Your contact number" />
                </Form.Item>

                <Form.Item
                  label="Trekking region"
                  name="trekking region"
                  rules={[
                    {
                      required: true,
                      message: "Please input your region!",
                    },
                  ]}
                >
                  <Select
                    placeholder="Select Trekking Region"
                    value={trekkingId}
                    onChange={(e) => setId(e)}
                  >
                    {TrekkingRegions?.map((t, i) => {
                      return (
                        <Option key={t?.id} value={t?.id}>
                          {t.label}
                        </Option>
                      );
                    })}
                  </Select>
                </Form.Item>

                <Form.Item
                  label="Trekking sub-region"
                  name="trekking sub-region"
                  rules={[
                    {
                      required: true,
                      message: "Please input your sub-region!",
                    },
                  ]}
                >
                  <Select placeholder="Select Trekking Sub-Region">
                    {TrekkingSubRegions?.filter(
                      (ts) => ts.sub_id === trekkingId
                    )?.map((sr, i) => {
                      return (
                        <Option key={i} value={sr.value}>
                          {sr.label}
                        </Option>
                      );
                    })}
                  </Select>
                </Form.Item>

                <Form.Item>
                  <Button
                    style={{
                      width: "100%",
                      marginTop: "10px",
                      backgroundColor: "#4caece",
                      color: "#fff",
                      border: "none",
                    }}
                    htmlType="submit"
                  >
                    Book Now
                  </Button>
                </Form.Item>
              </Form>
            </div>
            <div className="contact-section">
              <div class="embed-responsive">
                <iframe
                  title=" "
                  height="700px"
                  width="110%"
                  className="embed-responsive-item"
                  src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d1618.3845444618014!2d83.95955936943169!3d28.2170399212728!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x3995956234c35749%3A0x1d62cdd8fecab286!2sOut%20of%20Town%20Adventure%20Pvt.%20Ltd!5e0!3m2!1sen!2snp!4v1659759531597!5m2!1sen!2snp"
                  data-map="JTdCJTIycG9zaXRpb25UeXBlJTIyJTNBJTIybWFwLWVtYmVkJTIyJTJDJTIyYWRkcmVzcyUyMiUzQSUyMk1hbmhhdHRhbiUyMiUyQyUyMnpvb20lMjIlM0FudWxsJTJDJTIydHlwZUlkJTIyJTNBJTIycm9hZCUyMiUyQyUyMmxhbmclMjIlM0FudWxsJTJDJTIyYXBpS2V5JTIyJTNBbnVsbCUyQyUyMm1hcmtlcnMlMjIlM0ElNUIlNUQlMkMlMjJlbWJlZCUyMiUzQSUyMmh0dHBzJTNBJTJGJTJGd3d3Lmdvb2dsZS5jb20lMkZtYXBzJTJGZW1iZWQlM0ZwYiUzRCExbTE4ITFtMTIhMW0zITFkMTYxOC4zODQ1NDQ0NjE4MDE0ITJkODMuOTU5NTU5MzY5NDMxNjkhM2QyOC4yMTcwMzk5MjEyNzI4ITJtMyExZjAhMmYwITNmMCEzbTIhMWkxMDI0ITJpNzY4ITRmMTMuMSEzbTMhMW0yITFzMHgzOTk1OTU2MjM0YzM1NzQ5JTI1M0EweDFkNjJjZGQ4ZmVjYWIyODYhMnNPdXQlMjUyMG9mJTI1MjBUb3duJTI1MjBBZHZlbnR1cmUlMjUyMFB2dC4lMjUyMEx0ZCE1ZTAhM20yITFzZW4hMnNucCE0djE2NTk3NTk1MzE1OTchNW0yITFzZW4hMnNucCUyMiU3RA=="
                />
              </div>
            </div>
          </div>

          <div className="contact-info">
            <Row
              style={{
                justifyContent: "space-between",
              }}
            >
              <div className="small-details">
                <Row>
                  <MdCall size={25} className="contact-icon" />
                  &nbsp;&nbsp;
                  <h1>CALL US</h1>
                </Row>
                <p>+977-9825107555, 9825107555</p>
                <p>061-451121</p>
              </div>
              <div className="small-details">
                <Row>
                  <MdLocationOn size={25} className="contact-icon" />
                  &nbsp;&nbsp;
                  <h1>LOCATION</h1>
                </Row>
                <p>Lakeside, 6 Pokhara, Khahare, Nepal</p>
                <p>Nahar marga</p>
              </div>
              <div className="small-details">
                <Row>
                  <MdOutlineWatch size={25} className="contact-icon" />
                  &nbsp;&nbsp;
                  <h1>BUSINESS HOURS</h1>
                </Row>
                <p>Open 24 hours, 364 days</p>
              </div>
            </Row>
          </div>
        </div>
      </section>
    </>
  );
};

export default Contact;
