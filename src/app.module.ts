import { ApolloDriverConfig, ApolloDriver } from '@nestjs/apollo';
import { Module } from '@nestjs/common';
import { GraphQLModule } from '@nestjs/graphql';
import { MongooseModule } from '@nestjs/mongoose';
import { ApolloServerPluginLandingPageLocalDefault } from 'apollo-server-core';
import { ProductModule } from './product/product.module';
import { ConsumerModule } from './consumer/consumer.module';
import { OrderModule } from './order/order.module';

@Module({
  imports: [
    GraphQLModule.forRoot<ApolloDriverConfig>({
      driver:ApolloDriver,
      autoSchemaFile:true,
      playground: false,
      plugins: [ApolloServerPluginLandingPageLocalDefault()]
    }),
    MongooseModule.forRoot('mongodb://localhost:27017/test-samiul-om'),
    ProductModule,
    ConsumerModule,
    OrderModule
  ],
  controllers: [],
  providers: [],
})
export class AppModule {}
