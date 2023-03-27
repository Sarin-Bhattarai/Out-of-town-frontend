import axios from "axios";
import { BaseUrl } from "../../resources/api/config";

//for getting all the furtherDetails
export const getFurther = () => {
  return axios({
    url: `${BaseUrl}/furtherDetails`,
    method: "GET",
  });
};

//for creating furtherDetails
export const createFurther = (payload) => {
  return axios({
    url: `${BaseUrl}/furtherDetails`,
    method: "POST",
    data: payload,
  });
};

//for editing furtherDetails
export const editFurther = (id, data) => {
  return axios({
    url: `${BaseUrl}/furtherDetails/${id}`,
    method: "PATCH",
    data: data,
  });
};

//for deleting furtherDetails
export const deleteFurther = (id) => {
  return axios({
    url: `${BaseUrl}/furtherDetails/${id}`,
    method: "DELETE",
  });
};
