import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  Query,
} from '@nestjs/common';
import { ProductsService } from './products.service';
import { CreateProductDto } from './DTO/create-product.dto';
import { UpdateProductDto } from './DTO/update-product.dto';
import { QueryProductDto } from './DTO/query-product.dto';
import { ApiTags, ApiOperation, ApiResponse } from '@nestjs/swagger';

@ApiTags('Products')
@Controller('products')
export class ProductsController {
  constructor(private readonly productsService: ProductsService) {}

  @Post()
  @ApiOperation({ summary: 'Create a new product' })
  @ApiResponse({
    status: 201,
    description: 'Product has been successfully created.',
    schema: {
      example: {
        id: 1,
        name: 'Fresh Berries',
        price: 3.99,
        stockQuantity: 100,
        isActive: true,
        createdAt: '2024-12-28T14:18:29.914Z',
        updatedAt: '2024-12-28T14:18:29.914Z',
      },
    },
  })
  @ApiResponse({ status: 400, description: 'Bad Request.' })
  create(@Body() createProductDto: CreateProductDto) {
    return this.productsService.create(createProductDto);
  }

  @Get()
  @ApiOperation({ summary: 'Get all products' })
  @ApiResponse({
    status: 200,
    description: 'Returns all products based on query parameters.',
  })
  findAll(@Query() query: QueryProductDto) {
    return this.productsService.findAll(query);
  }

  @Get(':id')
  @ApiOperation({ summary: 'Get a product by id' })
  @ApiResponse({ status: 200, description: 'Returns the product.' })
  @ApiResponse({ status: 404, description: 'Product not found.' })
  findOne(@Param('id') id: string) {
    return this.productsService.findOne(+id);
  }

  @Patch(':id')
  @ApiOperation({ summary: 'Update a product' })
  @ApiResponse({
    status: 200,
    description: 'Product has been successfully updated.',
  })
  @ApiResponse({ status: 404, description: 'Product not found.' })
  update(@Param('id') id: string, @Body() updateProductDto: UpdateProductDto) {
    return this.productsService.update(+id, updateProductDto);
  }

  @Delete(':id')
  @ApiOperation({ summary: 'Deactivate a product' })
  @ApiResponse({
    status: 200,
    description: 'Product has been successfully deactivated.',
  })
  @ApiResponse({ status: 404, description: 'Product not found.' })
  remove(@Param('id') id: string) {
    return this.productsService.remove(+id);
  }

  @Get(':id/price-history')
  @ApiOperation({
    summary: 'Get price history for a product',
    description:
      'Retrieves the complete price change history for a specific product',
  })
  @ApiResponse({
    status: 200,
    description: 'Returns the price history of the product.',
    schema: {
      example: [
        {
          id: 1,
          productId: 1,
          oldPrice: 3.99,
          newPrice: 4.99,
          changedAt: '2024-12-28T14:18:37.584Z',
        },
      ],
    },
  })
  @ApiResponse({ status: 404, description: 'Product not found.' })
  getPriceHistory(@Param('id') id: string) {
    return this.productsService.getPriceHistory(+id);
  }
}
