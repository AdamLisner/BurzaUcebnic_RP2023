import PrismaClientSingleton from "../../../src/PrismaClientSingleton";

const prisma = PrismaClientSingleton;
/**
 * This function is used to create new record in `Purchase` table. it is being invoked via POST HTTP method
 * @async
 * @function
 * @param {*} req
 * @param {*} res
 *
 */
export default async function handler(req, res) {
  const productID = req.body.productId;
  const buyerID = req.body.buyerId;

  console.log(req.body);

  try {
    const createPurchase = await prisma.purchase.create({
      data: {
        productId: productID,
        buyerId: buyerID,
      },
    });
    await prisma.$disconnect();
    console.log("created purchase");
    res.status(200).json(createPurchase);
  } catch (error) {
    console.log(error);
    res.status(500).json({ message: "Error updating product sold status." });
  }
}
