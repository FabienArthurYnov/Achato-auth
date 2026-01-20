import Joi from 'joi';
import jwt from 'jsonwebtoken';
import { secureService } from '../services/secure.service.js';


const registerSchema = Joi.object({
  username: Joi.string().min(3).max(50).required(),
  email: Joi.string().email().required(),
  password: Joi.string().min(6).max(255).required(),
});

const loginSchema = Joi.object({
  identifier: Joi.string().required(),
  password: Joi.string().min(6).max(255).required(),
});

export const secureController = {
  register: async (req, res, next) => {
    try {
      const { error, value } = registerSchema.validate(req.body);
      if (error) {
        return res.status(400).json({ message: error.message });
      }

      const { username, email, password } = value;

      const result = await secureService.register({ username, email, password });

      return res.status(201).json({
        user: {
          id: result.user.id,
          username: result.user.username,
          email: result.user.email,
        },
        accessToken: result.accessToken,
      });
    } catch (err) {
      next(err);
    }
  },

  login: async (req, res, next) => {
    try {
      const { error, value } = loginSchema.validate(req.body);
      if (error) {
        return res.status(400).json({ message: error.message });
      }

      const { identifier, password } = value;

      const result = await secureService.login({ identifier, password });

      return res.status(200).json({
        user: {
          id: result.user.id,
          username: result.user.username,
          email: result.user.email,
        },
        accessToken: result.accessToken,
      });
    } catch (err) {
      next(err);
    }
  },
  verify: (req, res) => {
    try {
      const secureHeader = req.headers.authorization || '';

      if (!secureHeader.startsWith('Bearer ')) {
        return res.status(401).json({ message: 'Wrong token.' });
      }

      const token = secureHeader.split(' ')[1];

      const decoded = jwt.verify(token, process.env.JWT_SECRET);

      return res.json({
        valid: true,
        user: {
          id: decoded.id,
          email: decoded.email,
          username: decoded.username,
        },
      });
    } catch (error) {
      console.error('Wrong token on verify :', error.message);
      return res.status(401).json({ valid: false, message: 'Wrong or expired token.' });
    }
  },
};