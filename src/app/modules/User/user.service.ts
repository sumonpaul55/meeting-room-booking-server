import { User } from "./user.model";

const getAllUsersFromDb = async () => {
  const result = await User.find();
  return result;
};

export const userServices = {
  getAllUsersFromDb,
};
