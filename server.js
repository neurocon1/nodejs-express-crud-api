const express = require("express");
const dotenv = require("dotenv");
const cors = require("cors");
const db = require("./app/models");
const taskRoutes = require("./app/routes/task.routes.js");
const userRoutes = require("./app/routes/user.routes.js");
const authRoutes = require("./app/routes/auth.routes.js");

const app = express();

dotenv.config();

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

const corsOptions = {
  origin: "http://localhost:8000",
  methods: "GET,HEAD,PUT,PATCH,POST,DELETE",
  credentials: true,
  optionsSuccessStatus: 204,
};

app.use(cors(corsOptions));

db.sequelize
  .authenticate()
  .then(() => {
    console.log("Database connected to MySQL");
  })
  .catch((err) => {
    console.error("Cannot connect to the database:", err);
  });

db.sequelize
  .sync()
  .then(() => {
    console.log("Database synchronized");
  })
  .catch((err) => {
    console.error("Database sync error:", err);
  });

app.use("/task", taskRoutes);
app.use("/user", userRoutes);
app.use("/auth", authRoutes);

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
