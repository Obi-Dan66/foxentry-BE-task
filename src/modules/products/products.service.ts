import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Product } from './entities/product.entity';
import { PriceHistory } from '../price-history/entities/price-history.entity';
import { CreateProductDto } from './dto/create-product.dto';
import { UpdateProductDto } from './dto/update-product.dto';
import { QueryProductDto } from './dto/query-product.dto';

@Injectable()
export class ProductsService {
  constructor(
    @InjectRepository(Product)
    private productRepository: Repository<Product>,
    @InjectRepository(PriceHistory)
    private priceHistoryRepository: Repository<PriceHistory>,
  ) {}

  async create(createProductDto: CreateProductDto): Promise<Product> {
    const product = this.productRepository.create(createProductDto);
    return await this.productRepository.save(product);
  }

  async findAll(query: QueryProductDto): Promise<Product[]> {
    const queryBuilder = this.productRepository.createQueryBuilder('product');

    // Search by name (case insensitive)
    if (query.name) {
      queryBuilder.andWhere('LOWER(product.name) LIKE LOWER(:name)', {
        name: `%${query.name}%`,
      });
    }

    // Filter by stock quantity
    if (query.minStock !== undefined) {
      queryBuilder.andWhere('product.stockQuantity >= :minStock', {
        minStock: query.minStock,
      });
    }

    if (query.maxStock !== undefined) {
      queryBuilder.andWhere('product.stockQuantity <= :maxStock', {
        maxStock: query.maxStock,
      });
    }

    // Filter active/inactive products
    if (!query.includeInactive) {
      queryBuilder.andWhere('product.isActive = :isActive', { isActive: true });
    }

    // Order by name
    queryBuilder.orderBy('product.name', 'ASC');

    return await queryBuilder.getMany();
  }

  async findOne(id: number): Promise<Product> {
    const product = await this.productRepository.findOne({
      where: { id },
      relations: ['priceHistory'],
    });
    if (!product) {
      throw new NotFoundException(`Product with ID ${id} not found`);
    }
    return product;
  }

  async update(
    id: number,
    updateProductDto: UpdateProductDto,
  ): Promise<Product> {
    const product = await this.findOne(id);

    console.log('Current product:', product);
    console.log('Update DTO:', updateProductDto);

    if (updateProductDto.price && updateProductDto.price !== product.price) {
      console.log('Creating price history record');
      console.log('Old price:', product.price);
      console.log('New price:', updateProductDto.price);

      // First update the product
      Object.assign(product, updateProductDto);
      const updatedProduct = await this.productRepository.save(product);

      // Then create price history with the updated product
      const priceHistory = this.priceHistoryRepository.create({
        productId: updatedProduct.id,
        product: updatedProduct,
        oldPrice: product.price,
        newPrice: updateProductDto.price,
      });
      await this.priceHistoryRepository.save(priceHistory);

      return updatedProduct;
    }

    // If no price change, just update the product
    Object.assign(product, updateProductDto);
    return await this.productRepository.save(product);
  }

  async remove(id: number): Promise<Product> {
    const product = await this.findOne(id);
    product.isActive = false;
    return await this.productRepository.save(product);
  }

  async getPriceHistory(id: number): Promise<PriceHistory[]> {
    console.log('Getting price history for product:', id);

    await this.findOne(id);

    const history = await this.priceHistoryRepository.find({
      where: { productId: id },
      order: { changedAt: 'DESC' },
      relations: ['product'],
    });

    console.log('Found history:', history);
    return history;
  }
}
