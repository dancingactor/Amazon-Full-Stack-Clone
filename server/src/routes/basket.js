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
        let { productId } = req.body;
        productId = parseInt(productId)

        const basket = await prisma.basket.findUnique({ where: { userId } });

        // Using findFirst here instead of findUnique because none of the arguments of 'where' is 'id' field
        let basketItem = await prisma.basketItem.findFirst({
            where: { basketId: basket.id, productId }
        })

        if (basketItem) {
            basketItem = await prisma.basketItem.update({
                where: { id: basketItem.id },
                data: { quantity: { increment: 1 } }
            });
        } else {
            basketItem = await prisma.basketItem.create({
                data: { basketId: basket.id, productId, quantity: 1 }
            })
        }

        res.json(basketItem);
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: "Server error"});
    }
});

router.delete("/", authenticateToken, async (req, res) => {
    try {
        const userId = req.user.id;
        const { productId } = req.body;
        
        const basketItem = await prisma.basketItem.findUnique({ 
            where: {
                productId: parseInt(productId),
                basket: { userId } 
            },
        });

        if (!basketItem) {
            return res.json(404).json({ error: "Basket Item not found" });
        }
        
        const updatedItem = await prisma.basketItem.update({
            where: {
                productId: parseInt(productId),
                basket: { userId } 
            },
            data: {
                quantity: { decrement: 1 }
            }
        })
        
        if (updatedItem.quantity <= 0) {
            await prisma.basketItem.delete({ where: { id: updatedItem.id } });
        };
        
        res.json(updatedItem);
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: "Server error" });
    }
});

module.exports = router;