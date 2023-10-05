import { Router } from "express";
import { expenseRouter } from '../modules/expense/expense.controller.js';
import { incomeRouter } from '../modules/income/income.controller.js';
import { userRouter } from '../modules/user/user.controller.js';
import { authRouter } from '../modules/auth/auth.controller.js';
import { baseRouter } from '../modules/base/base.controller.js';
import { categoryRouter } from '../modules/category/category.controller.js';
import tracing from "../modules/middleware/tracingRequests.middleware.js";

const router = Router();
router.use(tracing);

const routesList = {
  baseRouter,
  userRouter,
  authRouter,
  incomeRouter,
  expenseRouter,
  categoryRouter,
};

for (const routePath in routesList) {
  router.use(routesList[routePath]);
};

export { router };