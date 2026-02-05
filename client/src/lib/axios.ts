import axios from "axios";
import { Server } from "./server";

export const api = axios.create({
  baseURL: Server.baseURL(),
  timeout: 5000,
});
