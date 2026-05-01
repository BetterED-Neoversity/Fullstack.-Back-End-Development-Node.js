import prisma from "../../prisma/client.ts";

const SESSION_LIFETIME_MS = 1000 * 60 * 60 * 24 * 7; // 7 days

export const createSession = async (userId: string) => {
  return prisma.session.create({
    data: {
      userId,
      expiresAt: new Date(Date.now() + SESSION_LIFETIME_MS),
    },
  });
};

export const findValidSession = async (sessionId: string) => {
  const session = await prisma.session.findUnique({
    where: { id: sessionId },
  });

  if (!session) return null;
  if (session.expiresAt < new Date()) {
    await prisma.session.delete({ where: { id: sessionId } });
    return null;
  }

  return session;
};

export const deleteSession = async (sessionId: string) => {
  await prisma.session.delete({ where: { id: sessionId } });
};
