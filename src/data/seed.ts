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

  await prisma.project.create({
    data: {
      name: "Project 1",
      description: "Project 1 description",
      address: "0x123",
      type: "INDIVIDUAL",
      metadata: {
        create: {
          protocol: 1,
          pointer: "0x123",
        },
      },
    },
  });

  // await prisma.project.create({
  //   data: {
  //     name: "Project 2",
  //     description: "Project 2 description",
  //     address: "0x321",
  //     type: "INDIVIDUAL",
  //     metadata: {
  //       create: {
  //         protocol: 1,
  //         pointer: "0x123",
  //       },
  //     },
  //   },
  // });

  // await prisma.project.create({
  //   data: {
  //     name: "Project 3",
  //     description: "Project 3 description",
  //     address: "0x456",
  //     type: "INDIVIDUAL",
  //     metadata: {
  //       create: {
  //         protocol: 1,
  //         pointer: "0x123",
  //       },
  //     },
  //     hasRanking: false,
  //   },
  // });

  // await prisma.project.create({
  //   data: {
  //     name: "Project 4",
  //     description: "Project 4 description",
  //     address: "0x654",
  //     type: "INDIVIDUAL",
  //     metadata: {
  //       create: {
  //         protocol: 1,
  //         pointer: "0x123",
  //       },
  //     },
  //     hasRanking: false,
  //   },
  // });

  // await prisma.project.create({
  //   data: {
  //     name: "Project 5",
  //     description: "Project 5 description",
  //     address: "0x987",
  //     type: "INDIVIDUAL",
  //     metadata: {
  //       create: {
  //         protocol: 1,
  //         pointer: "0x123",
  //       },
  //     },
  //     hasRanking: false,
  //   },
  // });

  // await prisma.project.create({
  //   data: {
  //     name: "Project 6",
  //     description: "Project 6 description",
  //     address: "0x678",
  //     type: "INDIVIDUAL",
  //     metadata: {
  //       create: {
  //         protocol: 1,
  //         pointer: "0x123",
  //       },
  //     },
  //     hasRanking: false,
  //   },
  // });

  // await prisma.project.create({
  //   data: {
  //     name: "Project 7",
  //     description: "Project 7 description",
  //     address: "0x789",
  //     type: "INDIVIDUAL",
  //     metadata: {
  //       create: {
  //         protocol: 1,
  //         pointer: "0x123",
  //       },
  //     },
  //     hasRanking: false,
  //   },
  // });

  // await prisma.project.create({
  //   data: {
  //     name: "Project 8",
  //     description: "Project 8 description",
  //     address: "0x890",
  //     type: "INDIVIDUAL",
  //     metadata: {
  //       create: {
  //         protocol: 1,
  //         pointer: "0x123",
  //       },
  //     },
  //     hasRanking: false,
  //   },
  // });

  // await prisma.project.create({
  //   data: {
  //     name: "Project 9",
  //     description: "Project 9 description",
  //     address: "0x098",
  //     type: "INDIVIDUAL",
  //     metadata: {
  //       create: {
  //         protocol: 1,
  //         pointer: "0x123",
  //       },
  //     },
  //     hasRanking: false,
  //   },
  // });

  // await prisma.project.create({
  //   data: {
  //     name: "Project 10",
  //     description: "Project 10 description",
  //     address: "0x890",
  //     type: "INDIVIDUAL",
  //     metadata: {
  //       create: {
  //         protocol: 1,
  //         pointer: "0x123",
  //       },
  //     },
  //     hasRanking: false,
  //   },
  // });

  // await prisma.pickedPair.create({
  //   data: {
  //     pickedAt: new Date(),
  //     projectPairIds: {
  //       set: [1, 2],
  //     },
  //     rankings: {
  //       create: {
  //         rankGiven: 1 + Math.floor(Math.random() * 10),
  //         createdAt: new Date(),
  //       },
  //     },
  //   },
  // });
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
