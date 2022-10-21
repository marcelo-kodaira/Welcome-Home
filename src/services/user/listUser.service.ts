import AppDataSource from "../../data-source";
import { User } from "../../entities/user.entity";

const listUserService = async (): Promise<User[]> => {
  const userRepository = AppDataSource.getRepository(User);
  const users = await userRepository.find();
  return users;
};
export default listUserService;
