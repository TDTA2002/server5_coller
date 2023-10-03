import { PartialType } from '@nestjs/mapped-types';
import { CreateProductDto } from './create-product.dto';
import { ApiProperty } from '@nestjs/swagger';
import { Allow } from 'class-validator';

export class UpdateProductDto extends PartialType(CreateProductDto) {
    @ApiProperty()
    @Allow()
    id: string

    @ApiProperty()
    @Allow()
    name: string

    @ApiProperty()
    @Allow()
    des: string

    @ApiProperty()
    @Allow()
    categoryId: string;

}
