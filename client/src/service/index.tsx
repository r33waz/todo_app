import axios from "axios";

const ApiInstance = (headers: { "Content-Type": string }) => {
  const token = localStorage.getItem("token"); // Retrieve the token from local storage

  return axios.create({
    baseURL: `${import.meta.env.VITE_SERVER_URL}`,
    timeout: 5000,
    headers: {
      ...headers,
      Authorization: token ? `Bearer ${token}` : "", 
    },
  });
};

const main_url = ApiInstance({
  "Content-Type": "application/json",
});

const photo_url = ApiInstance({
  "Content-Type": "multipart/form-data",
});

export { main_url, photo_url };
