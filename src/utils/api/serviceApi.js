import axios from "axios";
import { BaseUrl } from "../../resources/api/config";

export const getServices = () => {
  return axios({
    url: `${BaseUrl}/services`,
    method: "GET",
  });
};

export const postService = (title, description, files) => {
  const formData = new FormData();
  formData.append("title", title);
  formData.append("description", description);
  files.forEach((file) => {
    formData.append("image", file);
  });
  return axios.post(`${BaseUrl}/services`, formData, {
    headers: {
      "Content-Type": "multipart/form-data",
    },
  });
};

export const editService = (id, title, description, files) => {
  const formData = new FormData();
  formData.append("title", title);
  formData.append("description", description);
  files.forEach((file) => {
    formData.append("image", file);
  });
  return axios.patch(`${BaseUrl}/services/${id}`, formData, {
    headers: {
      "Content-Type": "multipart/form-data",
    },
  });
};

export const deleteService = (id) => {
  return axios({
    url: `${BaseUrl}/services/${id}`,
    method: "DELETE",
  });
};
