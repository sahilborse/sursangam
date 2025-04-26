const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const {connection} = require('../model/database'); // Import MySQL connection
require('dotenv').config();

class AuthService {
    /**
     * Register a new user
     */
    static async register(userData) {
        return new Promise((resolve, reject) => {
            const { username, email, password } = userData;

            // Check if user already exists
            const checkUserQuery = 'SELECT * FROM users WHERE email = ?';
            console.log(email, password, username);
            if(!email || !password || !username) return reject(new Error('Invalid input'));
            
            connection.query(checkUserQuery, [email], async (err, results) => {
                if (err) return reject(new Error('Database error'));
                if (results.length > 0) return reject(new Error('User already exists'));

                // Hash the password
                const saltRounds = 10;
                const hashedPassword = await bcrypt.hash(password, saltRounds);

                // Insert new user
                const insertQuery = 'INSERT INTO users (name, email, password) VALUES (?, ?, ?)';
                connection.query(insertQuery, [username, email, hashedPassword], (err, result) => {
                    if (err) return reject(new Error('Failed to register user'));
                    resolve({ message: 'User registered successfully', userId: result.insertId });
                });
            });
        });
    }

    /**
     * Login a user and return a JWT token
     */
    static async login(userData) {
        return new Promise((resolve, reject) => {
            const { email, password } = userData;

            // Find user in the database
            const findUserQuery = 'SELECT * FROM users WHERE email = ?';
            connection.query(findUserQuery, [email], async (err, results) => {
                if (err) return reject(new Error('Database error'));
                if (results.length === 0) return reject(new Error('User not found'));

                const user = results[0];

                // Compare passwords
                const isMatch = await bcrypt.compare(password, user.password);
                if (!isMatch) return reject(new Error('Invalid credentials'));

                // Generate JWT token
                const token = jwt.sign(
                    { id: user.id, email: user.email },
                    process.env.JWT_SECRET,
                    { expiresIn: '1h' }
                );
                
                resolve({ message: 'Login successful', token, userId:user.id });
            });
        });
    }

    /**
     * Logout function (Session-based, for API it can be token invalidation)
     */
    static async logout(user) {
        return new Promise((resolve) => {
            // Invalidate token manually (for example, add token to a blacklist)
            resolve({ message: 'Logged out successfully' });
        });
    }
}

module.exports = AuthService;
