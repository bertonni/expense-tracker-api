import crypto from "crypto";
import dotenv from "dotenv";
import jwt from 'jsonwebtoken';
import { prisma } from "../../lib/prisma.js";
dotenv.config();

export async function login(body) {
  try {
    const { email, password } = body;
    const hashPassword = crypto
      .createHash("sha1")
      .update(password)
      .digest("hex");

    const user = await prisma.user.findUniqueOrThrow({
      where: {
        email,
        password: hashPassword,
      },
      select: {
        id: true,
        name: true,
        email: true,
        password: false,
      },
    });
    if (user) {
      const token = jwt.sign({ id: user.id }, process.env.JWT_SECRET, {
        expiresIn: 60 * 60 * 3, // 180 min
      });
      return { statusCode: 200, data: { user, token } };
    }
    throw { statusCode: 401, message: 'Credenciais inválidas.' }
  } catch (error) {
    if (error.statusCode === 401) {
      throw { statusCode: error.statusCode, message: error.message };
    }
    console.log('errrrrrr', error);
    throw {
      statuscode: 500,
      message: "Erro interno do servidor. Por favor, contate o suporte!",
    };
  }
}
