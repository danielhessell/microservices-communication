import { prisma } from "../../../../infra/database/prisma";

interface UpdateOrderStatusInput {
  id: string,
  status: string;
}

export class UpdateOrderStatus {
  constructor() { }

  async execute(input: UpdateOrderStatusInput) {
    await prisma.order.update({
      where: {
        id: input.id,
      },
      data: {
        status: input.status
      }
    });
  }
}