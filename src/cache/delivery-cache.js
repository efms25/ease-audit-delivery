const { DEFAULT_CACHE_TTL_SEC } = require("../constants");
const { redis } = require("./redis");

async function setDeliveryCache(key, value) {
  await redis.set(key, JSON.stringify(value), {
    EX: DEFAULT_CACHE_TTL_SEC,
  });
}
async function getDeliveryCache(key) {
  const cached = await redis.get(key);

  if (!cached) return null;

  return JSON.parse(cached);
}

async function delDeliveryCache(key) {
  await redis.del(key);
}

module.exports = {
  setDeliveryCache,
  getDeliveryCache,
  delDeliveryCache,
};
