# Fox Shop API

A NestJS-based REST API for managing product inventory with price history tracking.

## Project Creation and Structure

This project was created using:
```bash
nest new {project-name}
```

### Technology Stack
- **Framework**: NestJS
- **Database**: PostgreSQL
- **ORM**: TypeORM
- **Documentation**: Swagger/OpenAPI
- **Testing**: Jest with SuperTest

### Project Design Considerations
- Implemented price history tracking for product price changes
- Used soft delete pattern for product deactivation
- Implemented flexible product filtering (name search, stock levels)
- Database schema auto-synchronization for development
- Separate test database configuration

## Running the Project

### Using Docker
```bash
# Build and start all services
docker-compose up --build

# Stop all services
docker-compose down -v
```

### Running Locally
1. Install dependencies:
```bash
npm install
```

2. Make sure PostgreSQL is running and accessible with credentials from `.env`

3. Start the application:
```bash
# Development mode with auto-reload
npm run start:dev
```

The API will be available at:
- Swagger Documentation: `http://localhost:3000/api`

### Running tests
```bash
# Run e2e tests
docker-compose exec api npm run test:e2e
```

## Environment Setup

1. Copy `.env.example` to `.env`:
```bash
DB_HOST=postgres
DB_PORT=5432
DB_USERNAME=postgres
DB_PASSWORD=postgres
DB_NAME=fox_shop
PORT=3000
```

2. Docker setup:
```bash
# Build and start services
docker-compose up --build

# Stop services
docker-compose down -v
```

## API Documentation

Access Swagger documentation at: `http://localhost:3000/api`

### Test Endpoints (PowerShell)

1. Create Product:
```powershell
$body = @{
    name = "Test Product"
    price = 9.99
    stockQuantity = 100
} | ConvertTo-Json

Invoke-RestMethod -Uri "http://localhost:3000/products" -Method Post -Body $body -ContentType "application/json"
```

2. Get All Products:
```powershell
Invoke-RestMethod -Uri "http://localhost:3000/products" -Method Get
```

3. Get Product by ID:
```powershell
Invoke-RestMethod -Uri "http://localhost:3000/products/{id}" -Method Get
```

4. Update Product:
```powershell
$body = @{
    price = 19.99
    stockQuantity = 50
} | ConvertTo-Json

Invoke-RestMethod -Uri "http://localhost:3000/products/{id}" -Method Patch -Body $body -ContentType "application/json"
```

5. Get Price History:
```powershell
Invoke-RestMethod -Uri "http://localhost:3000/products/{id}/price-history" -Method Get
```

6. Deactivate Product:
```powershell
Invoke-RestMethod -Uri "http://localhost:3000/products/{id}" -Method Delete
```

### Test Endpoints (Windows Command Prompt with cURL)

1. Create Product:
```cmd
curl -X POST -H "Content-Type: application/json" -d "{\"name\":\"Test Product\",\"price\":9.99,\"stockQuantity\":100}" http://localhost:3000/products
```

2. Get All Products:
```cmd
curl http://localhost:3000/products
```

3. Get Product by ID:
```cmd
curl http://localhost:3000/products/{id}
```

4. Update Product:
```cmd
curl -X PATCH -H "Content-Type: application/json" -d "{\"price\":19.99,\"stockQuantity\":50}" http://localhost:3000/products/{id}
```

5. Get Price History:
```cmd
curl http://localhost:3000/products/{id}/price-history
```

6. Deactivate Product:
```cmd
curl -X DELETE http://localhost:3000/products/{id}
```

### Test Endpoints (Bash/Linux/Git Bash)

1. Create Product:
```bash
curl -X POST http://localhost:3000/products \
  -H "Content-Type: application/json" \
  -d '{"name":"Test Product","price":9.99,"stockQuantity":100}'
```

2. Get All Products:
```bash
curl http://localhost:3000/products
```

## Testing

The project includes end-to-end tests for all endpoints. To run tests:

```bash
# Make sure containers are running
docker-compose up -d

# Run e2e tests
docker-compose exec api npm run test:e2e
```

## Project Structure

- `src/modules/products/` - Product module implementation
- `src/config/` - Configuration files including database setup
- `test/` - E2E test files
- `init.sql` - Database initialization script

## Database Configuration

The project uses two databases:
- Main database: `fox_shop`
- Test database: `fox_shop_test`

Both databases are automatically created and configured through the `init.sql` script when running Docker Compose.

---


<p align="center">
  <a href="http://nestjs.com/" target="blank"><img src="https://nestjs.com/img/logo-small.svg" width="120" alt="Nest Logo" /></a>
</p>

[circleci-image]: https://img.shields.io/circleci/build/github/nestjs/nest/master?token=abc123def456
[circleci-url]: https://circleci.com/gh/nestjs/nest

  <p align="center">A progressive <a href="http://nodejs.org" target="_blank">Node.js</a> framework for building efficient and scalable server-side applications.</p>
    <p align="center">
