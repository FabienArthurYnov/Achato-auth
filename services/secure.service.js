import { userRepository } from '../repositories/user.repository.js';
import { hashPassword, comparePassword } from '../utils/password.js';
import { generateAccessToken } from '../utils/jwt.js';

export const secureService = {
  register: async ({ firstName, lastName, phone, role, password, email }) => {
    // Vérifier si l'email existe déjà
    const existingByEmail = await userRepository.findByEmail(email);
    if (existingByEmail) {
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
      password: passwordHash,
      email,
    });

    const payload = {
      userId: user.id,
      firstName: user.firstName,
      lastName: user.lastName,
      phone: user.phone,
      role: user.role,
      email: user.email,
    };

    const accessToken = generateAccessToken(payload);

    return { user, accessToken };
  },

  login: async ({ email, password }) => {
    let user = await userRepository.findByEmail(email);

    if (!user) {
      const error = new Error('No user found with this email');
      error.status = 401;
      throw error;
    }

    const isValid = await comparePassword(password, user.password);
    if (!isValid) {
      const error = new Error('Wrong credentials');
      error.status = 401;
      throw error;
    }

    const payload = {
      userId: user.id,
      email: user.email,
    };

    const accessToken = generateAccessToken(payload);

    return { user, accessToken };
  },
};