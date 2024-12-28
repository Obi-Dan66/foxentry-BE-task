import { Test, TestingModule } from '@nestjs/testing';
import { INestApplication } from '@nestjs/common';
import * as request from 'supertest';
import { AppModule } from './../src/app.module';
import { TypeOrmModule } from '@nestjs/typeorm';
import { testDatabaseConfig } from './config/test-database.config';

describe('Products (e2e)', () => {
  let app: INestApplication;
  let createdProductId: number;
  let moduleFixture: TestingModule;

  beforeAll(async () => {
    moduleFixture = await Test.createTestingModule({
      imports: [TypeOrmModule.forRoot(testDatabaseConfig), AppModule],
    }).compile();

    app = moduleFixture.createNestApplication();
    await app.init();
  });

  it('should create a product (POST /products)', () => {
    return request(app.getHttpServer())
      .post('/products')
      .send({
        name: 'Test Product',
        price: 9.99,
        stockQuantity: 100,
      })
      .expect(201)
      .expect((res) => {
        expect(res.body).toHaveProperty('id');
        expect(res.body.name).toBe('Test Product');
        createdProductId = res.body.id;
      });
  });

  it('should get all products (GET /products)', () => {
    return request(app.getHttpServer())
      .get('/products')
      .expect(200)
      .expect((res) => {
        expect(Array.isArray(res.body)).toBe(true);
        expect(res.body.length).toBeGreaterThan(0);
      });
  });

  it('should get product by id (GET /products/:id)', () => {
    return request(app.getHttpServer())
      .get(`/products/${createdProductId}`)
      .expect(200)
      .expect((res) => {
        expect(res.body.id).toBe(createdProductId);
        expect(res.body.name).toBe('Test Product');
      });
  });

  it('should update product price and create price history (PATCH /products/:id)', () => {
    return request(app.getHttpServer())
      .patch(`/products/${createdProductId}`)
      .send({ price: 19.99 })
      .expect(200)
      .expect((res) => {
        expect(res.body.price).toBe(19.99);
      });
  });

  it('should get price history (GET /products/:id/price-history)', () => {
    return request(app.getHttpServer())
      .get(`/products/${createdProductId}/price-history`)
      .expect(200)
      .expect((res) => {
        expect(Array.isArray(res.body)).toBe(true);
        expect(res.body.length).toBeGreaterThan(0);
        expect(Number(res.body[0].oldPrice)).toBe(9.99);
        expect(Number(res.body[0].newPrice)).toBe(19.99);
      });
  });

  it('should deactivate product (DELETE /products/:id)', () => {
    return request(app.getHttpServer())
      .delete(`/products/${createdProductId}`)
      .expect(200)
      .expect((res) => {
        expect(res.body.isActive).toBe(false);
      });
  });

  afterAll(async () => {
    if (app) {
      await app.close();
    }
    if (moduleFixture) {
      await moduleFixture.close();
    }
  });
});
