import inventoryLogger from "../libs/logger.libs.js";
import dotenv from "dotenv";
dotenv.config();

export const getEnvValue = (key) => {
  let envValue = null;
  const isKeyExists = Object.prototype.hasOwnProperty(key, process.env);
  if (isKeyExists) {
    const errorMsg = `The Environment Variable Key is Missing ${key}`;
    inventoryLogger.info(errorMsg);
    throw new Error(errorMsg);
  }
  envValue = process.env[key];
  return envValue;
};
