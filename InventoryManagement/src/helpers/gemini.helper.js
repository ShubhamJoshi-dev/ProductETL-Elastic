import { GoogleGenerativeAI } from "@google/generative-ai";
import { getEnvValue } from "../utils/env.utils.js";
import inventoryLogger from "../libs/logger.libs.js";

class GeminiHelper {
  apiKey;

  constructor() {
    this.apiKey = getEnvValue("GEMINI_API_KEY");
  }

  async connectGemini() {
    const genAi = new GoogleGenerativeAI(this.apiKey);
    return genAi;
  }

  async getModel() {
    const genAi = await this.connectGemini();
    console.log(genAi.apiKey);
    const model = genAi.getGenerativeModel({
      model: getEnvValue("GEMINI_MODEL"),
    });
    return model;
  }

  async generateContent(prompt) {
    let retryCount = 3;
    let retryStatus = true;

    while (retryCount > 0 && retryStatus) {
      try {
        const geminiModel = await this.getModel();
        const geminiContent = await geminiModel.generateContent(prompt);
        const response = await geminiContent.response;
        const text = response.text();
        return text;
      } catch (err) {
        inventoryLogger.error(
          `Error Generating Content From the LLM Service, Due to ${err.message}`
        );
        const isMaximumRetry = retryCount.toString().startsWith("0");
        if (isMaximumRetry) {
          const errorMsg = `Maximum Retry Exceeded, Terminating the LLM Service`;
          inventoryLogger.info(errorMsg);
          throw new Error(errorMsg);
        }
        retryCount = retryCount - 1;
        continue;
      }
    }
  }
}

const getGeminiInstance = () => {
  return new GeminiHelper();
};

export default getGeminiInstance;
