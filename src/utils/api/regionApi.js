import axios from "axios";
import { BaseUrl } from "../../resources/api/config";

export const getRegion = () => {
  return axios({
    url: `${BaseUrl}/regions`,
    method: "GET",
  });
};

export const postRegion = (title, description, image) => {
  const formData = new FormData();
  formData.append("title", title);
  formData.append("description", description);
  formData.append("image", image);
  return axios.post(`${BaseUrl}/regions`, formData, {
    headers: {
      "Content-Type": "multipart/form-data",
    },
  });
};
