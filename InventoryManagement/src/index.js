import startCronJobs from "./start.js";

async function init() {
  await startCronJobs();
}

(async () => {
  await init();
})();
