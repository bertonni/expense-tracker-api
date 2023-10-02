import jwt from "jsonwebtoken";
import dotenv from "dotenv";
dotenv.config();

const authMiddleware = async (req, res, next) => {
  try {
    const token = req.headers.authorization.replace('Bearer ','');

    if (!token) {
      res.send({ message: "Token não fornecido" }).status(401);
      return;
    }

    jwt.verify(token, process.env.JWT_SECRET, (err, decoded) => {
      if (err) {
        throw { statusCode: 401, message: "Token inválido!" };
      }
      req.user = decoded;
      next();
    });
  } catch (error) {
    console.log(error);
    if (error.statusCode === 401) {
      return res.send({ message: error.message }).status(error.statusCode);
    }
    res
    .send({
      message: "Erro interno do servidor. Por favor, contate o suporte!",
    })
    .status(500);
    return;
  }
};

export default authMiddleware;