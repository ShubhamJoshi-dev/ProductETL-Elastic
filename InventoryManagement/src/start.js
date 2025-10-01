import cron from "node-cron";
import inventoryLogger from "./libs/logger.libs.js";
import { cronTimeConfig } from "./constant/cron.constant.js";
import { closeServer } from "./utils/process.utils.js";
import cronCallback from "./handlers/cron.handler.js";

async function startCronJobs() {
  try {
    cron.schedule(cronTimeConfig["10Second"], cronCallback);
  } catch (err) {
    inventoryLogger.error(
      `Error Starting the Cron Job, Due To : ${JSON.stringify(err)}`
    );
    closeServer();
  }
}

export default startCronJobs;
