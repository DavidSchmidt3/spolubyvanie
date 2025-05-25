import { createClient } from "redis";
import { type AdvertisementFetchResult } from "../data/advertisement";

export const redis = await createClient({
  url: process.env.REDIS_URL,
}).connect();

const ADVERTISEMENT_CACHE_KEY = "advertisement";
export const saveAdvertisementToCache = (
  advertisement: AdvertisementFetchResult
) => {
  void redis.set(
    `${ADVERTISEMENT_CACHE_KEY}:${advertisement.id}`,
    JSON.stringify(advertisement),
    {
      expiration: {
        type: "EX",
        value: 300,
      },
    }
  );
};

export const getAdvertisementFromCache = async (id: string) => {
  const advertisement = await redis.get(`${ADVERTISEMENT_CACHE_KEY}:${id}`);
  if (advertisement) {
    return JSON.parse(advertisement) as AdvertisementFetchResult;
  }
  return null;
};

export const deleteAdvertisementFromCache = async (id: string) => {
  await redis.del(`${ADVERTISEMENT_CACHE_KEY}:${id}`);
};
