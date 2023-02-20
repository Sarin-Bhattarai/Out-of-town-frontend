import axios from "axios";
import { BaseUrl } from "../../resources/api/config";

//for getting all the faq
export const getFaq = () => {
  return axios({
    url: `${BaseUrl}/faqs`,
    method: "GET",
  });
};

//for creating faq
export const createFaq = (payload) => {
  return axios({
    url: `${BaseUrl}/faqs`,
    method: "POST",
    data: payload,
  });
};
