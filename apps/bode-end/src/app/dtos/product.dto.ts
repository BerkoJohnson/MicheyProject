import { IsString, IsOptional, IsNumber, IsBase64 } from 'class-validator';

export class ProductDto {
  @IsString()
  title: string;
  
  @IsString()
  category: string;

  @IsNumber()
  qty: number;

  @IsNumber()
  price: number;
}


export class UpdateProductDto {
  @IsString()
  @IsOptional()
  title: string;
  
  @IsString()
  @IsOptional()
  category: string;

  @IsNumber()
  @IsOptional()
  qty: number;

  @IsNumber()
  @IsOptional()
  price: number;
}

export class changeProductImageDto {
  @IsBase64()
  image: Buffer;
}

