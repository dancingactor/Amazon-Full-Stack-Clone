const router = require('express').Router();
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const prisma = require('@prisma/client');

router.post("/register", async (req, res) => {
    try {
        const { email, password } = req.body;
        
        // Check if user already exists, if user exists, return the user info. Otherwise, return none
        const existingUser = await prisma.user.findUnique({ where: { email } });
        if (existingUser) {
            return res.status(400).json({ msg: "User already exists" });
        }

        const hashedPassword = await bcrypt.hash(password, 10);

        // Create a User
        const newUser = await prisma.user.create({
            data: {
                email,
                password: hashedPassword
            }
        });

        // create JWT
        const token = jwt.sign({ userId: newUser.id }, process.env.JWT_SECRET, {
            expiresIn: '1d'
        });

        res.json({
            message: "User registered successfully",
            token,
            user: { id: newUser.id, email: newUser.email }
        });
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: "Server error"} )
    }
})