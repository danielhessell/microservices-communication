import { Request, Response } from "express";
import { RegisterProduct } from "./register-product";

interface RequestBody {
  name: string;
  code: string;
  quantity: number;
  price: number;
}

export class RegisterProductController {
  async handle(request: Request, response: Response) {
    const body = request.body as RequestBody;

    const usecase = new RegisterProduct();

    const { product } = await usecase.execute(body);

    return response.status(201).json({ product });
  }
}