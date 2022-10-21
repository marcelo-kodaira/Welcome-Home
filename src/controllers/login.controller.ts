import { Request, Response } from "express";
import { IUserLogin } from "../interfaces/users";
import loginService from "../services/login/login.service";

const loginController = async (req: Request, res: Response) => {
  try {
    const user: IUserLogin = req.body;
    const token = await loginService(user);
    return res.status(200).json({ token: token });
  } catch (err) {
    if (err instanceof Error) {
      return res.status(403).json({ message: err.message });
    }
  }
};

export default loginController;
