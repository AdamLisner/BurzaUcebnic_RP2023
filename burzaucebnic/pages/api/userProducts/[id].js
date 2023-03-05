// import { PrismaClient } from "@prisma/client";
// import prisma from "../../../src/prisma";
import PrismaClientSingleton from "../../../src/PrismaClientSingleton";

const prisma = PrismaClientSingleton;
/**
 * This function gets all the products of one partiular user. The ID of the user whose products are wanted is given in the request query.
 * @async
 * @function
 * @param {*} req
 * @param {*} res
 */
export default async function handler(req, res) {
  const id = req.query.id;
  try {
    const product = await prisma.product.findMany({
      where: {
        sold: false,
        seller: {
          id: id,
        },
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
  }
}
