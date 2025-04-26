const express = require('express');
const AuthService = require('../Services/AuthServices');

const router = express.Router();

class AuthController {
    static async register(req, res) {
       
        try {
            const user = await AuthService.register(req.body);
            res.status(201).json(user);
        } catch (error) {
            res.status(400).json({ error: error.message });
        }
    }

    static async login(req, res) {
        
        try {
            const token = await AuthService.login(req.body);
            res.status(200).json({ token });
        } catch (error) {
            // console.log(error);
            res.status(400).json({ error: error.message });
        }
    }

    static async logout(req, res) {
        
        try {
            await AuthService.logout(req.user);
            res.status(200).json({ message: 'Logged out successfully' });
        } catch (error) {
            res.status(400).json({ error: error.message });
        }
    }
}

// ✅ Use `router.post()` to correctly define routes
router.post('/register', AuthController.register);
router.post('/login', AuthController.login);
router.post('/logout', AuthController.logout);

// ✅ Export the router, not the class
module.exports = router;
