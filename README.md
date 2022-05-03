# REST API Example

This example uses **REST API** using [Express](https://expressjs.com/) and [Prisma Client](https://www.prisma.io/docs/concepts/components/prisma-client) to build a cashback system based on certain transactions done by customers and related crud operations. It uses a SQLite database file with some initial dummy data which you can find at [`./prisma/dev.db`](./prisma/dev.db).

## Getting started

### 1. Download example and install dependencies

Download this example:

```
curl https://github.com/manasmishra/prisma_example.git
```

Install npm dependencies:
```
cd prisma_example
npm install
```

<details><summary><strong>Alternative:</strong> Clone the entire repo</summary>

Clone this repository:

```
git clone git@github.com:manasmishra/prisma_example.git
```

Install npm dependencies:

```
cd prisma-examples
npm install
```

</details>

### 2. Create and seed the database

Run the following command to create your SQLite database file. This also creates the `User` and `Post` tables that are defined in [`prisma/schema.prisma`](./prisma/schema.prisma):

```
npx prisma migrate dev --name init
```

When `npx prisma migrate dev` is executed against a newly created database, seeding is also triggered.  The seed file in [`prisma/seed.js`](./prisma/seed.js) will be executed and your database will be populated with the sample data.


### 3. Start the REST API server

```
npm run dev
```

The server is now running on `http://localhost:3000`. You can send the API requests implemented in `index.js`, e.g. [`http://localhost:3000/feed`](http://localhost:3000/feed).

## Design considerations some assumptions and some TBD features

### `Assumptions`

- `Input Validation and ERROR handling`: I have not implemented any kind of input parameters validation and also no error handling has been implemented considered only happy path.
- `Authentication and Authorization`: None of the APIs are implemented with authentication in mind.

### `TO BE DONE: (considered but not implemented)`

- `Input Validation and ERROR handling`: I have not implemented any kind of input parameters validation and also no error handling has been implemented considered only happy path.
- `Authentication and Authorization`: None of the APIs are implemented with authentication in mind.
- `Linked to a Actual DB`: SQLite has been used as a DB which stores data in a file. Actual DB has not ben used. but have used ORM to plugin DB as per the need.
- `Logging`: Have not used any logged whereever needed have used std out logged i.e console.log to make it easy for implementing a centralized logging server in future.
- `Unit Testing and Integration Testing`: Testing is not covered in this example. I am sending it for review and also implementing testing at the same time. If needed or not do update me accordingly will proceed.

## Using the REST API

You can access the REST API of the server using the following endpoints:

### `GET`

- `/customers`: Fetch all customers. Should be only allowed for admin users. `no authentication has been done yet`
- `/customer/:id`: Fetch one customer that matches with `id`
- `/customers/:id/transactions`: Fetch one customer that matches `id`. Also retrieve all transactions that are done by the customer.
- `/customers/:id/transactions/rulesets`: Fetch one customer that matches `id`. Also retrieve all transactions that are done by the customer and linked rulesets applied for each transaction.
- `TBD:`: All above APIs must be done with pagination using below query params but could not do it.
  - Query Parameters
    - `take` (optional): This specifies how many objects should be returned in the list
    - `skip` (optional): This specifies how many of the returned objects in the list should be skipped
    - `orderBy` (optional): The sort order for posts in either ascending or descending order. The value can either `asc` or `desc`
### `POST`

- `/customers`: Create a new customer
  - Body:
    - `name: String` (required): The title of the post
    - `email: String` (required): The content of the post

### `GET`

- `/cashbacks`: Fetch all cashbacks. (Only should be permitted for admins for now no authentication and authorization implemented)
- `/cashbacks/:id`: Fetch one cashback with `id`
- `/cashbacks/:id/transactions`: Fetch one cashback with `id` along with its linked transactions and rulesets that is how this cashback is earned.
- `/cashbacks/transactions`: Fetch all cashbacks along with its linked transactions and rulesets that is how this cashback is earned.
- `TBD:`: All above APIs must be done with pagination using below query params but could not do it. Also needs to have filter criteria based on date range.

### `GET`

- `/rulesets`: Fetch all rulesets. (Only should be permitted for admins for now no authentication and authorization implemented)
- `TBD:`: All above APIs must be done with pagination using below query params but could not do it. Also needs to have filter criteria based on date range.
  - Query Parameters
    - `take` (optional): This specifies how many objects should be returned in the list
    - `skip` (optional): This specifies how many of the returned objects in the list should be skipped
    - `orderBy` (optional): The sort order for posts in either ascending or descending order. The value can either `asc` or `desc`

### `POST`

- `/transactions`: Creates a transaction as per current date and time. Also applies all the rulesets and calculates cashback that is earned as part of this transaction. Also considers eligibility criteria such as minTransactions and reedemptionLimit.
  - Body:
    - `customerId: Int` (required): Transaction will be created for the customer.