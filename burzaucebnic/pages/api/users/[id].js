// import { PrismaClient } from "@prisma/client";
// import prisma from "../../../src/prisma";
import PrismaClientSingleton from "../../../src/PrismaClientSingleton";

const prisma = PrismaClientSingleton;
/**
 * Function that retrieves user data from database about the user whose ID is given in the request query.
 * @param {*} req
 * @param {*} res
 * @returns
 */
export default async function handler(req, res) {
  const userId = req.query.id;
  try {
    if (typeof userId === "undefined") {
      res.status(400).send("Missing userId query parameter");
      return;
    }
    const user = await prisma.user.findUniqueOrThrow({
      where: {
        id: userId,
      },
    });
    res.status(200).json(user);
    await prisma.$disconnect();
  } catch (error) {
    console.error(error);
    res.status(500).send("Error fetching user");
    await prisma.$disconnect();
  }
}
