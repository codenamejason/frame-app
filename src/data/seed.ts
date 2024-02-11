import { IProject, IUser } from "@/app/types";
import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

export async function seedDb() {
  // await prisma.user.create<{ data: IUser }>({
  //   data: {
  //     name: "test 2",
  //     email: "test2@test.com",
  //     address: "0x321",
  //     createdAt: new Date(),
  //     updatedAt: new Date(),
  //   },
  // });

  // await prisma.user.create<{ data: IUser }>({
  //   data: {
  //     name: "test 3",
  //     email: "test3@test.com",
  //     address: "0x456",
  //     createdAt: new Date(),
  //     updatedAt: new Date(),
  //   },
  // });

  // await prisma.user.create<{ data: IUser }>({
  //   data: {
  //     name: "test 4",
  //     email: "test4@jax.com",
  //     address: "0x789",
  //     createdAt: new Date(),
  //     updatedAt: new Date(),
  //   },
  // });

  await prisma.project.createMany({
    data: [
      {
        name: "Project 1",
        description: "Project 1 description",
        status: "ACTIVE",
        type: "INDIVIDUAL",
      },
      {
        name: "Project 2",
        description: "Project 2 description",
        status: "ACTIVE",
        type: "INDIVIDUAL",
      },
      {
        name: "Project 3",
        description: "Project 3 description",
        status: "ACTIVE",
        type: "INDIVIDUAL",
      },
      {
        name: "Project 4",
        description: "Project 4 description",
        status: "ACTIVE",
        type: "INDIVIDUAL",
      },
      {
        name: "Project 5",
        description: "Project 5 description",
        status: "ACTIVE",
        type: "INDIVIDUAL",
      },
      {
        name: "Project 6",
        description: "Project 6 description",
        status: "ACTIVE",
        type: "INDIVIDUAL",
      },
      {
        name: "Project 7",
        description: "Project 7 description",
        status: "ACTIVE",
        type: "INDIVIDUAL",
      },
      {
        name: "Project 8",
        description: "Project 8 description",
        status: "ACTIVE",
        type: "INDIVIDUAL",
      },
      {
        name: "Project 9",
        description: "Project 9 description",
        status: "ACTIVE",
        type: "INDIVIDUAL",
      },
      {
        name: "Project 10",
        description: "Project 10 description",
        status: "ACTIVE",
        type: "INDIVIDUAL",
      },
    ],
  });
}

async function main() {
  // ... you will write your Prisma Client queries here
  seedDb();
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
