const { PrismaClient } = require('@prisma/client')

const prisma = new PrismaClient()

async function getCustomers(req, res) {
  const customers = await prisma.customer.findMany({
    include: {
      transactions: true,
      rulesets: true,
    },
  })
  res.json(customers)
}

module.exports = {
  getCustomers
}