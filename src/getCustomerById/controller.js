const { PrismaClient } = require('@prisma/client')

const prisma = new PrismaClient()

async function getCustomerById(req, res) {
  const { id } = req.params
  const customers = await prisma.customer.findUnique({
    where: {
      id: parseInt(id)
    },
  })
  res.json(customers)
}

async function getCustomerByIdWithTransactions(req, res) {
  const { id } = req.params
  const customers = await prisma.customer.findUnique({
    where: {
      id: parseInt(id)
    },
    include: {
      transactions: true,
    },
  })
  res.json(customers)
}

async function getCustomerByIdWithTransactionsAndRelatedRuleSets(req, res) {
  const { id } = req.params
  const customers = await prisma.customer.findUnique({
    where: {
      id: parseInt(id)
    },
    include: {
      transactions: {
        select: {
          id: true,
          createdAt: true,
          rulesetsApplied: true
        }
      },
    },
  })
  res.json(customers)
}

module.exports = {
  getCustomerById,
  getCustomerByIdWithTransactions,
  getCustomerByIdWithTransactionsAndRelatedRuleSets
}