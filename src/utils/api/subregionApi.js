import axios from "axios";
import { BaseUrl } from "../../resources/api/config";
import { handleMultipleImageUploads } from "../../controllers/firebase_storage";

export const getSubRegion = () => {
  return axios({
    url: `${BaseUrl}/subRegions`,
    method: "GET",
  });
};

export const postSubRegion = async (
  title,
  description,
  files,
  includedetails,
  excludedetails
) => {
  const imageUrls = await handleMultipleImageUploads(files, "subRegions");
  const formData = new FormData();
  formData.append("title", title);
  formData.append("description", description);
  formData.append("images", JSON.stringify(imageUrls));
  formData.append("includedetails", includedetails);
  formData.append("excludedetails", excludedetails);
  return axios.post(`${BaseUrl}/subRegions`, formData, {
    headers: {
      "Content-Type": "multipart/form-data",
    },
  });
};

export const editSubRegion = async (
  id,
  title,
  description,
  files,
  includedetails,
  excludedetails
) => {
  const imageUrls = await handleMultipleImageUploads(files, "subRegions");

  const formData = new FormData();
  formData.append("title", title);
  formData.append("description", description);
  if (imageUrls !== null) {
    formData.append("images", JSON.stringify(imageUrls));
  }

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
