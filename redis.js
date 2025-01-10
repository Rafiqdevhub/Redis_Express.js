import express from "express";
import redis from "redis";

const app = express();
const port = 5000;

const client = redis.createClient();

client.on("error", (err) => {
  console.error("Redis error:", err);
});

app.use(express.json());

let redisClient;

(async () => {
  redisClient = redis.createClient();
  redisClient.on("error", (err) => {
    console.error("Redis error:", err);
  });
  await redisClient.connect();
})();

app.get("/", async (req, res) => {
  try {
    let calculateData = 0;
    const checkData = await redisClient.get("calculateData");
    if (checkData) {
      return res.json({ data: checkData });
    }
    for (let i = 0; i < 100000000000; i++) {
      calculateData += i;
    }
    await redisClient.set("calculateData", calculateData);
    return res.json({ data: calculateData });
  } catch (error) {
    console.log(error);
  }
});

app.listen(port, () => {
  console.log(`Server running on http://localhost:${port}`);
});
