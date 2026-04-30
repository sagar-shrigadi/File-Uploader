import "dotenv/config";
// import { PrismaPg } from "@prisma/adapter-pg";
import { PrismaNeon } from "@prisma/adapter-neon";
import { PrismaClient } from "../generated/prisma/client.js";

const connectionString = `${process.env.DATABASE_URL}`;

// const adapter = new PrismaPg({ connectionString });
const adapter = new PrismaNeon({ connectionString });
export const prisma = new PrismaClient({
  adapter,

  // omit password field globally
  // can select password when needed explicity i.e when verifying for authentication
  omit: {
    user: {
      password: true,
    },
  },
});
