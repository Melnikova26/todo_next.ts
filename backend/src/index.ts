import express, { Request, Response, NextFunction } from "express";
import router from "./routes/todoRoutes";
import sequelize from "./db";

const startApp = async () => {
  try {
    await sequelize.sync();

    const app = express();

    app.use(express.json());

    app.use("/api/todo", router);

    app.use((err: any, req: Request, res: Response, next: NextFunction) => {
      console.error(err.stack);
      res.status(500).json({ message: "Something went wrong" });
    });

    const PORT = process.env.PORT || 8000;

    app.listen(PORT, () => {
      console.log("Database connected.");
      console.log(`Server is running on port ${PORT}`);
    });
  } catch (error) {
    console.error("Unable to connect to the database:", error);
  }
};

startApp();
