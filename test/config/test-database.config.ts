import { TypeOrmModuleOptions } from '@nestjs/typeorm';
import { Product } from '../../src/modules/products/entities/product.entity';
import { PriceHistory } from '../../src/modules/products/entities/price-history.entity';

export const testDatabaseConfig: TypeOrmModuleOptions = {
  type: 'postgres',
  host: 'localhost',
  port: 5432,
  username: 'postgres',
  password: 'apupu',
  database: 'fox_shop_test',
  entities: [Product, PriceHistory],
  synchronize: true,
  dropSchema: true,
};
