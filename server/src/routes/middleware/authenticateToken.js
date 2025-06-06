const jwt = require('jsonwebtoken');
const { PrismaClient } = require('@prisma/client');

const prisma = new PrismaClient();

const authenticateToken = async (req, res, next) => {
    const authHeader = req.headers['authorization'];
    const token = authHeader && authHeader.split(' ')[1];

    if (!token) {
        return res.status(401).json({ error: "Access Token missing" });
        // 401 is unauthorized error
    }

    try {
        const decoded = jwt.verify(token, process.env.JWT_SECRET)
        const user = await prisma.user.findUnique({ where: { id: decoded.userId } });
        
        if (!user) {
            return res.status(403).json({ error: "User not found" });
            // 403 is Forbidden
        }

        req.user = user;
        next();
    } catch (error) {
        console.error("Authentication error", error);
        res.status(403).json({ error: "Invalid token"});
    }
}

module.exports = authenticateToken;