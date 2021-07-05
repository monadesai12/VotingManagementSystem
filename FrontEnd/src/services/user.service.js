import axios from "axios";
import authHeader from "./auth-header";

const API_URL = "http://localhost:8080/";

const getPublicContent = () => {
  return axios.get(API_URL + "all");
};

const getVoterBoard = () => {
  return axios.get(API_URL + "user", { headers: authHeader() });
};

const getManagerBoard = () => {
  return axios.get(API_URL + "candidate", { headers: authHeader() });
};

const getAdminBoard = () => {
  return axios.get(API_URL + "admin", { headers: authHeader() });
};

export default {
  getPublicContent,
  getVoterBoard,
  getManagerBoard,
  getAdminBoard,
};