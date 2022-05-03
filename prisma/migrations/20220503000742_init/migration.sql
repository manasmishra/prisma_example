-- CreateTable
CREATE TABLE "Customer" (
    "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "email" TEXT NOT NULL,
    "name" TEXT
);

-- CreateTable
CREATE TABLE "Transactions" (
    "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "createdAt" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" DATETIME NOT NULL,
    "customerId" INTEGER,
    CONSTRAINT "Transactions_customerId_fkey" FOREIGN KEY ("customerId") REFERENCES "Customer" ("id") ON DELETE SET NULL ON UPDATE CASCADE
);

-- CreateTable
CREATE TABLE "Cashbacks" (
    "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "createdAt" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "cashback" REAL NOT NULL
);

-- CreateTable
CREATE TABLE "Rulesets" (
    "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "createdAt" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "startDate" DATETIME NOT NULL,
    "endDate" DATETIME NOT NULL,
    "cashback" REAL NOT NULL,
    "redemptionLimit" INTEGER NOT NULL,
    "minTransactions" INTEGER DEFAULT 0
);

-- CreateTable
CREATE TABLE "RulesetsOnTransactions" (
    "rulesetId" INTEGER NOT NULL,
    "transactionId" INTEGER NOT NULL,
    "assignedAt" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "cashbackId" INTEGER,

    PRIMARY KEY ("rulesetId", "transactionId"),
    CONSTRAINT "RulesetsOnTransactions_transactionId_fkey" FOREIGN KEY ("transactionId") REFERENCES "Transactions" ("id") ON DELETE RESTRICT ON UPDATE CASCADE,
    CONSTRAINT "RulesetsOnTransactions_cashbackId_fkey" FOREIGN KEY ("cashbackId") REFERENCES "Cashbacks" ("id") ON DELETE SET NULL ON UPDATE CASCADE,
    CONSTRAINT "RulesetsOnTransactions_rulesetId_fkey" FOREIGN KEY ("rulesetId") REFERENCES "Rulesets" ("id") ON DELETE RESTRICT ON UPDATE CASCADE
);

-- CreateTable
CREATE TABLE "RulesetsOnCustomers" (
    "rulesetId" INTEGER NOT NULL,
    "customerId" INTEGER NOT NULL,
    "assignedAt" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "rulesetReedemedCount" INTEGER NOT NULL,

    PRIMARY KEY ("rulesetId", "customerId"),
    CONSTRAINT "RulesetsOnCustomers_customerId_fkey" FOREIGN KEY ("customerId") REFERENCES "Customer" ("id") ON DELETE RESTRICT ON UPDATE CASCADE,
    CONSTRAINT "RulesetsOnCustomers_rulesetId_fkey" FOREIGN KEY ("rulesetId") REFERENCES "Rulesets" ("id") ON DELETE RESTRICT ON UPDATE CASCADE
);

-- CreateIndex
CREATE UNIQUE INDEX "Customer_email_key" ON "Customer"("email");
