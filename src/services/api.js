import axios from "axios";

export const api = axios.create({
  baseURL: "https://rocketnotes-api-86n1.onrender.com"
});