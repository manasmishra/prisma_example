const { createTransaction: createTransactionHelper } = require("./helper")
async function createTransaction(req, res) {
  const { customerId } = req.body
  const rulesetsontransactionsArr = await createTransactionHelper(customerId);
  
  console.log("filteredRuleSets:", rulesetsontransactionsArr);
  res.json(rulesetsontransactionsArr)
}

module.exports = {
  createTransaction
}