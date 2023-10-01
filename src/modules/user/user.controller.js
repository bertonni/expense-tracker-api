import { Router } from "express";
import { createUser } from "./user.service.js";
import authMiddleware from "../middleware/auth.middleware.js";

const userRouter = Router();

userRouter.post("/users/signup", async (req, res) => {
  try {
    const response = await createUser(req.body);
    return res.send({ ...response.data }).status(response.statusCode);
  } catch (error) {
    if (error?.statusCode === 400)
      res.send({ message: error.message }).status(error.statusCode);
    else {
      console.log(error);
      res
        .send({
          message: "Erro interno de sevidor. Por favor, contate o suporte! ",
        })
        .status(500);
    }
  }
});

userRouter.get('/users/:id', authMiddleware, (req, res) => {
  try {
    
  } catch (error) {
    
  }
})

export { userRouter }