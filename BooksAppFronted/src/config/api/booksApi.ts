import axios from "axios";

export const booksApi = axios.create({
  // baseURL:"http://localhost:3000/api/v1"
  baseURL:"http://10.0.2.2:3000/api/v1"
});
