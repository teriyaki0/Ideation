import crypto from "crypto";
import { config } from "../lib/config";

export const getPasswordHash = (password: string) => {
  return crypto
    .createHash("sha256")
    .update(`${config.PASSWORD_SALT}-${password}`)
    .digest("hex");
};
