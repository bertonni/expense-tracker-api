import { prisma } from "../../lib/prisma.js";

export async function getIncomesByUser(userId) {
  try {
    const incomes = await prisma.incomes.findMany({
      where: {
        userId,
      },
    });

    if (incomes)
      return {
        statusCode: 200,
        data: { incomes, message: "Receita adicionada com sucesso" },
      };
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

export async function deleteIncome(userId, incomeId) {
  try {
    const deleted = await prisma.incomes.delete({
      where: {
        id: incomeId,
        userId,
      },
    });

    if (deleted) {
      return {
        statusCode: 200,
        data: { message: "Receita removida com sucesso!" },
      };
    }
    throw { statusCode: 400, message: "Não sei oq houve" };
  } catch (error) {
    if (error.statusCode === 400) {
      throw { statusCode: error.statusCode, message: error.message };
    } else {
      throw {
        statusCode: 500,
        message: "Erro interno do servidor. Por favor, contate o suporte!",
      };
    }
  }
}

export async function createIncome(body) {
  const { title, amount, reference, userId } = body;

  try {
    const income = await prisma.incomes.create({
      data: {
        title,
        amount,
        reference,
        userId,
      },
    });

    if (income) {
      return {
        statusCode: 201,
        data: { message: "Receita adicionada com sucesso!" },
      };
    }
    throw { statusCode: 400, message: "Houve um erro ao adicionar a receita!" };
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
