import amqp from "amqplib";
import productEtlLogger from "../libs/logger.libs";
import { getEnvValue } from "../utils/env.utils";
import { productExtractorConsumer } from "./consumer/product.extractor.consumer";

class MainQueue {
  public connection: amqp.ChannelModel | null = null;
  public channel: amqp.Channel | null = null;

  public async connectQueue() {
    let retryCount = 3;
    let retryStatus = true;
    while (retryCount > 0 && retryStatus) {
      try {
        const isNullConnection = !this.connection && !this.channel;
        if (isNullConnection) {
          productEtlLogger.info(`Connecting to the RabbitMQ`);
          this.connection = await amqp.connect(getEnvValue("AMQP_URL"));
          this.channel = await this.connection.createChannel();
          productEtlLogger.info(`Connected to the RabbitMQ`);
          return;
        }
      } catch (err: any) {
        productEtlLogger.error(
          `Error Connecting to the RabbitMQ, Due To : ${JSON.stringify(
            err.message
          )}`
        );
      }
    }
  }

  public async getChannel() {
    if (!this.channel) {
      await this.connectQueue();
    }
    return this.channel;
  }

  public async closeChannel() {
    if (this.channel) {
      this.channel = null;
    }
    return;
  }
}

const queueInstance = (): MainQueue => {
  return new MainQueue();
};

export default queueInstance;
