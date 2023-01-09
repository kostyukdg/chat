import { PrismaClient, Prisma } from "@prisma/client";
import { getPasswordHash } from "../utils/getPasswordHash";

const prisma = new PrismaClient();

const userData: Prisma.UserCreateInput[] = [
  { password: getPasswordHash("user1") },
  { password: getPasswordHash("user2") },
];

async function main() {
  console.log("Start seeding ...");
  for (const u of userData) {
    const user = await prisma.user.create({
      data: u,
    });
    console.log(`Created user with id: ${user.id}`);
  }
  console.log("Seeding finished.");
}

main()
  .then(async () => {
    await prisma.$disconnect();
  })
  .catch(async (e) => {
    console.error(e);
    await prisma.$disconnect();
    process.exit(1);
  });
