import express from "express";
import userRoutes from "./modules/user/user-routes";

const app = express();

app.use(express.json());

app.get("/api", (req, res) => {
  res.send("Hello World");
});

// Routes
app.use("/api/user", userRoutes);

export default app;
