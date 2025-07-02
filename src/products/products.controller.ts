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
} from '@nestjs/common';
import { ProductService } from './products.service';
import { CreateProductDto } from './dto/create-product.dto';
import { UpdateProductDto } from './dto/update-product.dto';
import { AnyFilesInterceptor, FileInterceptor, FilesInterceptor } from '@nestjs/platform-express';


@Controller('products')
export class ProductsController {
  constructor(private readonly service: ProductService) { }



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

    return this.service.create(dto, mainImage, images);
  }



  @Get()
  findAll() {
    return this.service.findAll();
  }

  @Get(':id')
  findOne(@Param('id', ParseIntPipe) id: string) {
    return this.service.findOne(id);
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

    
    return this.service.updateBySlug(slug, dto, mainImage, images);
  }


  @Delete(':id')
  remove(@Param('id', ParseIntPipe) id: string) {
    return this.service.remove(id);
  }
}
