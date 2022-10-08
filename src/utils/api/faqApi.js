import axios from "axios";
import { BaseUrl } from "../../resources/api/config";

export const getFaq = () => {
  return axios({
    url: `${BaseUrl}/faqs`,
    method: "GET",
  });
};
