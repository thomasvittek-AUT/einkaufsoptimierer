import { PrismaClient } from "@prisma/client";

// Verhindert mehrere Datenbankverbindungen während der Entwicklung
const globalForPrisma = globalThis;
export const prisma = globalForPrisma.prisma ?? new PrismaClient();
if (process.env.NODE_ENV !== "production") globalForPrisma.prisma = prisma;
