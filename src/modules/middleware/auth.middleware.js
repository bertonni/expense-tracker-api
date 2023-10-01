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

    const decodedToken = jwt.verify(token, process.env.JWT_SECRET);
    req.user = decodedToken;
    next();
  } catch (error) {
    console.log(error);
    res
      .send({
        message: "Erro interno do servidor. Por favor, contate o suporte!",
      })
      .status(500);
    return;
  }
};

export default authMiddleware;