import { Router } from "express";
import { RegisterCustomerController } from "../modules/account/usecase/register-customer/register-customer.controller";

export const routes = Router();

routes.post("/customers", new RegisterCustomerController().handle);