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
        res.status(500).json({ error: "Server error" });
    }
});

// add an item to the basket
router.post("/", authenticateToken, async (req, res) => {
    try {
        const userId = req.user.id;
        const { productId, quantity } = req.body;
        
        const product = await prisma.product.findUnique({ where: { id: productId }});
        if (!product) {
            return res.status(404).json({ error: "Product not found"});
        }

        const basket = await prisma.basket.findUnique({ where: { userId } });
        if (!basket) {
            await prisma.basket.create({ data: { userId } });
        }

        let basketItem = await prisma.basketItem.findUnique({
            where: { baksetId: basket.id, productId }
        })

        if (basketItem) {
            basketItem = await prisma.basketItem.update({
                where: { id: basketItem.id },
                data: { quantity: basketItem.quantity + quantity }
            });
        } else {
            basketItem = await prisma.basketItem.create({
                data: { basketId: basket.id, productId, quantity }
            })
        }

        res.json(basketItem);
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: "Server error"});
    }
});