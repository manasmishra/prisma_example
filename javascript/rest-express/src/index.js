const express = require('express')
const { PrismaClient } = require('@prisma/client')
const { createTransaction: createTransactionController } = require("./createTransaction/controller")
const { getCashBacksWithTransactionsAndAppliedRuleSets } = require("./getCashBacks/controller")
const { getCustomers } = require("./getCustomers/controller")
const { createCustomers } = require("./createCustomers/controller")

const prisma = new PrismaClient()
const app = express()

app.use(express.json())

app.post(`/customers`, createCustomers)

app.get('/customers', getCustomers)

app.post('/transactions', createTransactionController)


app.get('/transactions', async (req, res) => {
  const users = await prisma.transactions.findMany()
  res.json(users)
})

app.get('/rulesets', async (req, res) => {
  const rulesets = await prisma.rulesets.findMany()
  res.json(rulesets)
})

app.get('/cashbacks', getCashBacksWithTransactionsAndAppliedRuleSets)

const server = app.listen(3000, () =>
  console.log(`
🚀 Server ready at: http://localhost:3000`),
)
