const { PrismaClient } = require('@prisma/client')

const prisma = new PrismaClient()

const { createTransaction: createTransactionDBEntry, ruleSetsFindByDate } = require("./models")

function getTotalCashBack(filteredRuleSets) {
  return filteredRuleSets.reduce(
    (previousValue, filteredRuleSet) => previousValue + filteredRuleSet.cashback,
    0
  );
}

async function createTransaction(customerId) {
  return await prisma.$transaction(async (prisma) => {
    const transactions = await createTransactionDBEntry(customerId)
    const filteredRuleSets = await ruleSetsFindByDate(transactions.createdAt)

    for (const r of filteredRuleSets) {
      const rulesetOnCustomer = await prisma.RulesetsOnCustomers.findMany({
        where: {
          AND: [
            {
              rulesetId: r.id,
            },
            {
              customerId
            }
          ]
        },
      });
      const countOfTransactionsDoneByCustomer =  await prisma.transactions.findMany({
        where: {
          customerId
        }
      });
      if(countOfTransactionsDoneByCustomer.length >= r.minTransactions) {
        if (!rulesetOnCustomer.length) {
          await prisma.RulesetsOnCustomers.create({
            data: {
              rulesetId: r.id,
              customerId,
              rulesetReedemedCount: 1,
            }
          })
        } else if (rulesetOnCustomer[0].rulesetReedemedCount < r.redemptionLimit) {
          const rulesetId = rulesetOnCustomer[0].rulesetId;
          const customerId = rulesetOnCustomer[0].customerId;
          await prisma.RulesetsOnCustomers.update({
            where: {
              rulesetId_customerId: { rulesetId, customerId }
            },
            data: { rulesetReedemedCount: { increment: 1 } },
          })
        }
      }

      const totalCashBack = getTotalCashBack(filteredRuleSets)
      const cashback = await prisma.cashbacks.create({
        data: {
          cashback: totalCashBack
        }
      })
      const rulesetsontransactionsArr = []
      // filteredRuleSets.forEach(filteredRuleSet => {
      //   rulesetsontransactionsArr.push({
      //     rulesetId: filteredRuleSet.id,
      //     transactionId: transactions.id,
      //     cashbackId: cashback.id,
      //   })
      // });

      // const rulesetsontransactions = await prisma.RulesetsOnTransactions.createMany({
      //   data: rulesetsontransactionsArr,
      //   skipDuplicates: true,
      // })
      for (const r of filteredRuleSets) {
        const rulesetsontransaction = await prisma.RulesetsOnTransactions.create({
          data: {
            rulesetId: r.id,
            transactionId: transactions.id,
            cashbackId: cashback.id,
          },
        })
        rulesetsontransactionsArr.push(rulesetsontransaction)
      }
      return rulesetsontransactionsArr;
    }
  })
}
module.exports = {
  createTransaction
}