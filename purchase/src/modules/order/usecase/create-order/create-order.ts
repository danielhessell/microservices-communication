import { prisma } from "../../../../infra/database/prisma";

interface CreateOrderInput {
  customerId: string;
  items: {
    productId: string;
    quantity: number;
  }[];
}

export class CreateOrder {
  constructor() { }

  async execute(input: CreateOrderInput) {
    /**
     * Requisição/comunicação HTTP para API de produtos para verificar se tem estoque do produto.
     * axios.get("/products")
     */

    const order = await prisma.order.create({
      data: {
        customerId: input.customerId,
        status: "WAITING_PAYMENT",
        orderItems: {
          createMany: {
            data: input.items,
          }
        }
      }
    });

    return { order };
  }
}