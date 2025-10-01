import getRabbitMQInstance from "../rabbitmq/main.queue.js";
import inventoryLogger from "../libs/logger.libs.js";
import publishProductETL from "../rabbitmq/publisher/product.publisher.js";
import { transformAPIPayload } from "../transform/cron.transform.js";

async function processETLJobs(payload) {
  try {
    const rabbitMQInstance = getRabbitMQInstance();
    const transformPayload = transformAPIPayload(payload);
    const rabbitMQChannel = await rabbitMQInstance.getRabbitMQChannel();
    const isPublishStatus = await publishProductETL(
      rabbitMQChannel,
      transformPayload
    );
    const isNotPublished =
      typeof isPublishStatus === "boolean" && !isPublishStatus;

    if (isNotPublished) {
      inventoryLogger.info(`Error Publishing the Payload to the Product ETL`);
      throw new Error(`Error Publishing the Payload to the Product ETL`);
    }
    return;
  } catch (err) {
    inventoryLogger.error(
      `Error Processing and Starting the ETL Jobs , Due To : ${JSON.stringify(
        err.message
      )}`
    );
    throw new Error(err.message);
  }
}

export default processETLJobs;
