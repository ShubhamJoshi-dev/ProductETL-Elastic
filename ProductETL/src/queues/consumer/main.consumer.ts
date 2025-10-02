import amqp from "amqplib";
import { productExtractorConsumer } from "./product.extractor.consumer";
import productEtlLogger from "../../libs/logger.libs";

const consumers = {
  "product-consumer": productExtractorConsumer,
};

async function startAllConsumers() {
  for (const [key, value] of Object.entries(consumers)) {
    const isKeyFunction = typeof value === "function";
    if (isKeyFunction) {
      productEtlLogger.info(
        `Starting the ${key} at ${new Date().toDateString()}`
      );
      await value();
    }
  }
}

export default startAllConsumers;
