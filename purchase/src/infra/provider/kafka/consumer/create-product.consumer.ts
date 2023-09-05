import { prisma } from "../../../database/prisma";
import { kafkaConsumer } from "../kafka.consumer";

interface ProductConsumerProps {
  id: string;
  code: string;
}

export async function createProductConsumer() {
  const consumer = await kafkaConsumer("PRODUCT_CREATED");
  await consumer.run({
    eachMessage: async ({ message }) => {
      const messageToString = message.value!.toString();
      const product = JSON.parse(messageToString) as ProductConsumerProps;

      await prisma.product.create({
        data: {
          externalId: product.id,
          code: product.code
        }
      });
    }
  });
}
createProductConsumer();