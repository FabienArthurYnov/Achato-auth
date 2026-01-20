import { User } from '../models/user.model.js';

export const userRepository = {
  findAll: async () => {
    return User.findAll();
  },

  findById: async (User_Id) => {
    return User.findByPk(User_Id);
  },

  findByEmail: async (User_Email) => {
    return User.findOne({ where: { User_Email } });
  },

  findByFirstName: async (User_FirstName) => {
    return User.findOne({ where: { User_FirstName } });
  },

  findByLastName: async (User_LastName) => {
    return User.findOne({ where: { User_LastName } });
  },

  create: async ({ User_FirstName, User_LastName, User_Phone, User_Role, User_Password, User_Email }) => {
    return User.create({
      User_FirstName: User_FirstName,
      User_LastName: User_LastName,
      User_Phone: User_Phone,
      User_Role: User_Role,
      User_Password: User_Password,
      User_Email: User_Email,
    });
  },

  update: async (user, data) => {
    return user.update(data);
  },

  delete: async (user) => {
    return user.destroy();
  },
};