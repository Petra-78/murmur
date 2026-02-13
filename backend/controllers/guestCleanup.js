import cron from "node-cron";
import { prisma } from "../lib/prisma.js";

cron.schedule("0 * * * *", async () => {
  console.log("Running guest cleanup...");

  const expirationDate = new Date();
  expirationDate.setHours(expirationDate.getHours() - 24);

  await prisma.user.deleteMany({
    where: {
      isGuest: true,
      createdAt: {
        lt: expirationDate,
      },
    },
  });

  console.log("Old guests deleted.");
});
