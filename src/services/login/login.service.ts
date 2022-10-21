import AppDataSource from "../../data-source";
import { User } from "../../entities/user.entity";
import { IUserLogin } from "../../interfaces/users";
import { compareSync } from "bcrypt";
import jwt from "jsonwebtoken";
import { AppError } from "../../Error/AppError";

const loginService = async ({ email, password }: IUserLogin) => {
  const userRepository = AppDataSource.getRepository(User);

  const usersArray = await userRepository.find();

  const user = usersArray.find((user) => user.email === email);

  if (!user) {
    throw new AppError("Wrong password or email");
  }
  if (!compareSync(password, user!.password)) {
    throw new AppError("Wrong password or email");
  }

  const token = jwt.sign(
    { isAdm: user.isAdm },
    process.env.SECRET_KEY as string,
    {
      subject: user.id,
      expiresIn: "1d",
    }
  );
  return token;
};
export default loginService;
