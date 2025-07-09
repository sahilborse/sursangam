const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const {pool} = require('../model/database'); // Import MySQL connection
require('dotenv').config();

class AuthService {
    /**
     * Register a new user
     */
    static async register(userData) {
        return new Promise((resolve, reject) => {
            const { username, email, password } = userData;

            
            // console.log(email, password, username);
            if(!email || !password || !username) return reject(new Error('Invalid input'));
            try {
                // Check if user already exists
                    const checkUserQuery = 'SELECT * FROM users WHERE email = $1';
                    pool.query(checkUserQuery, [email], async (err, results) => {
                    if (err) return reject(new Error('Database error'));
                    if (results.rows.length > 0) return reject(new Error('User already exists'));

                    // Hash the password
                    const saltRounds = 10;
                    const hashedPassword = await bcrypt.hash(password, saltRounds);

                    // Insert new user
                    const insertQuery = 'INSERT INTO users (name, email, password) VALUES ($1, $2, $3) RETURNING id';
                    pool.query(insertQuery, [username, email, hashedPassword], (err, result) => {
                        if (err) return reject(new Error('Failed to register user'));
                        resolve({ message: 'User registered successfully', userId: result.rows[0].id });
                    });
                });
            }
            catch (error) {
                console.error(error);
                return reject(new Error('Failed to register user'));
            }
        });
    }

    /**
     * Login a user and return a JWT token
     */
        static async login(userData) {
            return new Promise((resolve, reject) => {
                const { email, password } = userData;

                // Find user in the database
                const findUserQuery = 'SELECT * FROM users WHERE email = $1';
                pool.query(findUserQuery, [email], async (err, results) => {
                    if (err) return reject(new Error('Database error'));
                    if (results.rows.length === 0) return reject(new Error('User not found'));

                    const user = results.rows[0];
                    try {
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
                    } catch (error) {
                        console.error(error);
                        return reject(new Error('Failed to login'));
                    }
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
