const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient();

async function main () {
    const products = [
        {
          title: "Wireless Mouse",
          image: "https://example.com/images/wireless-mouse.jpg",
          price: 25.99,
          rating: 4,
        },
        {
          title: "Mechanical Keyboard",
          image: "https://example.com/images/mechanical-keyboard.jpg",
          price: 89.99,
          rating: 5,
        },
        {
          title: "HD Monitor",
          image: "https://example.com/images/hd-monitor.jpg",
          price: 199.99,
          rating: 4,
        },
        {
          title: "USB-C Hub",
          image: "https://example.com/images/usb-c-hub.jpg",
          price: 45.50,
          rating: 4,
        },
        {
          title: "Gaming Chair",
          image: "https://example.com/images/gaming-chair.jpg",
          price: 149.99,
          rating: 5,
        },
        // Add more products as needed
    ];
    
    for (const product of products) {
        await prisma.product.upsert({
            where: { title: product.title},
            update: {},
            create: product
        });
    }

    console.log("Database has been seeded. 🌱");
}

main()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
