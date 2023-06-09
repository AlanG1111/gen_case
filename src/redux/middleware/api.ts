import axios, { AxiosResponse } from "axios";
import { API_CONFIG } from "./config";

const ApiService = {
  apiCall: <T>({
    baseURL = API_CONFIG.BASE_URL,
    endpoint = "",
    method = "GET",
    query = {},
    headers = null,
  }: {
    baseURL?: string;
    endpoint: string;
    method: string;
    query?: any;
    transformRequest?: any;
    headers?: { [key: string]: string } | null;
  }): Promise<AxiosResponse<T>> => {
    try {
      const api = axios.create({
        baseURL,
        headers: headers || {},
      });

      api.interceptors.request.use(async (config) => {
        try {
          const tokenApi = axios.create({
            baseURL: API_CONFIG.BASE_URL,
          });
          const { data } = await tokenApi.get<
            string,
            AxiosResponse<any, any>,
            any
          >("/auth/anonymous?platform=subscriptions");
          config.headers["Authorization"] = `Bearer ${data.token}`;
        } catch (error) {
          return Promise.reject(error);
        }
        return config;
      });

      api.interceptors.response.use(
        (response) => response,
        (error) => {
          if (error.response.status !== 401) return Promise.reject(error);
        }
      );

      switch (method) {
        case "GET":
          return api.get(endpoint, query);
        case "POST":
          return api.post(endpoint, query);
        case "PUT":
          return api.put(endpoint, query);
        case "DELETE":
          return api.delete(endpoint, query);
        default:
          return api.get(endpoint, query);
      }
    } catch (e) {
      throw e;
    }
  },
};
export default ApiService;
