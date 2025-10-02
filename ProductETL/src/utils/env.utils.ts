import dotenv from "dotenv";
dotenv.config();

export const getEnvValue = (key: string) => {
  let envValue = null;
  const isKeyAvailable = (objKeyß: string) =>
    Object.prototype.hasOwnProperty.call(process.env, key);
  if (isKeyAvailable(key)) {
    envValue = process.env[key];
  }
  if (!envValue) {
    throw new Error(`Environment Variable is Missing With the Key : ${key}`);
  }
  return envValue;
};
