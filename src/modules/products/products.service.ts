import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository, Like, Between } from 'typeorm';
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
    const where: any = {};

    if (query.name) {
      where.name = Like(`%${query.name}%`);
    }

    if (query.minStock !== undefined || query.maxStock !== undefined) {
      where.stockQuantity = Between(
        query.minStock || 0,
        query.maxStock || Number.MAX_SAFE_INTEGER,
      );
    }

    return await this.productRepository.find({ where });
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

    if (updateProductDto.price && updateProductDto.price !== product.price) {
      const priceHistory = this.priceHistoryRepository.create({
        product,
        oldPrice: product.price,
        newPrice: updateProductDto.price,
      });
      await this.priceHistoryRepository.save(priceHistory);
    }

    Object.assign(product, updateProductDto);
    return await this.productRepository.save(product);
  }

  async remove(id: number): Promise<void> {
    const product = await this.findOne(id);
    product.isActive = false;
    await this.productRepository.save(product);
  }

  async getPriceHistory(id: number): Promise<PriceHistory[]> {
    await this.findOne(id);

    return await this.priceHistoryRepository.find({
      where: { product: { id } },
      order: { changedAt: 'DESC' },
    });
  }
}
