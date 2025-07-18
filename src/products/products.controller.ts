import {
  Controller,
  Get,
  Post,
  Patch,
  Delete,
  Body,
  Param,
  ParseIntPipe,
  UseInterceptors,
  UploadedFile,
  UploadedFiles,
  BadRequestException,
  Query,
} from '@nestjs/common';
import { ProductService } from './products.service';
import { CreateProductDto } from './dto/create-product.dto';
import { UpdateProductDto } from './dto/update-product.dto';
import { AnyFilesInterceptor, FileInterceptor, FilesInterceptor } from '@nestjs/platform-express';
import { FilterProductsDto } from './dto/filter-products.dto';
import { Express } from 'express';


@Controller('products')
export class ProductsController {
  constructor(private readonly productservice: ProductService) { }



  @Post()
  @UseInterceptors(AnyFilesInterceptor())
  create(
    @UploadedFiles() files: Express.Multer.File[],
    @Body() dto: CreateProductDto
  ) {
    const mainImage = files.find((file) => file.fieldname === 'mainImage');
    const images = files.filter((file) => file.fieldname === 'images');

    if (!mainImage) {
      throw new BadRequestException('Main image is required');
    }
    if (!images || images.length === 0) {
      throw new BadRequestException('At least one additional image is required');
    }

    if (images.length + 1 !== 5) {
      throw new BadRequestException('A total of 5 images must be selected');
    }
    return this.productservice.create(dto, mainImage, images);
  }



  @Get()
  findAll(@Query() query: FilterProductsDto) {
    return this.productservice.findAll(query);
  }

  @Get('id/:id')
  findOne(@Param('id') id: string) {
    return this.productservice.findOne(id);
  }

  @Get(':slug')
  findBySlug(@Param('slug') slug: string) {
    return this.productservice.findBySlug(slug);
  }

  @Patch(':slug')
  @UseInterceptors(AnyFilesInterceptor())
  async update(
    @Param('slug') slug: string,
    @UploadedFiles() files: Express.Multer.File[],
    @Body() dto: UpdateProductDto
  ) {
    const mainImage = files?.find((file) => file.fieldname === 'mainImage');
    const images = files?.filter((file) => file.fieldname === 'images');


    return this.productservice.updateBySlug(slug, dto, mainImage, images);
  }


  @Delete(':id')
  remove(@Param('id', ParseIntPipe) id: string) {
    return this.productservice.remove(id);
  }
}
