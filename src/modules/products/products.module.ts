import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Product } from './entities/product.entity';
import { PriceHistory } from '../price-history/entities/price-history.entity';
import { ProductsController } from './products.controller';
import { ProductsService } from './products.service';

@Module({
  imports: [TypeOrmModule.forFeature([Product, PriceHistory])],
  controllers: [ProductsController],
  providers: [ProductsService],
})
export class ProductsModule {}
