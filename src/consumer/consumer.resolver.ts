import { Resolver, Query, Mutation, Args, Int } from '@nestjs/graphql';
import { ConsumerService } from './consumer.service';
import { Consumer } from './entities/consumer.entity';
import { CreateConsumerInput } from './dto/create-consumer.input';
import { UpdateConsumerInput } from './dto/update-consumer.input';

@Resolver(() => Consumer)
export class ConsumerResolver {
  constructor(private readonly consumerService: ConsumerService) {}

  @Mutation(() => Consumer)
  async createConsumer(@Args('createConsumerInput') createConsumerInput: CreateConsumerInput) {
    return await this.consumerService.create(createConsumerInput);
  }

  @Query(() => [Consumer], { name: 'consumers' })
  async findAll() {
    return await this.consumerService.findAll();
  }

  @Query(() => Consumer, { name: 'consumer' })
  async findOne(@Args('id', { type: () => String }) id: string) {
    return await this.consumerService.findOne(id);
  }

  @Mutation(() => Consumer)
  async updateConsumer(@Args('updateConsumerInput') updateConsumerInput: UpdateConsumerInput) {
    return await this.consumerService.update(updateConsumerInput.id, updateConsumerInput);
  }

  @Mutation(() => Consumer)
  async removeConsumer(@Args('id', { type: () => String }) id: string) {
    return await this.consumerService.remove(id);
  }
}
