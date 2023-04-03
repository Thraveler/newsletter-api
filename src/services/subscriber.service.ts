import db from "../config/database";
import { Subscriber } from "../entities/subscriber.entity";

const subscriberRepository = db.getRepository(Subscriber);

const createSubscriber = async (data: Subscriber): Promise<Subscriber> => {
  const subscriberCreated = await subscriberRepository.save(data);

  return subscriberCreated;
};

const findSubscriberByEmail = async (email: string): Promise<Subscriber | null> => {
  const subscriberFound = await subscriberRepository.findOne({ where: { email: email } });

  return subscriberFound;
}

export { createSubscriber, findSubscriberByEmail };
