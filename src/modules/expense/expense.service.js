import { prisma } from "../../lib/prisma.js";

export async function getExpensesByUser(userId) {
  try {
    const expenses = await prisma.expenses.findMany({
      where: {
        userId,
      },
    });

    if (expenses) return { statusCode: 200, data: { expenses, message: 'Despesa adicionada com sucesso' } };
    throw { statusCode: 400, message: "Não sei oq houve" };
  } catch (error) {
    if (error.statusCode === 400) {
      throw { statusCode: error.statusCode, message: error.message };
    }
    console.log("get exp", error);
    throw {
      statusCode: 500,
      message: "Erro interno do servidor. Por favor, contate o suporte!",
    };
  }
}

export async function deleteExpense(userId, expenseId) {
  try {
    const deleted = await prisma.expenses.delete({
      where: {
        id: expenseId,
        userId
      },
    });

    if (deleted) {
      return {
        statusCode: 200,
        data: { message: "Despesa removida com sucesso!" },
      };
    }
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

export async function createExpense(body) {
  const {
    date,
    title,
    category,
    amount,
    reference,
    paymentMethod,
    installments,
    userId,
  } = body;

  try {
    const expense = await prisma.expenses.create({
      data: {
        date,
        title,
        category,
        amount,
        reference,
        paymentMethod,
        installments,
        userId,
      },
    });

    if (expense)
      return {
        statusCode: 201,
        data: { message: "Despesa adicionada com sucesso!" },
      };
    throw { statusCode: 400, message: "Houve um erro ao adicionar a despesa!" };
  } catch (error) {
    console.log("exp err", error);
    if (error.statusCode === 400) {
      throw { statusCode: error.statusCode, message: error.message };
    }
    throw {
      statusCode: 500,
      message: "Erro interno do servidor. Por favor, contate o suporte!",
    };
  }
}
