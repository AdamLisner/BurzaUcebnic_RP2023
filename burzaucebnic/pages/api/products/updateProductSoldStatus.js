import PrismaClientSingleton from "../../../src/PrismaClientSingleton";

/**
 * Get a `PrismaClient` instance from the PrismaClientSingleton class
 */
const prisma = PrismaClientSingleton;

/**
 * This function is used to set the attribute of product `sold` in the database, ths function gets called via http POST method.
 * @async
 * @function
 * @param {Promise} req The request object received by the API endpoint.
 * @param {*} res 

 */
export default async function handler(req, res) {
  const productID = req.body.id;

  try {
    const updatedProduct = await prisma.product.update({
      where: {
        id: productID,
      },
      data: {
        sold: true,
      },
    });
    await prisma.$disconnect();
    res.status(200).json(updatedProduct);
  } catch (error) {
    console.log(error);
    res.status(500).json({ message: "Error updating product sold status." });
  }
}
