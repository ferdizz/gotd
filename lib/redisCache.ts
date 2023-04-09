import Redis from "ioredis";

const redisConnect = new Redis(process.env.REDIS_URL || "");

const getKey = async <T>(key: string): Promise<T | null> => {
  const result = await redisConnect.get(key);
  if (result) return JSON.parse(result);
  return null;
};

const setValue = async <T>(
  key: string,
  fetchData: () => Promise<T>,
  expiresIn: number
): Promise<T> => {
  const setValue = await fetchData();
  await redisConnect.set(key, JSON.stringify(setValue), "EX", expiresIn);
  return setValue;
};

export const fetchAndCache = async <T>(
  key: string,
  fetchData: () => Promise<T>,
  expiresIn: number
) => {
  const cachedData = await getKey<T>(key);
  if (cachedData) {
    console.log("Fetched from cache");
    return cachedData;
  }
  console.log("Fetched from API");
  return setValue(key, fetchData, expiresIn);
};
