import { prisma } from "../../lib/prisma.js";

export async function getIncomesByUser(userId) {
  try {
    const incomes = await prisma.incomes.findMany({
      where: {
        userId,
      },
    });
    console.log(incomes);
    if (incomes) return { statusCode: 200, data: incomes };
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
