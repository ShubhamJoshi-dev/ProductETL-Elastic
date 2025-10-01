import axios from "axios";
import inventoryLogger from "../libs/logger.libs.js";
import { getEnvValue } from "../utils/env.utils.js";

class APIHelper {
  constructor() {
    this.api_url = getEnvValue("PRODUCT_API");
  }

  async generateProduct() {
    try {
      const apiResponse = await axios.get(this.api_url);
      return apiResponse.data;
    } catch (err) {
      inventoryLogger.error(
        `Error Generating the Product From the API, Due To : ${JSON.stringify(
          err
        )}`
      );
    }
  }
}

const getAPIInstance = () => {
  return new APIHelper();
};

export default getAPIInstance;
