import jwt from "jsonwebtoken";
import { config } from "../lib/config";

export const singJWT = (id: string) => {
  return jwt.sign({ id }, config.JWT_SECRET, { expiresIn: "1d" });
};
