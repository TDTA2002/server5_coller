import { Controller, Get, Post, Body, Patch, Param, Delete, Res } from '@nestjs/common';
import { Response } from 'express';
import { CreateProductOptionDto } from './dto/productOptions.dto';
import { ProductOptionsService } from './productOptions.service';
import { UpdateProductOptionDto } from './dto/updateproduct.dto';

@Controller('product-options')
export class ProductOptionsController {
    constructor(private readonly productOptionsService: ProductOptionsService) { }

    @Post()
    async create(@Body() createProductOptionDto: CreateProductOptionDto, @Res() res: Response) {
        try {
            let [status, message, data] = await this.productOptionsService.create(createProductOptionDto);
            return res.status(status ? 200 : 213).json({
                message,
                data
            })
        } catch (err) {
            return res.status(500).json({
                message: "Controller lỗi!"
            })
        }
    }

    @Patch(':id')
    // @UseInterceptors(FilesInterceptor('product'))
    async update(@Param('id') id: string, @Body() updateProductOptionDto: any, @Res() res: Response) {
        // console.log("|updateProductOptionDto", updateProductOptionDto);
        // let product = JSON.parse(updateProductOptionDto.product);

        // return this.productOptionsService.update(id, product);


        try {
            console.log("updateProductDto", updateProductOptionDto);

            let product = JSON.parse(updateProductOptionDto.product);
            console.log("product", product);

            let serRes = await this.productOptionsService.update(id, product);

            return res.status(res.status ? 200 : 213).json({
                serRes
            })
        } catch (err) {
            console.log("err", err);
            return res.status(500).json({
                message: "Lỗi trong Controller!"
            });
        }
    }


}
