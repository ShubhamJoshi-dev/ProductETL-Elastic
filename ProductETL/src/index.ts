import getBootStrap from "./start";

async function start() {
  const bootStrapInstance = getBootStrap();
  await bootStrapInstance.initQueues();
}

(async () => {
  await start();
})();
