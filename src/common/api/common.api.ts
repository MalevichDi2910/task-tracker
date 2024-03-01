import axios from "axios";

export const instance = axios.create({
  baseURL: "https://social-network.samuraijs.com/api/1.1/",
  withCredentials: true,
  headers: {
    "API-KEY": "d6f43d55-8bdb-497b-b4da-434fe1c6ca7f",
  },
});
