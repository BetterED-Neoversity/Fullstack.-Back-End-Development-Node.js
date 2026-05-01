import prisma from "../../prisma/client.ts";

const HISTORY_LIMIT = 50;

export const saveMessage = async (data: {
  authorId: string;
  roomName: string;
  text: string;
}) => {
  return prisma.message.create({
    data,
    include: { author: true },
  });
};

export const getRoomHistory = async (roomName: string) => {
  return prisma.message.findMany({
    where: { roomName },
    orderBy: { createdAt: "asc" },
    take: HISTORY_LIMIT,
    include: { author: true },
  });
};
