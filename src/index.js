const express = require('express')
const { PrismaClient } = require('@prisma/client')
const { createTransaction: createTransactionController } = require("./createTransaction/controller")
const { 
  getCashBacks,
  getCashBackById,
  getCashBackByIdWithTransactionsAndRulesetsApplied,
  getCashBacksWithTransactionsAndAppliedRuleSets
} = require("./getCashBacks/controller")
const { getCustomers } = require("./getCustomers/controller")
const { createCustomers } = require("./createCustomers/controller")
const {
  getCustomerById,
  getCustomerByIdWithTransactions,
  getCustomerByIdWithTransactionsAndRelatedRuleSets
} = require("./getCustomerById/controller")

const prisma = new PrismaClient()
const app = express()

app.use(express.json())

app.post(`/customers`, createCustomers)

app.get('/customers', getCustomers)
app.get('/customers/:id', getCustomerById)
app.get('/customers/:id/transactions', getCustomerByIdWithTransactions)
app.get('/customers/:id/transactions/rulesets', getCustomerByIdWithTransactionsAndRelatedRuleSets)

app.post('/transactions', createTransactionController)


app.get('/transactions', async (req, res) => {
  const users = await prisma.transactions.findMany()
  res.json(users)
})

app.get('/rulesets', async (req, res) => {
  const rulesets = await prisma.rulesets.findMany()
  res.json(rulesets)
})

app.get('/cashbacks', getCashBacks)
app.get('/cashbacks/:id', getCashBackById)
app.get('/cashbacks/:id/transactions', getCashBackByIdWithTransactionsAndRulesetsApplied)
app.get('/cashbacks/transactions', getCashBacksWithTransactionsAndAppliedRuleSets)

const server = app.listen(3000, () =>
  console.log(`
🚀 Server ready at: http://localhost:3000`),
)
