import axios from "axios";
import { BaseUrl } from "../../resources/api/config";

export const getSubRegion = () => {
  return axios({
    url: `${BaseUrl}/subRegions`,
    method: "GET",
  });
};
