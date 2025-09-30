import inventoryLogger from "../libs/logger.libs.js";

async function cronCallback() {
  const currentDate = new Date().toDateString();
  inventoryLogger.info(`Starting the Cron Job At ${currentDate}`);
}

export default cronCallback;
