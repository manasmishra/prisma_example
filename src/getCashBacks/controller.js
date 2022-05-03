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

async function getCashBacks(req, res){
  const cashbacks = await prisma.cashbacks.findMany({})
  res.json(cashbacks)
}

async function getCashBackById(req, res){
  const { id } = req.params
  const cashbacks = await prisma.cashbacks.findUnique({
    where: {
      id: parseInt(id)
    },
  })
  res.json(cashbacks)
}

async function getCashBackByIdWithTransactionsAndRulesetsApplied(req, res){
  const { id } = req.params
  const cashbacks = await prisma.cashbacks.findUnique({
    where: {
      id: parseInt(id)
    },
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
  getCashBacks,
  getCashBackById,
  getCashBackByIdWithTransactionsAndRulesetsApplied,
  getCashBacksWithTransactionsAndAppliedRuleSets
}