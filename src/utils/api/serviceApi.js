import axios from "axios";
import { BaseUrl } from "../../resources/api/config";
import { handleMultipleImageUploads } from "../../controllers/firebase_storage";

export const getServices = () => {
  return axios({
    url: `${BaseUrl}/services`,
    method: "GET",
  });
};

export const postService = async (title, description, files) => {
  const imageUrls = await handleMultipleImageUploads(files, "services");
  const formData = new FormData();
  formData.append("title", title);
  formData.append("description", description);
  formData.append("images", JSON.stringify(imageUrls));
  return axios.post(`${BaseUrl}/services`, formData, {
    headers: {
      "Content-Type": "multipart/form-data",
    },
  });
};

export const editService = async (id, title, description, files) => {
  const imageUrls = await handleMultipleImageUploads(files, "services");
  const formData = new FormData();
  formData.append("title", title);
  formData.append("description", description);
  if (imageUrls !== null) {
    formData.append("images", JSON.stringify(imageUrls));
  }

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
