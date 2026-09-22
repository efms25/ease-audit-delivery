const { createClient } = require("redis");

const redis = createClient({
  url: process.env.REDIS_URL ?? "redis://localhost:6379",
});

redis.on("error", (err) => console.error(Error("redis client error"), err));

async function createConnection() {
    if(!redis.isOpen) {
        await redis.connect();
    }
}

module.exports = {
  redis,
  createConnection
};
