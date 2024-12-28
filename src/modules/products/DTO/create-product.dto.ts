import { IsString, IsNumber, Min } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

export class CreateProductDto {
  @ApiProperty({
    description: 'The name of the product',
    example: 'Fresh Berries',
    minLength: 2,
  })
  @IsString()
  name: string;

  @ApiProperty({
    description: 'The price of the product',
    example: 3.99,
    minimum: 0,
    format: 'decimal',
  })
  @IsNumber()
  @Min(0)
  price: number;

  @ApiProperty({
    description: 'The quantity available in stock',
    example: 100,
    minimum: 0,
  })
  @IsNumber()
  @Min(0)
  stockQuantity: number;
}
