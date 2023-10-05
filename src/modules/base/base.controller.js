import { Router } from "express";

const baseRouter = Router();

baseRouter.get('/', (req, res) => {
  return res.send({ message: "Oi, meu xapa!" }).status(200);
})

export { baseRouter }