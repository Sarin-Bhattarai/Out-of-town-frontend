import axios from "axios";
import { BaseUrl } from "../../resources/api/config";
import { handleImageUpload } from "../../controllers/firebase_storage";

export const getOther = () => {
  return axios({
    url: `${BaseUrl}/others`,
    method: "GET",
  });
};

export const postOther = async (title, file) => {
  const imageUrl = await handleImageUpload(file, "others");
  const formData = new FormData();
  formData.append("title", title);
  formData.append("image", imageUrl);
  return axios.post(`${BaseUrl}/others`, formData, {
    headers: {
      "Content-Type": "multipart/form-data",
    },
  });
};

export const editOther = async (id, title, file) => {
  const imageUrl = await handleImageUpload(file, "others");
  const formData = new FormData();
  formData.append("title", title);
  if (imageUrl !== null) {
    formData.append("image", imageUrl);
  }

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
