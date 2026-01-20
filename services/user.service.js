import { userRepository } from '../repositories/user.repository.js';
import { hashPassword } from '../utils/password.js';

export const userService = {
  createUser: async ({ username, email, password }) => {
    const existingEmail = await userRepository.findByEmail(email);
    if (existingEmail) {
      const error = new Error('Email already used');
      error.status = 409;
      throw error;
    }

    const existingUsername = await userRepository.findByUsername(username);
    if (existingUsername) {
      const error = new Error("Username already used");
      error.status = 409;
      throw error;
    }

    const passwordHash = await hashPassword(password);

    const user = await userRepository.create({
      username,
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
    if (data.email && data.email !== user.email) {
      const existingEmail = await userRepository.findByEmail(data.email);
      if (existingEmail && existingEmail.id !== user.id) {
        const error = new Error('Email already used');
        error.status = 409;
        throw error;
      }
    }

    // Unique username
    if (data.username && data.username !== user.username) {
      const existingUsername = await userRepository.findByUsername(data.username);
      if (existingUsername && existingUsername.id !== user.id) {
        const error = new Error("Username already used");
        error.status = 409;
        throw error;
      }
    }

    // Hash the password if it's being updated
    if (data.password) {
      data.password = await hashPassword(data.password);
    }

    const updated = await userRepository.update(user, data);
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