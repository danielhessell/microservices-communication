import { Router } from "express";
import { CreateOrderController } from "../modules/order/usecase/create-order.controller";

export const routes = Router();

routes.post("/orders", new CreateOrderController().handle)