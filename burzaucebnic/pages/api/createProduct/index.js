import PrismaClientSingleton from "../../../src/PrismaClientSingleton";

import Prisma from "../../../src/prisma";

const prisma = PrismaClientSingleton;
/**
 * Handles incoming HTTP requests to create a new product in the database.
 * @function
 * @async
 * @param {*} req - The request object received by the API endpoint.
 *                       Contains information about the product to be created.
 *
 * @param {*} res - The response object that will be sent back to the client.
 * @returns {Promise<void>} - A promise that resolves when the product is successfully created, or rejects with an error if it fails.
 */
export default async function handler(req, res) {
  const { name, price, userId, imageURL, category } = req.body;
  try {
    await prisma.product.create({
      data: {
        name,
        price,
        userId,
        imageURL,
        category,
      },
    });
    res.status(200).json({
      message: "Product created",
    });
    await prisma.$disconnect();
  } catch (error) {
    console.error("Error");
    await prisma.$disconnect();
  }
}
