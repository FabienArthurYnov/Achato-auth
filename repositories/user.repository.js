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

  create: async ({ firstName, lastName, phone, role, password, email }) => {
    return User.create({
      User_FirstName: firstName,
      User_LastName: lastName,
      User_Phone: phone,
      User_Role: role,
      User_Password: password,
      User_Email: email,
    });
  },

  update: async (user, data) => {
    return user.update(data);
  },

  delete: async (user) => {
    return user.destroy();
  },
};