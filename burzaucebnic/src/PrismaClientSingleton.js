import { PrismaClient } from "@prisma/client";

/**
 * Singleton class for creating and managing a single instance of the `PrismaClient`.
 */
class PrismaClientSingleton {
  /**
   * Private static property that holds the singleton instance of the `PrismaClient`.
   * @type {PrismaClient}
   * @private
   * @static
   */
  static instance = null;

  /**
   * Private constructor to prevent creating new instances of the `PrismaClientSingleton` class.
   * @private
   */
  constructor() {}

  /**
   * Public static method that returns the singleton instance of the `PrismaClient`.
   * If the instance doesn't exist, it creates a new instance of the `PrismaClient`.
   * @returns {PrismaClient} - The singleton instance of the `PrismaClient`.
   * @public
   * @static
   */
  static getInstance() {
    if (!PrismaClientSingleton.instance) {
      PrismaClientSingleton.instance = new PrismaClient();
    }
    return PrismaClientSingleton.instance;
  }
}

export default PrismaClientSingleton.getInstance();
