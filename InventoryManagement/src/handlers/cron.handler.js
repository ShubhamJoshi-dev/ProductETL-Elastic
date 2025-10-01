import inventoryLogger from "../libs/logger.libs.js";
import getGeminiInstance from "../helpers/gemini.helper.js";
import { getPrompt } from "../constant/llm.constant.js";
import getAPIInstance from "../helpers/api.helper.js";
import { IS_API_RESPONSE } from "../constant/api.constant.js";
import processETLJobs from "../service/cron.service.js";

async function cronCallback() {
  let currentErrorTrace = false;
  const currentDate = new Date().toDateString();
  inventoryLogger.info(`Starting the Cron Job At ${currentDate}`);
  return new Promise(async (resolve, reject) => {
    try {
      const geminiInstance = getGeminiInstance();

      const apiInstance = getAPIInstance();

      const productPrompt = getPrompt();

      const content = IS_API_RESPONSE
        ? await apiInstance.generateProduct()
        : await geminiInstance.generateContent(productPrompt);

      processETLJobs(content).then(() => {
        inventoryLogger.info(`Inventory Management Process Has been Completed`);
        resolve(true);
      });
    } catch (err) {
      currentErrorTrace = true;
      inventoryLogger.error(
        `Error Occured on the Cron Job Callback, Due To : ${JSON.stringify(
          err.message
        )}`
      );
    } finally {
      const completedDate = new Date().toDateString();
      inventoryLogger.info(`Cron Job Completed At ${completedDate}`);
    }
  });
}

export default cronCallback;
