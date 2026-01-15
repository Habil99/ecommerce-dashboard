import { PrismaClient } from '@prisma/client'
import { PrismaPg } from '@prisma/adapter-pg'
import { Pool } from 'pg'

const pool = new Pool({ connectionString: process.env.DATABASE_URL })
const adapter = new PrismaPg(pool)
const prisma = new PrismaClient({ adapter })

async function main() {
  // Clean existing data
  await prisma.orderItem.deleteMany()
  await prisma.order.deleteMany()
  await prisma.product.deleteMany()
  await prisma.customer.deleteMany()

  // Create customers
  const customers = await Promise.all([
    prisma.customer.create({
      data: {
        name: 'John Doe',
        email: 'john@example.com',
        phone: '+1234567890',
        address: '123 Main St, New York, NY 10001',
      },
    }),
    prisma.customer.create({
      data: {
        name: 'Jane Smith',
        email: 'jane@example.com',
        phone: '+1234567891',
        address: '456 Oak Ave, Los Angeles, CA 90001',
      },
    }),
    prisma.customer.create({
      data: {
        name: 'Bob Johnson',
        email: 'bob@example.com',
        phone: '+1234567892',
        address: '789 Pine Rd, Chicago, IL 60601',
      },
    }),
  ])

  // Create products
  const products = await Promise.all([
    prisma.product.create({
      data: {
        name: 'Wireless Headphones',
        description: 'High-quality noise-cancelling wireless headphones',
        price: 199.99,
        stock: 50,
        category: 'Electronics',
        imageUrl: '/products/headphones.jpg',
      },
    }),
    prisma.product.create({
      data: {
        name: 'Smart Watch',
        description: 'Fitness tracker with heart rate monitor',
        price: 299.99,
        stock: 30,
        category: 'Electronics',
        imageUrl: '/products/smartwatch.jpg',
      },
    }),
    prisma.product.create({
      data: {
        name: 'Running Shoes',
        description: 'Comfortable running shoes for all terrains',
        price: 89.99,
        stock: 100,
        category: 'Sports',
        imageUrl: '/products/shoes.jpg',
      },
    }),
    prisma.product.create({
      data: {
        name: 'Coffee Maker',
        description: 'Programmable coffee maker with thermal carafe',
        price: 79.99,
        stock: 25,
        category: 'Home',
        imageUrl: '/products/coffee-maker.jpg',
      },
    }),
    prisma.product.create({
      data: {
        name: 'Yoga Mat',
        description: 'Non-slip yoga mat with carrying strap',
        price: 29.99,
        stock: 75,
        category: 'Sports',
        imageUrl: '/products/yoga-mat.jpg',
      },
    }),
    prisma.product.create({
      data: {
        name: 'Laptop Stand',
        description: 'Adjustable aluminum laptop stand',
        price: 49.99,
        stock: 40,
        category: 'Office',
        imageUrl: '/products/laptop-stand.jpg',
      },
    }),
    prisma.product.create({
      data: {
        name: 'Water Bottle',
        description: 'Insulated stainless steel water bottle',
        price: 24.99,
        stock: 150,
        category: 'Sports',
        imageUrl: '/products/water-bottle.jpg',
      },
    }),
    prisma.product.create({
      data: {
        name: 'Desk Lamp',
        description: 'LED desk lamp with adjustable brightness',
        price: 39.99,
        stock: 60,
        category: 'Office',
        imageUrl: '/products/desk-lamp.jpg',
      },
    }),
  ])

  // Create orders
  const order1 = await prisma.order.create({
    data: {
      customerId: customers[0].id,
      status: 'DELIVERED',
      total: 489.98,
      items: {
        create: [
          {
            productId: products[0].id,
            quantity: 1,
            price: 199.99,
          },
          {
            productId: products[1].id,
            quantity: 1,
            price: 299.99,
          },
        ],
      },
    },
  })

  const order2 = await prisma.order.create({
    data: {
      customerId: customers[1].id,
      status: 'SHIPPED',
      total: 119.98,
      items: {
        create: [
          {
            productId: products[2].id,
            quantity: 1,
            price: 89.99,
          },
          {
            productId: products[4].id,
            quantity: 1,
            price: 29.99,
          },
        ],
      },
    },
  })

  const order3 = await prisma.order.create({
    data: {
      customerId: customers[2].id,
      status: 'PROCESSING',
      total: 154.97,
      items: {
        create: [
          {
            productId: products[3].id,
            quantity: 1,
            price: 79.99,
          },
          {
            productId: products[6].id,
            quantity: 3,
            price: 24.99,
          },
        ],
      },
    },
  })

  const order4 = await prisma.order.create({
    data: {
      customerId: customers[0].id,
      status: 'PENDING',
      total: 89.98,
      items: {
        create: [
          {
            productId: products[5].id,
            quantity: 1,
            price: 49.99,
          },
          {
            productId: products[7].id,
            quantity: 1,
            price: 39.99,
          },
        ],
      },
    },
  })

  console.log('Database seeded successfully!')
  console.log(`Created ${customers.length} customers`)
  console.log(`Created ${products.length} products`)
  console.log(`Created 4 orders with items`)
}

main()
  .catch((e) => {
    console.error(e)
    process.exit(1)
  })
  .finally(async () => {
    await prisma.$disconnect()
  })
