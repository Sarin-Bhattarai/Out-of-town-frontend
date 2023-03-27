import axios from "axios";
import { BaseUrl } from "../../resources/api/config";

export const getSubRegion = () => {
  return axios({
    url: `${BaseUrl}/subRegions`,
    method: "GET",
  });
};

export const postSubRegion = (
  title,
  description,
  files,
  includedetails,
  excludedetails
) => {
  const formData = new FormData();
  formData.append("title", title);
  formData.append("description", description);
  files.forEach((file) => {
    formData.append("image", file);
  });
  formData.append("includedetails", includedetails);
  formData.append("excludedetails", excludedetails);
  return axios.post(`${BaseUrl}/subRegions`, formData, {
    headers: {
      "Content-Type": "multipart/form-data",
    },
  });
};

export const editSubRegion = (
  id,
  title,
  description,
  files,
  includedetails,
  excludedetails
) => {
  const formData = new FormData();
  formData.append("title", title);
  formData.append("description", description);
  files.forEach((file) => {
    formData.append("image", file);
  });
  formData.append("includedetails", includedetails);
  formData.append("excludedetails", excludedetails);
  return axios.patch(`${BaseUrl}/subRegions/${id}`, formData, {
    headers: {
      "Content-Type": "multipart/form-data",
    },
  });
};

export const deleteSubRegion = (id) => {
  return axios({
    url: `${BaseUrl}/subRegions/${id}`,
    method: "DELETE",
  });
};
