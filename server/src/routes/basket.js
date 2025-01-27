const router = require('express').Router();
const { PrismaClient } = require("@prisma/client");
const authenticateToken = require('./middleware/authenticateToken');

const prisma = new PrismaClient();

// get someone's basket
router.get("/", authenticateToken, async (req, res) => {
    try {
        const userId = req.user.id;
        let basket = await prisma.basket.findUnique({ 
            where: { userId },
            include: {
                items: {
                    include: { product: true }
                }
            }
        });
        
        if (!basket) {
            basket = await prisma.basket.create({
                data: { userId },
                include: {
                    items: {
                        include: {
                            product:true
                        }
                    }
                }
            });
        }

        res.json(basket);
    } catch (error) {
        console.error("Error fetching basket", error);
        res.status(500).json(error: "Server error");
    }
});