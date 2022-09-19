import axios from "axios";
import { BaseUrl } from "../../resources/api/config";

export const getHomeDesc = () => {
  console.log(BaseUrl);
  return axios({
    url: `${BaseUrl}/descs`,
    method: "GET",
  });
};
