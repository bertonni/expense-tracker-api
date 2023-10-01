import { Router } from "express";
import authMiddleware from "../middleware/auth.middleware.js";
import { getCategories } from "./category.service.js";

const categoryRouter = Router();

categoryRouter.get("/categories", authMiddleware, async (req, res) => {
  try {
    const response = await getCategories();
    return res.send(response.data).status(response.statusCode);
  } catch (error) {
    console.log("err", error);
    if (error?.statusCode === 400)
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

export { categoryRouter };
