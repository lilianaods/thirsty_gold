import { LogErrorRepository } from "../../../usecases";
import { MongoManager } from "../../config/MongoManager";

export class LogErrorMongoRepository implements LogErrorRepository {
  async log(stack: string): Promise<void> {
    const collection = MongoManager.getInstance().getCollection("errors");

    await collection.insertOne({ stack, date: new Date() });
  }
}
