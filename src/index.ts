import app from "./adapters/presentations/api/config/app";
import env from "./adapters/presentations/api/config/env";
import { MongoManager } from "./dataSources/config/MongoManager";

const dbConnector = MongoManager.getInstance();

dbConnector
  .connect(env.mongoUrl)
  .then(() => {
    console.log("MongoDB connected successfully");

    app.listen(env.port, () => {
      console.log(`Server is running on port http://localhost:${env.port}`);
    });
  })
  .catch((error) => {
    console.error("MongoDB connection error:", error);
  });
