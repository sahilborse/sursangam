const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const { pool } = require('../model/database'); // Using your mysql2/promise pool
require('dotenv').config();

class AuthService {
  /**
   * ✅ Register a new user
   */
  static async register({ username, email, password }) {
    try {
      if (!username || !email || !password) {
        throw new Error('Invalid input');
      }

      // Check if user already exists
      console.log(username, email, password);
      const [existingUser] = await pool.query('SELECT * FROM users WHERE email = ?', [email]);
      if (existingUser.length > 0) {
        throw new Error('User already exists');
      }

      // Hash the password
      const hashedPassword = await bcrypt.hash(password, 10);

      // Insert user
      const [result] = await pool.query(
        'INSERT INTO users (name, email, password) VALUES (?, ?, ?)',
        [username, email, hashedPassword]
      );

      return {
        message: 'User registered successfully',
        userId: result.insertId,
      };
    } catch (error) {
      console.error('❌ Register Error:', error.message);
      throw new Error(error.message || 'Failed to register user');
    }
  }

  /**
   * ✅ Login a user and return a JWT token
   */
  static async login({ email, password }) {
    try {
      if (!email || !password) {
        throw new Error('Invalid input');
      }

      // Find user
      const [users] = await pool.query('SELECT * FROM users WHERE email = ?', [email]);
      if (users.length === 0) {
        throw new Error('User not found');
      }

      const user = users[0];

      // Compare passwords
      const isMatch = await bcrypt.compare(password, user.password);
      if (!isMatch) {
        throw new Error('Invalid credentials');
      }

      // Ensure JWT secret is defined
      if (!process.env.JWT_SECRET) {
        throw new Error('JWT secret not defined in environment variables');
      }

      // Generate JWT
      const token = jwt.sign(
        { id: user.id, email: user.email },
        process.env.JWT_SECRET,
        { expiresIn: process.env.JWT_EXPIRES_IN || '1h' }
      );

      return {
        message: 'Login successful',
        token,
        userId: user.id,
      };
    } catch (error) {
      console.error('❌ Login Error:', error.message);
      throw new Error(error.message || 'Failed to login');
    }
  }

  /**
   * ✅ Logout (JWT-based systems just remove token client-side)
   */
  static async logout() {
    return { message: 'Logged out successfully' };
  }
}

module.exports = AuthService;
