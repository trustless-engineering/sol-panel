import { consume, setup } from "@/plugins/core/consumers/webhook";

const main = async (): Promise<void> => {
  console.log("starting webhook executor");

  await setup({
    consumerId: "cljbr8oi30003108fvoq7n4b7",
    groupName: "test-webhook",
    consumerName: "2",
    url: "https://webhook.site/504e7de4-2bd0-46ce-a29e-ebadd57cd75f",
  });

  await consume();
};

void main();
