import { MongoClient } from "mongodb";
import nextConnect from "next-connect";

const client = new MongoClient(
  "mongodb+srv://DbUser:12345@cluster0.wlidh.mongodb.net/NFTS",
  {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  }
);

async function database(req, res, next) {
  //  const client = await MongoClient.connect(
  //    "mongodb+srv://DbUser:12345@cluster0.wlidh.mongodb.net/NFTS"
  //  );
  //  const db = client.db();

  await client.connect();
  req.dbClient = client;
  req.db = client.db();
  return next();
}

const middleware = nextConnect();

middleware.use(database);

export default middleware;
