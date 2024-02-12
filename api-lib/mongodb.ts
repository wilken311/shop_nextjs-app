import { MongoClient } from "mongodb";
// import path from "path";
// import dotenv from "dotenv";

// //load .env.local
// dotenv.config({ path: path.resolve(__dirname, "../.env.local") });

const uri: string = process.env.MONGODB_URI as string;
const dbName: string = process.env.MONGODB_DB as string;

let cachedClient: any = null;
let cachedDB: any = null;

//check uri
if (!uri) {
  throw new Error(
    `Please define MONGODB_URI environment variable inside .env.local`
  );
}
//check dbName
if (!dbName) {
  throw new Error(
    `Please define MONGODB_DB environment variable inside .env.local`
  );
}


export const getMongoClient = async ()=> { 
  //set connection option
  const opts: object = {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  };
  //connect the client to the server
  return await MongoClient.connect(uri, opts);
}

export const connectToDatabase = async () => {
  //check the cached
  if (cachedClient && cachedDB) {
    return { client: cachedClient, db: cachedDB };
  }
  const client = await getMongoClient();
  const db = await client.db(dbName);
  //set cache
  cachedClient = client;
  cachedDB = db;
  console.log(`MongoDB is connected successfully!`);
  return { client, db };
}

