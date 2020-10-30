import "reflect-metadata";
import { createConnection, Repository } from "typeorm";
import { User } from "./entity/user";

createConnection()
  .then(async (connection) => {
    const userRepo: Repository<User> = connection.getRepository(User);
    connection.close();
  })
  .catch((err) => {
    console.log(err);
  });
