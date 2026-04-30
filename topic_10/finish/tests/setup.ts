import { beforeEach, afterAll } from "vitest";
import prisma from "../prisma/client.ts";
import { cleanDatabase } from "./helpers/db.ts";

beforeEach(async () => {
  await cleanDatabase();
});

afterAll(async () => {
  await cleanDatabase();
  await prisma.$disconnect();
});

// Прибираємо deprecation warning від pg, який спливає в @prisma/adapter-pg
// при relation-create операціях. Не впливає на роботу, лише засмічує вивід тестів
process.removeAllListeners("warning");
