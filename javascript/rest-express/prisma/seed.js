const { PrismaClient } = require('@prisma/client')

const prisma = new PrismaClient()

const customerData = [
  {
    name: 'Alice',
    email: 'alice@prisma.io',
  },
  {
    name: 'Nilu',
    email: 'nilu@prisma.io',
  },
  {
    name: 'Mahmoud',
    email: 'mahmoud@prisma.io',
  },
]

const rulesetsData = [
  {
    startDate: new Date('2022-05-01'),
    endDate: new Date('2022-05-31'),
    cashback: 2.00,
    redemptionLimit: 10
  },
  {
    startDate: new Date('2022-05-04'),
    endDate: new Date('2022-05-31'),
    cashback: 1.00,
    redemptionLimit: 20
  },
  {
    startDate: new Date('2022-05-02'),
    endDate: new Date('2022-05-31'),
    cashback: 3.00,
    redemptionLimit: 10
  },
]

async function main() {
  console.log(`Start seeding ...`)
  for (const u of customerData) {
    const user = await prisma.customer.create({
      data: u,
    })
    console.log(`Created user with id: ${user.id}`)
  }
  for (const r of rulesetsData) {
    const ruleset = await prisma.rulesets.create({
      data: r,
    })
    console.log(`Created ruleset with id: ${ruleset.id}`)
  }
  console.log(`Seeding finished.`)
}

main()
  .catch((e) => {
    console.error(e)
    process.exit(1)
  })
  .finally(async () => {
    await prisma.$disconnect()
  })
