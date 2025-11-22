const db = require("./app/models");

async function assignRole() {
  try {
    const user = await db.user.findOne({ where: { username: "admin" } });
    if (!user) {
      console.log("Admin user not found");
      process.exit();
    }

    const adminRole = await db.role.findOne({ where: { name: "admin" } });
    if (!adminRole) {
      console.log("Admin role not found");
      process.exit();
    }

    await user.setRoles([adminRole.id]);

    console.log("Admin role assigned successfully!");
    process.exit();
  } catch (err) {
    console.error(err);
    process.exit();
  }
}

assignRole();
