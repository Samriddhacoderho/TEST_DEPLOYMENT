import express from 'express';
import User from '../models/User.js';
import e from 'express';
import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';

const routerUser = express.Router();


routerUser.post('/register', async (req, res) => {
    const { name, email, password } = req.body;
    
    // Validate input
    if (!name || !email || !password) {
        return res.status(400).json({ message: 'All fields are required' });
    }
    
    try {
        const hashedPassword = await bcrypt.hash(password, 10);
        const result = await User.create({ name, email, password: hashedPassword });
        res.status(201).json({ message: 'User registered successfully', user: { name, email } });
    } catch (error) {
        console.error('Error registering user:', error);
        res.status(500).json({ message: error.message || 'Internal Server Error' });
    }
});

routerUser.post('/login', async (req, res) => {
    const { email, password } = req.body;

    // Validate input
    if (!email || !password) {
        return res.status(400).json({ message: 'Email and password are required' });
    }

    try {
        const user = await User.findOne({ email });
        if (!user) {
            return res.status(401).json({ message: 'Invalid credentials' });
        }

        const isMatch = await bcrypt.compare(password, user.password);
        if (!isMatch) {
            return res.status(401).json({ message: 'Invalid credentials' });
        }

        // Generate JWT token
        const token = jwt.sign(
            { userId: user._id, email: user.email },
            process.env.JWT_SECRET,
        );

        res.status(200).json({
            message: 'Login successful',
            user: { name: user.name, email: user.email },
            token
        });
    } catch (error) {
        console.error('Error logging in:', error);
        res.status(500).json({ message: error.message || 'Internal Server Error' });
    }
});

export default routerUser;