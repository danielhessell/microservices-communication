import { prisma } from "../../../../infra/database/prisma";
import { kafka } from "../../../../infra/provider/kafka";
import { KafkaSendMessage } from "../../../../infra/provider/kafka/producer";

interface RegisterCustomerInput {
  name: string;
  email: string;
  phone: string;
  password: string;
}

export class RegisterCustomer {
  constructor() { }

  async execute(input: RegisterCustomerInput) {
    const customerExist = await prisma.customer.findUnique({
      where: {
        email: input.email
      }
    });

    if (customerExist) throw new Error("429|Customer already exists.");

    const customer = await prisma.customer.create({
      data: { ...input }
    });

    const kafkaProducer = new KafkaSendMessage();
    await kafkaProducer.execute("CUSTOMER_CREATED", {
      id: customer.id,
      email: customer.email,
    });

    return { customer };
  }
}