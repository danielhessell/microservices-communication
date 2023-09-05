import { prisma } from "../../../../infra/database/prisma";
import { KafkaSendMessage } from "../../../../infra/provider/kafka/producer";

interface RegisterProductInput {
  name: string;
  code: string;
  quantity: number;
  price: number;
}

export class RegisterProduct {
  constructor() { }

  async execute(input: RegisterProductInput) {
    const productExist = await prisma.product.findUnique({
      where: {
        code: input.code
      }
    });

    if (productExist) throw new Error("429|Product already exists.");

    const product = await prisma.product.create({
      data: input
    });

    const kafkaMessage = new KafkaSendMessage();
    await kafkaMessage.execute("PRODUCT_CREATED", {
      id: product.id,
      code: product.code
    });

    return { product };
  }
}