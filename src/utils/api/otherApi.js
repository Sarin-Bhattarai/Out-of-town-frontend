import axios from "axios";
import { BaseUrl } from "../../resources/api/config";

export const getOther = () => {
  return axios({
    url: `${BaseUrl}/others`,
    method: "GET",
  });
};
