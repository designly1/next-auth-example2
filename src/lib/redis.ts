import Redis from "ioredis";

const GLOBAL_PREFIX = "demo::";

type SetCommandOptions = {
  get?: boolean;
} & (
  | {
      ex: number;
      px?: never;
      exat?: never;
      pxat?: never;
      keepTtl?: never;
    }
  | {
      ex?: never;
      px: number;
      exat?: never;
      pxat?: never;
      keepTtl?: never;
    }
  | {
      ex?: never;
      px?: never;
      exat: number;
      pxat?: never;
      keepTtl?: never;
    }
  | {
      ex?: never;
      px?: never;
      exat?: never;
      pxat: number;
      keepTtl?: never;
    }
  | {
      ex?: never;
      px?: never;
      exat?: never;
      pxat?: never;
      keepTtl: true;
    }
  | {
      ex?: never;
      px?: never;
      exat?: never;
      pxat?: never;
      keepTtl?: never;
    }
) &
  (
    | {
        nx: true;
        xx?: never;
      }
    | {
        xx: true;
        nx?: never;
      }
    | {
        xx?: never;
        nx?: never;
      }
  );

let redisClient: Redis | null = null;

const getClient = () => {
  if (redisClient) {
    return redisClient;
  }

  const host = process.env.REDIS_HOST;
  const port = process.env.REDIS_PORT;
  const password = process.env.REDIS_PASSWORD;

  if (!host) throw new Error("REDIS_HOST is not defined");
  if (!port) throw new Error("REDIS_PORT is not defined");
  //if (!password) throw new Error('REDIS_PASSWORD is not defined');

  redisClient = new Redis({
    host,
    port: parseInt(port, 10),
    password: password || undefined,
    lazyConnect: true,
  });

  return redisClient;
};

const isJSON = (str: string): boolean => {
  try {
    JSON.parse(str);
    return true;
  } catch {
    return false;
  }
};

const addPrefix = (key: string): string => `${GLOBAL_PREFIX}${key}`;

const kv = {
  get: async <T>(key: string): Promise<T | null> => {
    const redis = getClient();
    const value = await redis.get(addPrefix(key));
    if (!value) return null;

    if (isJSON(value)) return JSON.parse(value) as T;
    return value as T;
  },
  mget: async <T>(keys: string[]): Promise<(T | null)[]> => {
    const redis = getClient();
    const prefixedKeys = keys.map(addPrefix);
    const values = await redis.mget(prefixedKeys);
    return values.map((value) => {
      if (!value) return null;
      if (isJSON(value)) return JSON.parse(value) as T;
      return value as T;
    });
  },
  mset: async (
    keyValues: { key: string; value: unknown; options?: SetCommandOptions }[],
  ): Promise<string> => {
    const redis = getClient();
    return await redis.mset(
      keyValues.map((kv) => ({
        key: addPrefix(kv.key),
        value: kv.value,
        options: kv.options,
      })),
    );
  },
  del: async (key: string): Promise<number> => {
    const redis = getClient();
    return await redis.del(addPrefix(key));
  },
  set: async (
    key: string,
    value: unknown,
    options?: SetCommandOptions,
  ): Promise<"OK"> => {
    const redis = getClient();
    const stringValue =
      typeof value === "string" ? value : JSON.stringify(value);
    const prefixedKey = addPrefix(key);
    if (options?.ex) {
      return await redis.set(prefixedKey, stringValue, "EX", options.ex);
    }
    return await redis.set(prefixedKey, stringValue);
  },
  keys: async (pattern: string): Promise<string[]> => {
    const redis = getClient();
    const prefixedPattern = addPrefix(pattern);
    const keys = await redis.keys(prefixedPattern);
    return keys.map((key) => key.replace(GLOBAL_PREFIX, ""));
  },
  exists: async (key: string): Promise<boolean> => {
    const redis = getClient();
    const exists = await redis.exists(addPrefix(key));
    return exists > 0;
  },
  ping: async (): Promise<string> => {
    const redis = getClient();
    return await redis.ping();
  },
  ttl: async (key: string): Promise<number> => {
    const redis = getClient();
    return await redis.ttl(addPrefix(key));
  },
};

export { kv };
