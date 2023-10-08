import crypto from "crypto";
import { Prisma } from "@prisma/client";
import { prisma } from "../../lib/prisma.js";

export async function getUserDataById(userId) {
  try {
    const user = await prisma.user.findUniqueOrThrow({
      where: {
        userId
      },
      select: {
        password: false,
      }
    });
    if (user) return { statusCode: 200, data: { user } }
    throw { statusCode: 400, message: "Não foi possível obter os dados" };
  } catch (error) {
    if (error.statusCode === 400) {
      throw { statusCode: error.statusCode, message: error.message };
    }
    console.log("get user-data", error);
    throw {
      statusCode: 500,
      message: `Erro interno do servidor. Por favor, contate o suporte!`,
    };
  }
}

export async function createUser(body) {
  try {
    const { name, email, password } = body;

    const hashPassword = crypto
      .createHash("sha1")
      .update(password)
      .digest("hex");

    const user = await prisma.user.create({
      data: {
        name,
        email,
        password: hashPassword,
      },
    });

    return { statusCode: 201, data: { ...user, password } };
  } catch (error) {
    if (error instanceof Prisma.PrismaClientKnownRequestError) {
      if (error.code === "P2002") {
        throw {
          statusCode: 400,
          message: `Os campos ${error.meta.target.join(
            ","
          )} já estão sendo usados`,
        };
      }
    }
    throw { statusCode: 500, message: `Erro interno do servidor. Por favor, contate o suporte!` };
  }
}