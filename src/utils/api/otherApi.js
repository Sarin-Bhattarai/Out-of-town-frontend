import axios from "axios";
import { BaseUrl } from "../../resources/api/config";

export const getOther = () => {
  return axios({
    url: `${BaseUrl}/others`,
    method: "GET",
  });
};

export const postOther = (title, file) => {
  const formData = new FormData();
  formData.append("title", title);
  formData.append("image", file);
  return axios.post(`${BaseUrl}/others`, formData, {
    headers: {
      "Content-Type": "multipart/form-data",
    },
  });
};

export const editOther = (id, title, file) => {
  const formData = new FormData();
  formData.append("title", title);
  formData.append("image", file);
  return axios.patch(`${BaseUrl}/others/${id}`, formData, {
    headers: {
      "Content-Type": "multipart/form-data",
    },
  });
};

export const deleteOther = (id) => {
  return axios({
    url: `${BaseUrl}/others/${id}`,
    method: "DELETE",
  });
};
