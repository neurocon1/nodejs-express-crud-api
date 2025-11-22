const dotenv = require("dotenv");
const userModel = require("./user.model.js");
const taskModel = require("./task.model.js");
const roleModel = require("./role.model.js");
const { Sequelize } = require("sequelize");

dotenv.config();
const sequelize = new Sequelize(
  process.env.DB_NAME,
  process.env.DB_USER,
  process.env.DB_PASSWORD,
  {
    host: process.env.DB_HOST,
    dialect: process.env.DB_DIALECT,
    pool: {
      max: 5,
      min: 0,
      acquire: 30000,
      idle: 10000,
    },
    logging: false,
  }
);

sequelize
  .authenticate()
  .then(() =>
    console.log("Database connection has been established successfully.")
  )
  .catch((err) => console.error("Unable to connect to the database:", err));

const db = {};
db.Sequelize = Sequelize;
db.sequelize = sequelize;

db.user = userModel(sequelize, Sequelize.DataTypes);
db.task = taskModel(sequelize, Sequelize.DataTypes);
db.role = roleModel(sequelize, Sequelize.DataTypes);

db.role.belongsToMany(db.user, { through: "user_roles" });
db.user.belongsToMany(db.role, { through: "user_roles" });

db.user.hasMany(db.task, { foreignKey: "userId" });
db.task.belongsTo(db.user, { foreignKey: "userId" });

db.ROLES = ["user", "moderator", "admin"];
module.exports = db;
