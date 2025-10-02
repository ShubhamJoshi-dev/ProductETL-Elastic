import startAllConsumers from "./queues/consumer/main.consumer";

class BootStrap {
  public async initQueues() {
    await startAllConsumers();
  }
}

const getBootStrap = (): BootStrap => {
  return new BootStrap();
};

export default getBootStrap
