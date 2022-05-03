const { PrismaClient } = require('@prisma/client')

const prisma = new PrismaClient()

async function createCustomers(req, res) {
  const { name, email } = req.body

  const result = await prisma.customer.create({
    data: {
      name,
      email,
    },
  })
  res.json(result)
}

module.exports = {
  createCustomers
}