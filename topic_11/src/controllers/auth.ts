import type { Request, Response } from "express";
import bcrypt from "bcrypt";
import createHttpError from "http-errors";
import prisma from "../../prisma/client.ts";
import { createSession, deleteSession } from "../services/session.ts";

const COOKIE_NAME = "sessionId";
const COOKIE_MAX_AGE = 1000 * 60 * 60 * 24 * 7;

export const register = async (req: Request, res: Response) => {
  const { username, password } = res.locals.body;

  const existing = await prisma.user.findUnique({ where: { username } });
  if (existing) {
    throw createHttpError(409, "Користувач з таким іменем уже існує");
  }

  const passwordHash = await bcrypt.hash(password, 10);
  const user = await prisma.user.create({
    data: { username, passwordHash },
  });

  const session = await createSession(user.id);

  res.cookie(COOKIE_NAME, session.id, {
    httpOnly: true,
    maxAge: COOKIE_MAX_AGE,
    sameSite: "lax",
  });

  res.status(201).json({ id: user.id, username: user.username });
};

export const login = async (req: Request, res: Response) => {
  const { username, password } = res.locals.body;

  const user = await prisma.user.findUnique({ where: { username } });
  if (!user) {
    throw createHttpError(401, "Невірний логін або пароль");
  }

  const valid = await bcrypt.compare(password, user.passwordHash);
  if (!valid) {
    throw createHttpError(401, "Невірний логін або пароль");
  }

  const session = await createSession(user.id);

  res.cookie(COOKIE_NAME, session.id, {
    httpOnly: true,
    maxAge: COOKIE_MAX_AGE,
    sameSite: "lax",
  });

  res.json({ id: user.id, username: user.username });
};

export const logout = async (req: Request, res: Response) => {
  const sessionId = req.cookies[COOKIE_NAME];
  if (sessionId) {
    await deleteSession(sessionId);
    res.clearCookie(COOKIE_NAME);
  }
  res.status(204).send();
};
