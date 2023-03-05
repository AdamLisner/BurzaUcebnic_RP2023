// import { PrismaClient } from "@prisma/client";
// import prisma from "../../../src/prisma";
import PrismaClientSingleton from "../../../src/PrismaClientSingleton";
import Prisma from "../../../src/prisma";

const prisma = PrismaClientSingleton;
/**
 * This  function retrieves a JSON that holds all records in table `Product`
 * @async
 * @function
 * @param {*} req The request object received by the API endpoint.
 * @param {*} res The response object that will be sent back to the client
 */
export default async function handler(req, res) {
  try {
    await prisma.$connect();
    const product = await prisma.product.findMany({
      where: {
        sold: false,
      },
      include: {
        seller: true,
      },
    });

    res.status(200).json(product);
    await prisma.$disconnect();
  } catch (error) {
    console.error(error);
    res.status(500).send("Error fetching data");
    await prisma.$disconnect();
  } finally {
    //await prisma.$disconnect();
  }
}
