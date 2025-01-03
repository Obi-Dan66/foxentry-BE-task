import { TypeOrmModuleOptions } from '@nestjs/typeorm';
import { Product } from '../../src/modules/products/entities/product.entity';
import { PriceHistory } from '../../src/modules/products/entities/price-history.entity';

export const testDatabaseConfig: TypeOrmModuleOptions = {
  type: 'sqlite',
  database: ':memory:',
  entities: [Product, PriceHistory],
  synchronize: true,
  dropSchema: true,
};
