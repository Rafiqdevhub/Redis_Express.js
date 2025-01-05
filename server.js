import redis from "redis";

const client = redis.createClient({
  host: "localhost",
  port: 6379,
});

client.on("error", (error) =>
  console.log("Redis client error occurred!", error)
);

const redisResult = async (req, res) => {
  try {
    await client.connect();
    console.log("Connected to redis");

    await client.set("name", "Rafiq");

    const extractValue = await client.get("name");
    console.log(extractValue);

    // const deleteCount = await client.del("name");
    // console.log(deleteCount);

    const extractUpdatedValue = await client.get("name");
    console.log(extractUpdatedValue);

    // await client.set("count", "100");
    // const incrementCount = await client.incr("count");
    // console.log(incrementCount);

    const decrementCount = await client.decr("count");
    console.log(decrementCount);

    await client.decr("count");
    console.log(await client.get("count"));
  } catch (error) {
    console.error(error);
  } finally {
    await client.quit();
  }
};

// redisResult();

// Data Structure

const dataStructure = async (req, res) => {
  try {
    await client.connect();

    await client.set("user:name", "Rafiq");
    const name = await client.get("user:name");
    console.log(name);

    await client.mSet([
      "user:email",
      "rafkhan9323@gmail.com",
      "user:age",
      "23",
      "user:address",
      "Peshawar",
    ]);
    const [email, age, address] = await client.mGet([
      "user:email",
      "user:age",
      "user:address",
    ]);
    console.log(email, age, address);
  } catch (error) {
    console.log(error);
  } finally {
    client.quit();
  }
};

dataStructure();
