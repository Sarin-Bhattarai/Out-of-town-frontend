import axios from "axios";
import { BaseUrl } from "../../resources/api/config";
import { handleImageUpload } from "../../controllers/firebase_storage";

export const getRegion = () => {
  return axios({
    url: `${BaseUrl}/regions`,
    method: "GET",
  });
};

export const postRegion = async (title, description, file) => {
  const imageUrl = await handleImageUpload(file, "regions");
  const formData = new FormData();
  formData.append("title", title);
  formData.append("description", description);
  formData.append("image", imageUrl);
  return axios.post(`${BaseUrl}/regions`, formData, {
    headers: {
      "Content-Type": "multipart/form-data",
    },
  });
};

export const editRegion = async (id, title, description, file) => {
  const imageUrl = await handleImageUpload(file, "regions");

  const formData = new FormData();
  formData.append("title", title);
  formData.append("description", description);
  if (imageUrl !== null) {
    formData.append("image", imageUrl);
  }

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
