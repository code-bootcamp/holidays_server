import { ApolloDriver, ApolloDriverConfig } from '@nestjs/apollo';
import { CacheModule, Module } from '@nestjs/common';
import { GraphQLModule } from '@nestjs/graphql';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ConfigModule } from '@nestjs/config';

import * as redisStore from 'cache-manager-redis-store';
import { UsersModule } from './apis/users/users.module';
import { BoardsModule } from './apis/boards/boards.module';
import { ClassesModule } from './apis/classes/classes.module';
import { ClassReviewsModule } from './apis/class_reviews/class_reviews.module';
import { ClassAdsModule } from './apis/class_ads/class_ads.module';
import { ClassSchedulesModule } from './apis/class_schedules/class_schedules.module';
import { FilesModule } from './apis/files/files.module';
import { ReservationsModule } from './apis/reservations/reservations.module';
import { WishlistsModule } from './apis/wishlists/wishLists.module';

@Module({
  imports: [
    UsersModule,
    BoardsModule,
    ClassesModule,
    ClassReviewsModule,
    ClassAdsModule,
    ClassReviewsModule,
    ClassSchedulesModule,
    FilesModule,
    ReservationsModule,
    WishlistsModule,
    ConfigModule.forRoot(),
    GraphQLModule.forRoot<ApolloDriverConfig>({
      driver: ApolloDriver,
      autoSchemaFile: 'src/commons/graphql/schema.gql',
      context: ({ req, res }) => ({ req, res }),
    }),
    //forRoot 모든 api 전체 적용시켜줘
    TypeOrmModule.forRoot({
      type:
        process.env.DATABASE_TYPE === 'mysql'
          ? process.env.DATABASE_TYPE
          : 'postgres',
      host: process.env.DATABASE_HOST,
      port: Number(process.env.DATABASE_PORT),
      username: process.env.DATABASE_USERNAME,
      password: process.env.DATABASE_PASSWORD,
      database: process.env.DATABASE_DATABASE,
      entities: [__dirname + '/apis/**/*.entity.*'],
      synchronize: true,
      logging: true,
    }),
    CacheModule.register({
      store: redisStore,
      url: 'redis://holidays-redis:6379',
      isGlobal: true,
    }),
  ],
})
export class AppModule {}
