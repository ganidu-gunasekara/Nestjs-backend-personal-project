import { Type } from 'class-transformer';
import {
  IsString,
  IsNumber,
  IsArray,
  ArrayNotEmpty,
  IsDefined,
  IsNotEmpty,
  IsOptional,
  IsIn,
} from 'class-validator';

export class CreateProductDto {
  @IsDefined({ message: 'Product name is required' })
  @IsString({ message: 'Product name must be a string' })
  @IsNotEmpty({ message: 'Product name cannot be empty' })
  name: string;

  @IsDefined({ message: 'Description is required' })
  @IsString({ message: 'Description must be a string' })
  @IsNotEmpty({ message: 'Description cannot be empty' })
  description: string;

  @IsDefined({ message: 'Category is required' })
  @IsString({ message: 'Category must be a string' })
  @IsIn(['men', 'women', 'unisex'], { message: 'Category must be one of: men, women, unisex' })
  category: string;

  @IsDefined({ message: 'Product number is required' })
  @IsString({ message: 'Product number must be a string' })
  @IsNotEmpty({ message: 'Product number cannot be empty' })
  productNo: string;

  @IsDefined({ message: 'Fit type is required' })
  @IsString({ message: 'Fit type must be a string' })
  @IsNotEmpty({ message: 'Fit type cannot be empty' })
  fit: string;

  @IsDefined({ message: 'Composition is required' })
  @IsString({ message: 'Composition must be a string' })
  @IsNotEmpty({ message: 'Composition cannot be empty' })
  composition: string;

  @IsDefined({ message: 'Price is required' })
  @IsNumber({}, { message: 'Price must be a number' })
  @Type(() => Number)
  price: number;

  @IsNumber({}, { message: 'Discount price must be a number' })
  @Type(() => Number)
  @IsOptional()
  discountPrice?: number;

  @IsDefined({ message: 'At least one color is required' })
  @IsArray({ message: 'Colors must be an array of strings' })
  @ArrayNotEmpty({ message: 'Colors array must not be empty' })
  @IsString({ each: true, message: 'Each color must be a string' })
  colors: string[];

  @IsDefined({ message: 'At least one size is required' })
  @IsArray({ message: 'Sizes must be an array of strings' })
  @ArrayNotEmpty({ message: 'Sizes array must not be empty' })
  @IsString({ each: true, message: 'Each size must be a string' })
  sizes: string[];

  @IsDefined({ message: 'Status is required' })
  @IsString({ message: 'Status must be a string' })
  @IsNotEmpty({ message: 'Status cannot be empty' })
  @IsIn(['active', 'inactive'], { message: 'Status must be either "active" or "inactive"' })
  status: string;
}
