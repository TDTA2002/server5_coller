import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { CreateProductDto } from './dto/create-product.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Product } from './entities/product.entity';
import { ILike, Repository } from 'typeorm';

import { PaginationDto } from './dto/pagination.dto';
import { UpdateProductDto } from './dto/update-product.dto';



@Injectable()
export class ProductsService {
  constructor(
    @InjectRepository(Product)
    private readonly product: Repository<Product>,

  ) { }
  async create(createProductDto: CreateProductDto) {
    try {
      console.log("createProductDto", createProductDto);

      let newProduct = await this.product.save(createProductDto);
      if (!newProduct) {
        return [false, "lỗi", null]
      }
      let newProductDetail = await this.product.findOne({
        where: {
          id: newProduct.id
        },
        relations: {
          options: {
            pictures: true
          }
        }
      })

      if (!newProductDetail) {
        return [false, "lỗi", null]
      }
      return [true, "Create ok", newProductDetail]
    } catch (err) {
      return [false, "lỗi model", null]
    }
  }
  async update(id: string, updateProductDto: any) {
    try {

      const productToUpdate = await this.product.findOne({
        where: {
          id
        }
      },);
      console.log("productToUpdate", productToUpdate);

      if (!productToUpdate) {
        return [false, "Sản phẩm không tồn tại", null];
      }
      Object.assign(productToUpdate, updateProductDto);

      // Lưu sản phẩm đã cập nhật
      const updatedProduct = await this.product.save(productToUpdate);

      if (!updatedProduct) {
        return [false, "Lỗi khi cập nhật sản phẩm", null];
      }

      return [true, "Cập nhật thành công", updatedProduct];
    } catch (err) {
      return [false, "Lỗi khi cập nhật sản phẩm", null];
    }
  }


  async findAll(pagination: PaginationDto) {
    try {
      let product = await this.product.find({
        skip: pagination.skip,
        take: pagination.take,
        relations: {
          options: {
            pictures: true
          }
        }
      }
      );
      return {
        message: "Get Product OK!",
        data: product,
        status: true
      }
    } catch (err) {
      return {
        message: "Lỗi Modal",
        data: null,
        status: false
      }
    }
  }

  async findOne(id: string) {
    try {
      let product = await this.product.findOne({
        where: {
          id: id,
          options: {
            status: true
          }
        },
        order: {

        },
        relations: {
          options: {
            pictures: true
          }
        }
      })
      return {
        status: true,
        message: "get product successfully",
        data: product
      }
    } catch (err) {
      return {
        status: false,
        data: null
      }
    }
  }

  async find() {
    try {
      let productList = await this.product.find({
        relations: {
          options: {
            pictures: true
          }
        }
      });
      if (!productList) {
        return [false, "lỗi", null]
      }
      return [true, "Get products ok", productList]
    } catch (err) {
      return [false, "lỗi model", null]
    }
  }
  async searchByName(name: string) {
    try {
      let categories = await this.product.find({
        where: {
          name: ILike(`%${name}%`),
        },
        relations: {
          options: {
            pictures: true
          }
        }
      }
      );
      return {
        data: categories,
        message: "Get products successfully"
      }
    } catch (err) {
      throw new HttpException('Loi Model', HttpStatus.BAD_REQUEST);
    }
  }
  async findByCategory(categoryId: string) {
    try {
      console.log("categoryId");

      let data = await this.product.findOne({
        where: {
          categoryId: categoryId
        },
        relations: {
          options: {
            pictures: true
          }
        }
      });

      return {
        data: data,
        message: "Get odw1k!",
        status: true
      };

    } catch (err) {
      return {
        data: null,
        message: "Lỗi model",
        status: false
      };
    }
  }


  remove(id: number) {
    return `This action removes a #${id} product`;
  }
}
