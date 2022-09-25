import { Resolver, Query, Mutation, Args, Int } from '@nestjs/graphql';
import { ProductService } from './product.service';
import { Product } from './entities/product.entity';
import { CreateProductInput } from './dto/create-product.input';
import { UpdateProductInput } from './dto/update-product.input';

@Resolver(() => Product)
export class ProductResolver {
  constructor(private readonly productService: ProductService) {}

  @Mutation(() => Product)
  async createProduct(@Args('createProductInput') createProductInput: CreateProductInput) {
    return await this.productService.create(createProductInput);
  }

  @Query(() => [Product], { name: 'products' })
  async findAll() {
    return await this.productService.findAll();
  }

  @Query(() => Product, { name: 'product' })
  async findOne(@Args('id', { type: () => String }) id: string) {
    return await this.productService.findOne(id);
  }

  @Mutation(() => Product)
  async updateProduct(@Args('updateProductInput') updateProductInput: UpdateProductInput) {
    return await this.productService.update(updateProductInput.id, updateProductInput);
  }

  @Mutation(() => Product)
  async removeProduct(@Args('id', { type: () => String }) id: string) {
    return await this.productService.remove(id);
  }
}
