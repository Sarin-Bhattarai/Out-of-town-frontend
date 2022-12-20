import axios from "axios";
import { BaseUrl } from "../../resources/api/config";

export const getRegion = () => {
  return axios({
    url: `${BaseUrl}/regions`,
    method: "GET",
  });
};
