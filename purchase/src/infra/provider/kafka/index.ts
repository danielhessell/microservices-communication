import { Kafka } from "kafkajs";

export const kafka = new Kafka({
  brokers: ['awake-kit-10857-us1-kafka.upstash.io:9092'],
  sasl: {
    mechanism: 'scram-sha-256',
    username: 'YXdha2Uta2l0LTEwODU3JM4HTyS60qj5jKTz0i2v4wkNmnTygEi0uo41WnN6QiM',
    password: 'NDU5MTZkNjQtMzRlZS00Nzk3LTlhYmEtZDkxNjM1OTQzZTdm',
  },
  ssl: true,
});