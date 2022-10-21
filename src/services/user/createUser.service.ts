import AppDataSource from "../../data-source";
import { IUser, IUserRequest } from "../../interfaces/users";
import { User } from "../../entities/user.entity";
import { hashSync } from "bcrypt";
import { AppError } from "../../Error/AppError";

const createUserService = async (dados: IUserRequest): Promise<IUser> => {
  const userRepository = AppDataSource.getRepository(User);

  const users = await userRepository.find();

  const userAlreadyExists = users.find((user) => user.email === dados.email);

  if (userAlreadyExists) {
    throw new AppError("User already exists");
  }

  const user = userRepository.create({
    email: dados.email,
    name: dados.name,
    isAdm: dados.isAdm,
    password: hashSync(dados.password, 10),
  });
  await userRepository.save(user);
  const { password, ...rest } = user;
  return rest;
};

export default createUserService;
