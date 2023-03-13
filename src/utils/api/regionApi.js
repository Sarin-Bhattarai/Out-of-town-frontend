import axios from "axios";
import { BaseUrl } from "../../resources/api/config";

export const getRegion = () => {
  return axios({
    url: `${BaseUrl}/regions`,
    method: "GET",
  });
};

export const postRegion = (title, description, file) => {
  const formData = new FormData();
  formData.append("title", title);
  formData.append("description", description);
  formData.append("image", file);
  return axios.post(`${BaseUrl}/regions`, formData, {
    headers: {
      "Content-Type": "multipart/form-data",
    },
  });
};

export const editRegion = (id, title, description, file) => {
  const formData = new FormData();
  formData.append("title", title);
  formData.append("description", description);
  formData.append("image", file);
  return axios.patch(`${BaseUrl}/regions/${id}`, formData, {
    headers: {
      "Content-Type": "multipart/form-data",
    },
  });
};

export const deleteRegion = (id) => {
  return axios({
    url: `${BaseUrl}/regions/${id}`,
    method: "DELETE",
  });
};
