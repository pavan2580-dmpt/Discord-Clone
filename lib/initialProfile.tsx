import { redirectToSignIn, currentUser } from "@clerk/nextjs";
import { PrismaClient } from "@prisma/client";
import { MongoClient } from "mongodb";

declare global {
  var prisma: PrismaClient | undefined;
}

export const db = globalThis.prisma || new PrismaClient();

if (process.env.NODE_ENV !== "production") globalThis.prisma = db;

interface MongoDBClient {
  connect: () => Promise<void>;
  disconnect: () => Promise<void>;
  collection: (name: string) => Collection;
}

interface Collection {
  findOne: (query: object) => Promise<any>;
  insertOne: (data: object) => Promise<any>;
}

async function createPrismaClient() {
  if (process.env.DATABASE_URL) {
    const user = await currentUser();
    if (!user) {
      return redirectToSignIn();
    }
    const mongoClient = new MongoClient(process.env.DATABASE_URL);

    return {
      async connect() {
        await mongoClient.connect();
      },
      async disconnect() {
        await mongoClient.close();
      },
      profile: {
        async findUnique() {
          const collection = mongoClient.db().collection("profile");
          const profile = await collection.findOne({ userId: user.id });
          return profile;
        },
        async create() {
          const collection = mongoClient.db().collection("profile");
          const data = {
            userId: user.id,
            name: `${user.firstName} ${user.lastName}`,
            imageUrl: user.imageUrl,
            email: user.emailAddresses[0].emailAddress,
          };
          const result = await collection.insertOne(data);
          return result;
        },
      },
    };
  } else {
    return new PrismaClient();
  }
}

export default createPrismaClient;
