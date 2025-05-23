import { MongoClient } from "mongodb";

export class MongoManager {
  public static instance: MongoManager;
  private client: MongoClient | null = null;
  private constructor() {}

  public static getInstance(): MongoManager {
    if (!MongoManager.instance) {
      MongoManager.instance = new MongoManager();
    }
    return MongoManager.instance;
  }

  public async connect(url: string) {
    if (!this.client) {
      this.client = await MongoClient.connect(url);
    }
  }

  public getCollection(name: string) {
    if (!this.client) {
      throw new Error("MongoDB client is not connected");
    }
    const db = this.client.db();
    return db.collection(name);
  }
}
