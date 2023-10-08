import { PrismaClient } from "@prisma/client";
import crypto from "crypto";

const prisma = new PrismaClient();

const password = crypto.createHash("sha1").update("Bertonni").digest("hex");

async function main() {
  await prisma.user.upsert({
    where: { email: "bertonnipaz@gmail.com" },
    update: {},
    create: {
      email: "bertonnipaz@gmail.com",
      name: "Bertonni Paz",
      password,
      incomes: {
        create: [
          {
            title: "Salário Bertonni",
            amount: 4426.35,
            reference: "10/2023",
          },
          {
            title: "Salário Gabi",
            amount: 4123.48,
            reference: "10/2023",
          },
        ],
      },
      expenses: {
        create: [
          {
            title: "Padaria",
            date: "04/10/2023",
            reference: "11/2023",
            amount: 25.78,
            category: "Alimentação",
            paymentMethod: "Pix",
            additionalInfo: null,
          },
          {
            title: "Mercado Tavares",
            date: "03/10/2023",
            reference: "11/2023",
            amount: 107.44,
            category: "Alimentação",
            paymentMethod: "Cartão de ",
            additionalInfo: null,
          },
        ],
      },
    },
  });

  const data = [
    {
      name: "Alimentação",
    },
    {
      name: "Educação",
    },
    {
      name: "Fast Food",
    },
    {
      name: "Lazer",
    },
    {
      name: "Moradia",
    },
    {
      name: "Transporte",
    },
  ];

  data.map(async (item) => {
    await prisma.categories.create({
      data: item,
    });
  })

}

main()
  .then(async () => {
    await prisma.$disconnect();
  })
  .catch(async (e) => {
    console.error(e);
    await prisma.$disconnect();
    process.exit(1);
  });
