import { Entity, Column, PrimaryGeneratedColumn, OneToMany } from 'typeorm';
import { PriceHistory } from '../../price-history/entities/price-history.entity';

@Entity()
export class Product {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  name: string;

  @Column('decimal', { precision: 10, scale: 2 })
  price: number;

  @Column()
  stockQuantity: number;

  @Column({ default: true })
  isActive: boolean;

  @OneToMany(() => PriceHistory, (priceHistory) => priceHistory.product)
  priceHistory: PriceHistory[];
}
