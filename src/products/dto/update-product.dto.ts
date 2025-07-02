import { PartialType } from '@nestjs/mapped-types';
import { CreateProductDto } from './create-product.dto';
import { IsArray, IsOptional, IsString } from 'class-validator';

export class UpdateProductDto extends PartialType(CreateProductDto) {
    @IsOptional()
    @IsArray({ message: 'keepImageUrls must be an array of strings' })
    @IsString({ each: true, message: 'Each keepImageUrl must be a string' })
    keepImageUrls?: string[];
}
