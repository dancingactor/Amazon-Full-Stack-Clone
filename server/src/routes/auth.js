const router = require('express').Router();
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const { PrismaClient } = require('@prisma/client');

const prisma = new PrismaClient();

router.post("/register", async (req, res) => {
    try {
        const { email, password } = req.body;
        
        // Check if user already exists in DB, if user exists, return the user info. Otherwise, return none
        const existingUser = await prisma.user.findUnique({ where: { email } });
        if (existingUser) {
            return res.status(400).json({ msg: "User already exists" });
        }

        const hashedPassword = await bcrypt.hash(password, 10);

        // Create a User in DB
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

router.post("/login", async (req, res) => {
    try {
        const { email, password } = req.body;

        const user = await prisma.user.findUnique({ where: { email } });
        if (!user) {
            return res.status(400).json({ error: "Invalid credentials" });
        }
        
        // if user exists, check password
        const isMatch = await bcrypt.compare(password, user.password);
        if (!isMatch) {
            return res.status(400).json({ error: "Invalid credentials" });
        }

        // Generate JWT token
        const token = await jwt.sign({ userId: user.id }, process.env.JWT_SECRET, {
            expiresIn: "1d"
        })

        res.json({ 
            message: 'Logged in successfully', 
            token, 
            user: { id: user.id, email: user.email } 
          });
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: "Server error"});
    };
});

module.exports = router;