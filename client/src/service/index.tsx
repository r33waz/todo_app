import axios from "axios";

const ApiInstance = (headers: { "Content-Type": string }) => {
  return axios.create({
    baseURL: "",
    timeout: 5000,
    headers,
    withCredentials: true,
  });
};

const main_url = ApiInstance({
  "Content-Type": "application/json",
});

const photo_url = ApiInstance({
  "Content-Type": "multipart/form-data",
});

export { main_url, photo_url };
