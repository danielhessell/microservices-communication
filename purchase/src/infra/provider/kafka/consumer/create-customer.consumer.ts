import { prisma } from "../../../database/prisma";
import { kafkaConsumer } from "../kafka.consumer";

interface CustomerConsumerProps {
  id: string;
  email: string;
}

export async function createCustomerConsumer() {
  const consumer = await kafkaConsumer("CUSTOMER_CREATED");
  await consumer.run({
    eachMessage: async ({ message }) => {
      const messageToString = message.value!.toString();
      const customer = JSON.parse(messageToString) as CustomerConsumerProps;

      await prisma.customer.create({
        data: {
          externalId: customer.id,
          email: customer.email
        }
      });
    }
  });
}
createCustomerConsumer();