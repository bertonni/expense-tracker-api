import { prisma } from "../../lib/prisma.js";

export async function getCategories() {
  try {
    const categories = await prisma.categories.findMany();

    if (categories) return { statusCode: 200, data: { categories } };
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
