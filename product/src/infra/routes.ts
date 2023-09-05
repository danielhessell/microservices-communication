import { Router } from "express";
import { RegisterProductController } from "../modules/product/usecase/register-product/register-product.controller";

export const routes = Router();

routes.post("/products", new RegisterProductController().handle);