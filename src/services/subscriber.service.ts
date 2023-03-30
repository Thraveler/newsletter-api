import db from "../config/database";
import { Subscriber } from "../entities/subscriber.entity";

const subscriberRepository = db.getRepository(Subscriber);

const createSubscriber = async (data: Subscriber): Promise<Subscriber> => {
  const subscriberCreated = await subscriberRepository.save(data);

  return subscriberCreated;
};

export { createSubscriber };
