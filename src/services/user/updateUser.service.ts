import { hashSync } from "bcrypt";
import AppDataSource from "../../data-source";
import { User } from "../../entities/user.entity";
import { AppError } from "../../Error/AppError";
import { IUser, IUserUpdate } from "../../interfaces/users";

const updateUserService = async (
  userData: IUserUpdate,
  id: string
): Promise<IUser> => {
  const dataValues = Object.keys(userData);

  dataValues.forEach((data) => {
    if (data != "email" && data != "password" && data != "name") {
      throw new AppError("This data can't be modified", 401);
    }
  });

  const userRepository = AppDataSource.getRepository(User);
  const user = await userRepository.findOneBy({ id });

  if (!user) {
    throw new AppError("User not found", 404);
  }

  await userRepository.update(id, {
    email: userData.email,
    name: userData.name,
    password: userData.password
      ? hashSync(userData.password, 10)
      : user.password,
  });

  const findUser = await userRepository.findOneBy({ id });

  // const {password, ...userNopassword} = findUser!

  return findUser!
};

export default updateUserService;
