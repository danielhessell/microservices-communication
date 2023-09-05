import { Request, Response } from "express";
import { RegisterCustomer } from "./register-customer";

interface RequestBody {
  name: string;
  email: string;
  phone: string;
  password: string;
}

export class RegisterCustomerController {
  async handle(request: Request, response: Response) {
    const body = request.body as RequestBody;

    const usecase = new RegisterCustomer();

    const { customer } = await usecase.execute(body);

    return response.status(201).json({ customer });
  }
}