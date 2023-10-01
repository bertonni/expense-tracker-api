import { prisma } from "../../lib/prisma.js";

export async function getExpensesByUser(userId) {
  try {
    const expenses = await prisma.expenses.findMany({
      where: {
        userId,
      },
    });

    if (expenses) return { statusCode: 200, data: expenses };
    throw { statusCode: 400, message: "Não sei oq houve" };
  } catch (error) {
    if (error.statusCode === 400) {
      throw { statusCode: error.statusCode, message: error.message };
    }
    throw {
      statusCode: 500,
      message: "Erro interno do servidor. Por favor, contate o suporte!",
    };
  }
}
