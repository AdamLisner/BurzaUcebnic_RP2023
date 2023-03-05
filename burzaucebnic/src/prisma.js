import { PrismaClient } from "@prisma/client";

export class Prisma {
  static Prisma = PrismaClient;

  static getPrisma() {
    //verify if prisma instance not exist
    if (this.Prisma === null || !this.Prisma)
      //create new one
      this.Prisma = new PrismaClient();
    return this.Prisma;
  }
}
