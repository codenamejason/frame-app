import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

async function seedDb() {
  await prisma.user.create({
    data: {
      name: "Jax",
      email: "jax@jax.com",
      id: "0x123",
      createdAt: new Date(),
      updatedAt: new Date(),
    },
  });
}

async function main() {
  // ... you will write your Prisma Client queries here
  seedDb();

  const allUsers = await prisma.user.findMany({
    include: {},
  });
  console.dir(allUsers, { depth: null });
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
