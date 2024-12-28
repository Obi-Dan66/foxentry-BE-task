import { IsOptional, IsNumber, Min, IsString } from 'class-validator';
import { Type } from 'class-transformer';
import { ApiProperty } from '@nestjs/swagger';

export class QueryProductDto {
  @ApiProperty({
    required: false,
    description: 'Search products by name (case insensitive)',
    example: 'berries',
  })
  @IsOptional()
  @IsString()
  name?: string;

  @ApiProperty({
    required: false,
    description: 'Minimum stock quantity',
    example: 10,
    minimum: 0,
  })
  @IsOptional()
  @Type(() => Number)
  @IsNumber()
  @Min(0)
  minStock?: number;

  @ApiProperty({ required: false, description: 'Maximum stock quantity' })
  @IsOptional()
  @Type(() => Number)
  @IsNumber()
  @Min(0)
  maxStock?: number;

  @ApiProperty({
    required: false,
    default: true,
    description: 'Include inactive products',
  })
  @IsOptional()
  @Type(() => Boolean)
  includeInactive?: boolean;
}
