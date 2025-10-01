import amqp from "amqplib";
import inventoryLogger from "../libs/logger.libs.js";
import { getEnvValue } from "../utils/env.utils.js";

class RabbitMQManagement {
  connection = null;
  channel = null;

  async connectRabbitMQ() {
    let count = 3;
    let retryStatus = true;
    while (count > 0 && retryStatus) {
      try {
        const isConnectionAndChannelNull = this.connection && this.channel;
        if (!isConnectionAndChannelNull) {
          inventoryLogger.info(`Connecting to the RabbitMQ`);
          this.connection = await amqp.connect(getEnvValue("RABBITMQ_URL"));
          this.channel = await this.connection.createChannel();
          inventoryLogger.info(`Connected to the RabbitMQ`);
          return;
        }
      } catch (err) {
        inventoryLogger.error(
          `Error Connecting to the RabbitMQ, Due To: ${err.message}`
        );
      }
    }
  }

  async getRabbitMQChannel() {
    if (!this.channel) {
      await this.connectRabbitMQ();
    }
    return this.channel;
  }
}

const getRabbitMQInstance = () => {
  return new RabbitMQManagement();
};

export default getRabbitMQInstance;
