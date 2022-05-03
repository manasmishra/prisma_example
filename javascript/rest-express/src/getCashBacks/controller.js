const { PrismaClient } = require('@prisma/client')

const prisma = new PrismaClient()

async function getCashBacksWithTransactionsAndAppliedRuleSets(req, res){
  const cashbacks = await prisma.cashbacks.findMany({
    include: {
      rulesetOnTransactions: {
        include: {
          ruleset: true,
          transaction: true
        }
      },
    },
  })
  res.json(cashbacks)
}

module.exports = {
  getCashBacksWithTransactionsAndAppliedRuleSets
}