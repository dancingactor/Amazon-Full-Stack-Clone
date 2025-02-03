const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient();

async function main () {
    const products = [
        {
            id: 12321341,
            title: "Apple AirTag 4 Pack",
            price: 89.99,
            image: "https://m.media-amazon.com/images/I/71gY9E+cTaS._AC_SX679_.jpg",
            rating: 5
        },
        {
            id: 39513742,
            title: "COSRX Snail Mucin 96% Power Repairing Essence 3.38 fl.oz, 100ml, Hydrating Serum for Face with Snail Secretion Filtrate for Dull and Damaged Skin",
            price: 13.26,
            image: "https://m.media-amazon.com/images/I/51IF5kpotSL._SX466_.jpg",
            rating: 4
        },
        {
            id: 28371624,
            title: "WHOLE FOODS MARKET 4 Star Chocolate Mousse Cake 3 inch",
            price: 29.99,
            image: "https://m.media-amazon.com/images/I/61hnPoo+rKL._SX679_.jpg",
            rating: 4
        },
        {
            id: 55938442,
            title: "Certified Refurbished Ring Stick Up Cam Battery HD security camera with custom privacy controls, Simple setup, Works with Alexa",
            price: 54.99,
            image: "https://m.media-amazon.com/images/I/41Hc4IGGzdL._SY450_.jpg",
            rating: 4
        },
        {
            id: 67849302,
            title: "Y2K Crochet Crop Top See Through Hollow Out Sweater Pullover Long Sleeve Knit Color Block Casual Streetwear",
            price: 23.99,
            image: "https://m.media-amazon.com/images/I/71YPc4GGxrL._AC_UX569_.jpg",
            rating: 3
        },
        {
            id: 99238472,
            title: "yeedi vac x Robot Vacuum - Ultra-Slim Design, Powerful 3000Pa Suction, Carpet Detection, Smart Mapping - Ideal for Carpet, Hard Floor Cleaning, Pets - Alexa Compatible, Wi-Fi Connected",
            price: 169.98,
            image: "https://m.media-amazon.com/images/I/61i-GuR9qKS._AC_SX569_.jpg",
            rating: 4
        }
    ];
    
    for (const product of products) {
        await prisma.product.upsert({
            where: { id: product.id },
            update: {},
            create: product
        });
    }

    console.log("Database has been seeded. 🌱");
}

main();
