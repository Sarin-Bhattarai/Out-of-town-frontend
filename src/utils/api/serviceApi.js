import axios from "axios";
import { BaseUrl } from "../../resources/api/config";

export const getServices = () => {
  return axios({
    url: `${BaseUrl}/services`,
    method: "GET",
  });
};
