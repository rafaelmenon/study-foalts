import {
  ApiOperationId, ApiUseTag, Context, Delete, Get, HttpResponseCreated,
  HttpResponseNoContent, HttpResponseNotFound, HttpResponseOK, Patch, Post,
  ValidateBody, ValidatePathParam
} from '@foal/core';
import { getRepository } from 'typeorm';
import { JWTRequired } from '@foal/jwt';
import { Product } from '../entities';

const productSchema = {
  additionalProperties: false,
  properties: {
    name: { type: 'string', maxLength: 70, nullable: false },
    price: { type: 'string', maxLength: 10, nullable: false },
  },
  required: [ 'name', 'price' ],
  type: 'object',
};

@JWTRequired()
@ApiUseTag('product')
export class ProductController {

  @Get()
  @ApiOperationId('findProducts')
  async findProducts() {
    const products = await getRepository(Product).find({ order: { createdAt: "ASC" } });
    return new HttpResponseOK(products);
  }

  @Get('/:productId')
  @ApiOperationId('findByIdProducts')
  @ValidatePathParam('productId', { type: 'string' })
  async findProductttById(ctx: Context) {
    const productById = await getRepository(Product).findOne(ctx.request.params.productId);

    if (!productById) {
      return new HttpResponseNotFound('Produto não encontrado');
    }

    return new HttpResponseOK(productById);
  }

  @Post()
  @ApiOperationId('createProduct')
  @ValidateBody(productSchema)
  async createProducttt(ctx: Context) {
    const product = await getRepository(Product).save(ctx.request.body);
    return new HttpResponseCreated(product);
  }

  @Patch('/:productId')
  @ApiOperationId('modifyProduct')
  @ValidatePathParam('productId', { type: 'string' })
  @ValidateBody({ ...productSchema, required: ['updatedAt'] })
  async modifyProducttt(ctx: Context) {
    const product = await getRepository(Product).findOne(ctx.request.params.productId);
    
    if (!product) {
      return new HttpResponseNotFound('Produto não encontrado!');
    }

    Object.assign(product, ctx.request.body);

    await getRepository(Product).save(product);

    return new HttpResponseOK(product);
  }

  @Delete('/:productId')
  @ApiOperationId('deleteProduct')
  @ValidatePathParam('productId', { type: 'string' })
  async deleteProducttt(ctx: Context) {
    const producttt = await getRepository(Product).findOne(ctx.request.params.productId);

    if (!producttt) {
      return new HttpResponseNotFound('Produto não encontrado');
    }

    await getRepository(Product).delete(ctx.request.params.productId);

    return new HttpResponseNoContent();
  }
}
