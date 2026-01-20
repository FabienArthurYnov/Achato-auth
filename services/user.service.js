import { userRepository } from '../repositories/user.repository.js';
import { hashPassword } from '../utils/password.js';

export const userService = {
  createUser: async ({ firstName, lastName, phone, role, password, email }) => {
    const existingEmail = await userRepository.findByEmail(email);
    if (existingEmail) {
      const error = new Error('Email already used');
      error.status = 409;
      throw error;
    }

    const passwordHash = await hashPassword(password);

    const user = await userRepository.create({
      firstName,
      lastName,
      phone,
      role,
      email,
      password: passwordHash,
    });

    return user;
  },

  // READ ALL
  getAllUsers: async () => {
    const users = await userRepository.findAll();
    return users;
  },

  // READ ONE
  getUserById: async (id) => {
    const user = await userRepository.findById(id);
    if (!user) {
      const error = new Error('User not found');
      error.status = 404;
      throw error;
    }
    return user;
  },

  // UPDATE
  updateUser: async (id, data) => {
    const user = await userRepository.findById(id);
    if (!user) {
      const error = new Error('User not found');
      error.status = 404;
      throw error;
    }

    // Unique email
    if (data.email && data.email !== user.User_Email) {
      const existingEmail = await userRepository.findByEmail(data.email);
      if (existingEmail && existingEmail.User_Id !== user.User_Id) {
        const error = new Error('Email already used');
        error.status = 409;
        throw error;
      }
    }

    // Hash the password if it's being updated
    if (data.password) {
      data.password = await hashPassword(data.password);
    }

    const mappedData = {
      User_FirstName: data.firstName,
      User_LastName: data.lastName,
      User_Phone: data.phone,
      User_Role: data.role,
      User_Email: data.email,
      User_Password: data.password,
    };

    const updated = await userRepository.update(user, mappedData);
    return updated;
  },

  // DELETE
  deleteUser: async (id) => {
    const user = await userRepository.findById(id);
    if (!user) {
      const error = new Error('User not found');
      error.status = 404;
      throw error;
    }

    await userRepository.delete(user);
    return;
  },
};