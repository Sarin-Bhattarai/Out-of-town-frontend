import axios from "axios";
import { BaseUrl } from "../../resources/api/config";
import { handleImageUpload } from "../../controllers/firebase_storage";

export const getTeams = () => {
  return axios({
    url: `${BaseUrl}/teams`,
    method: "GET",
  });
};

export const postTeam = async (name, role, file) => {
  const imageUrl = await handleImageUpload(file, "teams");
  const formData = new FormData();
  formData.append("name", name);
  formData.append("role", role);
  formData.append("image", imageUrl);
  return axios.post(`${BaseUrl}/teams`, formData, {
    headers: {
      "Content-Type": "multipart/form-data",
    },
  });
};

export const editTeam = async (id, name, role, file) => {
  const imageUrl = await handleImageUpload(file, "teams");
  const formData = new FormData();
  formData.append("name", name);
  formData.append("role", role);
  formData.append("image", imageUrl);
  return axios.patch(`${BaseUrl}/teams/${id}`, formData, {
    headers: {
      "Content-Type": "multipart/form-data",
    },
  });
};

export const deleteTeam = (id) => {
  return axios({
    url: `${BaseUrl}/teams/${id}`,
    method: "DELETE",
  });
};
