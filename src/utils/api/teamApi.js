import axios from "axios";
import { BaseUrl } from "../../resources/api/config";

export const getTeams = () => {
  return axios({
    url: `${BaseUrl}/teams`,
    method: "GET",
  });
};
