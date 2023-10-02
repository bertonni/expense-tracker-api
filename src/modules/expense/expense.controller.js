import { Router } from "express";
import authMiddleware from "../middleware/auth.middleware.js";
import { createExpense, getExpensesByUser } from "./expense.service.js";

const expenseRouter = Router();

expenseRouter.get("/expenses", authMiddleware, async (req, res) => {
  try {
    const response = await getExpensesByUser(req.user.id);
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

expenseRouter.post("/expenses/add", authMiddleware, async (req, res) => {
  try {
    const response = await createExpense(req.body);
    return res.send(response.message).status(response.statusCode);
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

export { expenseRouter };
