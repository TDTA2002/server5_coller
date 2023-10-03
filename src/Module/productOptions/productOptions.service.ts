import { Injectable } from '@nestjs/common';

import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { CreateProductOptionDto } from './dto/productOptions.dto';
import { ProductOption } from './entities/productOptions.entity';
import { UpdateProductOptionDto } from './dto/updateproduct.dto';

@Injectable()
export class ProductOptionsService {

    constructor(@InjectRepository(ProductOption) private readonly options: Repository<ProductOption>) { }

    async create(createProductOptionDto: CreateProductOptionDto) {
        try {
            let newOption = await this.options.save(createProductOptionDto);
            if (!newOption) return [false, "Lỗi", null]
            let newOptionDetail = await this.options.findOne({
                where: {
                    id: newOption.id
                },
                relations: {
                    pictures: true
                }
            })
            if (!newOptionDetail) return [false, "Lỗi", null]
            return [true, "Create Ok!", newOptionDetail]
        } catch (err) {
            return [false, "Lỗi model", null]
        }
    }
    async update(id: string, updateProductOptionDto: UpdateProductOptionDto) {
        try {
            let data = await this.options.findOne({
                where: {
                    id
                }
            })


            if (!data) return false
            let newData = this.options.merge(data, updateProductOptionDto)
            let result = this.options.save(newData)
            return {
                status: true,
                message: "Update Product Option Successfully!",
                data: newData
            };
        } catch (err) {
            return {
                status: false,
                message: "lỗi model",
                data: null
            };
        }
    }
}
