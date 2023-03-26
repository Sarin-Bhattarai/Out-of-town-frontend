import axios from "axios";
import { BaseUrl } from "../../resources/api/config";

export const getTeams = () => {
  return axios({
    url: `${BaseUrl}/teams`,
    method: "GET",
  });
};

export const postTeam = (name, role, file) => {
  const formData = new FormData();
  formData.append("name", name);
  formData.append("role", role);
  formData.append("image", file);
  return axios.post(`${BaseUrl}/teams`, formData, {
    headers: {
      "Content-Type": "multipart/form-data",
    },
  });
};

export const editTeam = (id, name, role, file) => {
  const formData = new FormData();
  formData.append("name", name);
  formData.append("role", role);
  formData.append("image", file);
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
