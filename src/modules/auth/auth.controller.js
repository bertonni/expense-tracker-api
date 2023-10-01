import { Router } from "express";
import { login } from "./auth.service.js";

const authRouter = Router();

authRouter.post("/signin", async (req, res) => {
  try {
    const response = await login(req.body);
    return res.send({ ...response.data }).status(response.statusCode);
  } catch (error) {
    console.log('err',error);
    if (error?.statusCode === 401)
      res.send({ message: error.message }).status(error.statusCode);
    else {
      console.log(error);
      res
        .send({
          message: "Erro interno de sevidor! Por favor, consulte o suporte! ",
        })
        .status(500);
    }
  }
});

export { authRouter };