<a href="https://www.npmjs.com/~nestjscore" target="_blank"><img src="https://img.shields.io/npm/v/@nestjs/core.svg" alt="NPM Version" /></a>
<a href="https://www.npmjs.com/~nestjscore" target="_blank"><img src="https://img.shields.io/npm/l/@nestjs/core.svg" alt="Package License" /></a>
<a href="https://www.npmjs.com/~nestjscore" target="_blank"><img src="https://img.shields.io/npm/dm/@nestjs/common.svg" alt="NPM Downloads" /></a>
<a href="https://circleci.com/gh/nestjs/nest" target="_blank"><img src="https://img.shields.io/circleci/build/github/nestjs/nest/master" alt="CircleCI" /></a>
<a href="https://coveralls.io/github/nestjs/nest?branch=master" target="_blank"><img src="https://coveralls.io/repos/github/nestjs/nest/badge.svg?branch=master#9" alt="Coverage" /></a>
<a href="https://discord.gg/G7Qnnhy" target="_blank"><img src="https://img.shields.io/badge/discord-online-brightgreen.svg" alt="Discord"/></a>
<a href="https://opencollective.com/nest#backer" target="_blank"><img src="https://opencollective.com/nest/backers/badge.svg" alt="Backers on Open Collective" /></a>
<a href="https://opencollective.com/nest#sponsor" target="_blank"><img src="https://opencollective.com/nest/sponsors/badge.svg" alt="Sponsors on Open Collective" /></a>
  <a href="https://paypal.me/kamilmysliwiec" target="_blank"><img src="https://img.shields.io/badge/Donate-PayPal-ff3f59.svg" alt="Donate us"/></a>
    <a href="https://opencollective.com/nest#sponsor"  target="_blank"><img src="https://img.shields.io/badge/Support%20us-Open%20Collective-41B883.svg" alt="Support us"></a>
  <a href="https://twitter.com/nestframework" target="_blank"><img src="https://img.shields.io/twitter/follow/nestframework.svg?style=social&label=Follow" alt="Follow us on Twitter"></a>
</p>
  <!--[![Backers on Open Collective](https://opencollective.com/nest/backers/badge.svg)](https://opencollective.com/nest#backer)
  [![Sponsors on Open Collective](https://opencollective.com/nest/sponsors/badge.svg)](https://opencollective.com/nest#sponsor)-->

## Description

[Nest](https://github.com/nestjs/nest) framework TypeScript starter repository.

## Project setup

```bash
$ npm install
```

## Compile and run the project

```bash
# development
$ npm run start

# watch mode
$ npm run start:dev

# production mode
$ npm run start:prod
```

## Run tests

```bash
# unit tests
$ npm run test

# e2e tests
$ npm run test:e2e

# test coverage
$ npm run test:cov
```

## Deployment

When you're ready to deploy your NestJS application to production, there are some key steps you can take to ensure it runs as efficiently as possible. Check out the [deployment documentation](https://docs.nestjs.com/deployment) for more information.

If you are looking for a cloud-based platform to deploy your NestJS application, check out [Mau](https://mau.nestjs.com), our official platform for deploying NestJS applications on AWS. Mau makes deployment straightforward and fast, requiring just a few simple steps:

```bash
$ npm install -g mau
$ mau deploy
```

With Mau, you can deploy your application in just a few clicks, allowing you to focus on building features rather than managing infrastructure.

## Resources

Check out a few resources that may come in handy when working with NestJS:

- Visit the [NestJS Documentation](https://docs.nestjs.com) to learn more about the framework.
- For questions and support, please visit our [Discord channel](https://discord.gg/G7Qnnhy).
- To dive deeper and get more hands-on experience, check out our official video [courses](https://courses.nestjs.com/).
- Deploy your application to AWS with the help of [NestJS Mau](https://mau.nestjs.com) in just a few clicks.
- Visualize your application graph and interact with the NestJS application in real-time using [NestJS Devtools](https://devtools.nestjs.com).
- Need help with your project (part-time to full-time)? Check out our official [enterprise support](https://enterprise.nestjs.com).
- To stay in the loop and get updates, follow us on [X](https://x.com/nestframework) and [LinkedIn](https://linkedin.com/company/nestjs).
- Looking for a job, or have a job to offer? Check out our official [Jobs board](https://jobs.nestjs.com).

## Support

Nest is an MIT-licensed open source project. It can grow thanks to the sponsors and support by the amazing backers. If you'd like to join them, please [read more here](https://docs.nestjs.com/support).

## Stay in touch

- Author - [Kamil Myśliwiec](https://twitter.com/kammysliwiec)
- Website - [https://nestjs.com](https://nestjs.com/)
- Twitter - [@nestframework](https://twitter.com/nestframework)

## License

Nest is [MIT licensed](https://github.com/nestjs/nest/blob/master/LICENSE).
