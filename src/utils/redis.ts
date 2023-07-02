import * as redis from "redis";

const client = redis.createClient({
  url: process.env.REDIS_URL,
});

function getClient() {
  return client;
}

async function withClient(fn: (rc: typeof client) => Promise<any>) {
  await client.connect();
  try {
    return await fn(client);
  } catch (e) {
    console.log(e);
    return null;
  } finally {
    await client.disconnect();
  }
}

export { getClient, withClient };
