import { Request, Response } from "express";
import { IUser, IUserRequest, IUserUpdate } from "../interfaces/users";
import createUserService from "../services/user/createUser.service";
import deleteUserService from "../services/user/deleteUser.service";
import listUserService from "../services/user/listUser.service";
import updateUserService from "../services/user/updateUser.service";
import { instanceToPlain } from 'class-transformer'

const createUserController = async (req: Request, res: Response) => {
  const user: IUserRequest = req.body;
  const newUser = await createUserService(user);
  return res.status(201).json(newUser);
};

const listUserController = async (req: Request, res: Response) => {
  const listUsers = await listUserService();
  return res.status(200).json(instanceToPlain(listUsers));
};

const deleteUserController = async (req: Request, res: Response) => {
  const { id } = req.params;
  await deleteUserService(id);
  return res.status(204).send();
};

const updateUserController = async (req: Request, res: Response) => {
  const user: IUserUpdate = req.body;
  const { id } = req.params;
  const updatedUser = await updateUserService(user, id);
  return res.status(200).json(instanceToPlain(updatedUser));
};

export {
  createUserController,
  listUserController,
  deleteUserController,
  updateUserController,
};
