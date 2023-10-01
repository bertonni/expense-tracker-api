import jwt from "jsonwebtoken";
import dotenv from 'dotenv';
dotenv.config();


export const verifyJWT = async (
  request,
  reply,
) => {

  const token = request.headers.authorization;

  if (!token) {
    reply.code(401).send({ message: 'Token não fornecido' })
    return;
  }

  try {
    const decodedToken = jwt.verify(token, process.env.JWT_SECRET);
    request.user = decodedToken;
    next();
  } catch (error) {
    reply.code(401).send({ message: 'Token inválido.' });
    return;
  }
}
