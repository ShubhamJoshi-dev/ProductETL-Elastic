import { productConfig, queueExchange } from "../../constant/queue.constant.js";
import inventoryLogger from "../../libs/logger.libs.js";

async function publishProductETL(channel, payload) {
  return new Promise(async (resolve, reject) => {
    try {
      const { name, exchange } = productConfig;
      const bufferContent = Buffer.from(JSON.stringify(payload));
      await channel.assertExchange(exchange, queueExchange["DIRECT"], {
        durable: true,
      });
      await channel.assertQueue(name, { durable: true });
      await channel.sendToQueue(name, bufferContent);
      inventoryLogger.info(
        `Message Published to the Product ETL With the Payload : ${JSON.stringify(
          payload
        )}`
      );
      resolve(true);
    } catch (err) {
      inventoryLogger.error(
        `Error Publishing the Product ETL, Due To : ${JSON.stringify(
          err.message
        )}`
      );
      reject(false);
    }
  });
}

export default publishProductETL;
