import { BadRequestException, Injectable, NotFoundException } from '@nestjs/common';
import { CreateProductDto } from './dto/create-product.dto';
import { UpdateProductDto } from './dto/update-product.dto';
import { ProductRepository } from './products.repository';
import { writeFileSync, existsSync, mkdirSync } from 'fs';
import { join } from 'path';
import { Express } from 'express';
import { ConfigService } from '@nestjs/config';
import { v4 as uuidv4 } from 'uuid';
import slugify from 'slugify';
import { PrismaService } from 'src/prisma/prisma.service';
import { FilterProductsDto } from './dto/filter-products.dto';

@Injectable()
export class ProductService {
  constructor(private readonly repo: ProductRepository, private readonly config: ConfigService, private readonly prisma: PrismaService) { }

  async create(
    dto: CreateProductDto,
    mainImage: Express.Multer.File,
    images: Express.Multer.File[]
  ) {
    const existing = await this.repo.findOneByProductNo(dto.productNo)
    if (existing) {
      throw new BadRequestException('Product number must be unique');
    }

    const slug = await this.generateUniqueSlug(dto.name, this.prisma);

    const mainImageUrl = this.saveAndGetUrl(mainImage);
    const imageUrls = images.map(file => this.saveAndGetUrl(file));
    const productData = {
      ...dto,
      mainImageUrl,
      imageUrls,
      slug
    };

    return this.repo.create(productData);
  }


  async findAll(dto: FilterProductsDto) {
    const items = await this.repo.findMany(dto);
    const total = await this.repo.count({
      category: dto.category,
      sizes: dto.size ? { hasSome: dto.size } : undefined,
    });

    return {
      items,
      meta: {
        total,
        page: dto.page,
        limit: dto.limit,
        totalPages: Math.ceil(total / dto.limit),
      },
    }
  };

  async findOne(id: string) {
    const product = await this.repo.findById(id);
    if (!product) throw new NotFoundException(`Product ${id} not found`);
    return product;
  }

  async findBySlug(slug: string) {
    const product = await this.repo.findBySlug(slug);
    if (!product) throw new NotFoundException(`Product slug ${slug} not found`);
    return product;
  }

  async updateBySlug(
    slug: string,
    dto: UpdateProductDto,
    mainImage?: Express.Multer.File,
    images?: Express.Multer.File[]
  ) {
    const existingProduct = await this.repo.findBySlug(slug);
    if (!existingProduct) {
      throw new NotFoundException('Product not found');
    }

    if (dto.productNo && dto.productNo !== existingProduct.productNo) {
      const existing = await this.repo.findOneByProductNo(dto.productNo);
      if (existing) {
        throw new BadRequestException('Product number must be unique');
      }
    }

    const updatedData: Partial<UpdateProductDto> & { [key: string]: any } = { ...dto };

    if (dto.name && dto.name !== existingProduct.name) {
      updatedData.slug = await this.generateUniqueSlug(dto.name, this.prisma);
    }

    if (mainImage) {
      updatedData.mainImageUrl = this.saveAndGetUrl(mainImage);
    }

    const keptImageUrls = dto.keepImageUrls || [];
    const newImageUrls = images?.map((file) => this.saveAndGetUrl(file)) || [];
    const combinedImageUrls = [...keptImageUrls, ...newImageUrls];

    if (combinedImageUrls.length > 0 && combinedImageUrls.length !== 4) {
      throw new BadRequestException('Exactly 4 images must be provided in total (existing + new).');
    }

    if (combinedImageUrls.length > 0) {
      updatedData.imageUrls = combinedImageUrls;
    }
    delete updatedData.keepImageUrls;
    delete updatedData.keepMainImageUrl
    return this.repo.updateBySlug(slug, updatedData);
  }



  async remove(id: string) {
    await this.findOne(id);
    return this.repo.delete(id);
  }

  saveAndGetUrl(file: Express.Multer.File): string {
    const uploadDir = this.config.get<string>('LOCAL_UPLOAD_PATH') || 'uploads';

    // Ensure uploads directory exists
    const uploadPath = join(__dirname, '..', '..', uploadDir);
    if (!existsSync(uploadPath)) {
      mkdirSync(uploadPath, { recursive: true });
    }

    const timestamp = Date.now();
    const uniqueFilename = `${uuidv4()}-${file.originalname.replace(/\s+/g, '_')}`;

    // Full file path
    const fullPath = join(uploadPath, uniqueFilename);

    // Write file buffer to disk
    writeFileSync(fullPath, file.buffer);

    // Build the public URL
    const baseUrl = this.config.get<string>('APP_URL') || 'http://localhost:4000';
    const fileUrl = `${baseUrl}/${uploadDir}/${uniqueFilename}`;

    return fileUrl;
  }

  async generateUniqueSlug(name: string, prisma: PrismaService): Promise<string> {
    const baseSlug = slugify(name, { lower: true, strict: true });
    let slug = baseSlug;
    let counter = 1;

    while (await prisma.product.findUnique({ where: { slug } })) {
      slug = `${baseSlug}-${counter++}`;
    }

    return slug;
  }
}
