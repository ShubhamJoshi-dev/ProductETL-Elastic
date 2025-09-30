import cron from "node-cron";
import inventoryLogger from "./libs/logger.libs.js";
import { closeServer } from "./utils/process.utils.js";
import cronCallback from "./handlers/cron.handler.js";

async function startCronJobs() {
  try {
    cron.schedule("*/2 * * * *", cronCallback);
  } catch (err) {
    inventoryLogger.error(
      `Error Starting the Cron Job, Due To : ${JSON.stringify(err)}`
    );
    closeServer();
  }
}

export default startCronJobs;
