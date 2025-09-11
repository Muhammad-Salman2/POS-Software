import { PrismaClient } from "@prisma/client";
import hashedPasswordMiddleware from "../middleware/hashPassword.js";
const prisma = new PrismaClient({
  log: ["query", "info", "warn", "error"],
});

prisma.$use(hashedPasswordMiddleware);
export default prisma;
