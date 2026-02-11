import "dotenv/config";
import bcrypt from "bcrypt";
import { prisma } from "./lib/prisma.js";

async function main() {
  const existingAdmin = await prisma.user.findUnique({
    where: { email: process.env.ADMIN_EMAIL },
  });

  if (!existingAdmin) {
    const hashedPassword = await bcrypt.hash(process.env.ADMIN_PASSWORD, 10);
    await prisma.user.create({
      data: {
        email: process.env.ADMIN_EMAIL,
        username: process.env.ADMIN_USERNAME,
        password: hashedPassword,
      },
    });
    console.log("Admin created!");
  } else {
    console.log("Admin already exists.");
  }
}

main()
  .then(async () => await prisma.$disconnect())
  .catch(async (e) => {
    console.error(e);
    await prisma.$disconnect();
    process.exit(1);
  });
