const db = require("./app/models");
const Role = db.role;

async function seedRoles() {
  await db.sequelize.sync();

  const roles = ["user", "moderator", "admin"];

  for (let r of roles) {
    const [role, created] = await Role.findOrCreate({ where: { name: r } });
    if (created) console.log(`Role ${r} created`);
  }

  process.exit();
}

seedRoles();
