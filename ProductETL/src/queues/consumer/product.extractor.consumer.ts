import amqp from "amqplib";
import productEtlLogger from "../../libs/logger.libs";
import { queueExchange, productConfig } from "../../constant/queue.constant";
import queueInstance from "../main.queue";
import productExtractorHandler from "../handlers/product.extractor.handler";

async function productExtractorConsumer() {
  const rabbitmqInstance = queueInstance();
  try {
    const { name, exchange } = productConfig;
    const queueChannel = await rabbitmqInstance.getChannel();
    await queueChannel?.assertExchange(exchange, queueExchange["DIRECT"], {
      durable: true,
    });
    await queueChannel?.assertQueue(name, { durable: true });
    await queueChannel?.consume(
      name,
      async (message: amqp.ConsumeMessage | null) => {
        try {
          if (message?.content) {
            const parseContent = JSON.parse(message.content.toString());
            await productExtractorHandler(parseContent);
          }
        } catch (err) {
          productEtlLogger.error(`Error Consuming the Message of the RabbitMQ`);
        } finally {
          if (queueChannel && message) {
            productEtlLogger.info(
              `Acknowledging the Queue Message At : ${new Date().toDateString()}`
            );
            queueChannel.ack(message);
          }
        }
      }
    );
  } catch (err: any) {
    const errorMessage = `Error Extracting the Product Due To : ${JSON.stringify(
      err.message
    )}`;
    productEtlLogger.error(errorMessage);
    throw new Error(errorMessage);
  }
}

export { productExtractorConsumer };
