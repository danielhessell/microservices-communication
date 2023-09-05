import { Request, Response } from "express";
import { CreateOrder } from "./create-order";

interface RequestBody {
  customerId: string;
  items: {
    productId: string;
    quantity: number;
  }[];
}

export class CreateOrderController {
  async handle(request: Request, response: Response) {
    const body = request.body as RequestBody;

    const usecase = new CreateOrder();

    const { order } = await usecase.execute(body);

    return response.status(201).json({ order });
  }
}