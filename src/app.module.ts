import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { GraphQLModule } from '@nestjs/graphql';
import { ApolloDriver, ApolloDriverConfig } from '@nestjs/apollo';
import { typeORMConfig } from './config/typeorm.config';
import { UserModule } from './user/user.module';
import { AuthModule } from './auth/auth.module';
import { LectureModule } from './lecture/lecture.module';

@Module({
  imports: [
    TypeOrmModule.forRoot(typeORMConfig),
    GraphQLModule.forRoot<ApolloDriverConfig>({
      playground: process.env.NODE_ENV !== 'prod',
      driver: ApolloDriver,
      autoSchemaFile: 'schema.gpl',
      context: ({ req, connection }) => {
        if (req) {
          const user = req.headers.authorization;
          return { ...req, user };
        } else {
          return connection;
        }
      },
    }),
    UserModule,
    AuthModule,
    LectureModule,
  ],
  controllers: [],
  providers: [],
})
export class AppModule {}
