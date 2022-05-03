const { PrismaClient } = require('@prisma/client')

const prisma = new PrismaClient()

async function createTransaction(customerId){
  return prisma.transactions.create({
    data: {
      customerId
    }
  })
}

async function ruleSetsFindByDate(createdAt){
  return prisma.rulesets.findMany({
    where: {
      AND: [
        {
          startDate: {
            lte: createdAt
          },
        },
        {
          endDate: {
            gte: createdAt
          },
        }
      ]
    },
  })
}

module.exports = {
  createTransaction,
  ruleSetsFindByDate
}