import { Injectable } from '@nestjs/common';
import { CreateProductDto } from './dto/create-product.dto';
import { UpdateProductDto } from './dto/update-product.dto';
import { PrismaService } from 'src/prisma/prisma.service';
import { Prisma } from 'generated/prisma';

@Injectable()
export class ProductRepository {
  constructor(private readonly prisma: PrismaService) { }

  create(data: Prisma.ProductCreateInput) {
    return this.prisma.product.create({ data });
  }

  findAll() {
    return this.prisma.product.findMany();
  }

  async findOneByProductNo(productNo: string) {
    return this.prisma.product.findUnique({
      where: { productNo },
    });
  }
  async findBySlug(slug: string) {
    return this.prisma.product.findUnique({ where: { slug } });
  }

  async updateBySlug(slug: string, data: any) {
    return this.prisma.product.update({
      where: { slug },
      data,
    });
  }

  findById(id: string) {
    return this.prisma.product.findUnique({ where: { id } });
  }

  update(id: string, data: UpdateProductDto) {
    return this.prisma.product.update({ where: { id }, data });
  }

  delete(id: string) {
    return this.prisma.product.delete({ where: { id } });
  }
}
