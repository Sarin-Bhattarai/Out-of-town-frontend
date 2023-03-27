import axios from "axios";
import { BaseUrl } from "../../resources/api/config";

export const getHomeDesc = () => {
  return axios({
    url: `${BaseUrl}/descs`,
    method: "GET",
  });
};

export const createDesc = (payload) => {
  return axios({
    url: `${BaseUrl}/descs`,
    method: "POST",
    data: payload,
  });
};

export const editHomeDesc = (id, data) => {
  return axios({
    url: `${BaseUrl}/descs/${id}`,
    method: "PATCH",
    data: data,
  });
};

export const deleteDesc = (id) => {
  return axios({
    url: `${BaseUrl}/descs/${id}`,
    method: "DELETE",
  });
};
