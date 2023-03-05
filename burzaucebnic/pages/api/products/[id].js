//import prisma from "../../../src/prisma";
import PrismaClientSingleton from "../../../src/PrismaClientSingleton";

const prisma = PrismaClientSingleton;

/**
 * 
 * Selects a product from database that matches the given id.

 * @async
 * @function
 * @param {*} req The request object received by the API endpoint.
 *                Contains the product id.
 * 
 * @param {*} res The response object that will be sent back to the client.
 * 
 */
export default async function handler(req, res) {
  const id = req.query.id;

  try {
    const product = await prisma.product.findFirst({
      where: {
        id: id,
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
  }
}
