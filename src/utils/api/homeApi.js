import axios from "axios";
import { BaseUrl } from "../../resources/api/config";

export const getHomeDesc = () => {
  return axios({
    url: `${BaseUrl}/descs`,
    method: "GET",
  });
};
