import { Module } from '@nestjs/common';
import { ProductsController } from './products.controller';
import { ProductService } from './products.service';
import { ProductRepository } from './products.repository';

@Module({
  controllers: [ProductsController],
  providers: [ProductService, ProductRepository],
})
export class ProductsModule {}
