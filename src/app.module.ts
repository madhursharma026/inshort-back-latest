import { join } from 'path';
import { Module } from '@nestjs/common';
import { ApolloDriver } from '@nestjs/apollo';
import { GraphQLModule } from '@nestjs/graphql';
import { TypeOrmModule } from '@nestjs/typeorm';
import { NewsModule } from './news/news.module';
import { AuthModule } from './auth/auth.module';
import { News } from './news/entities/news.entity';
import { UsersModule } from './users/users.module';
import { User } from './users/entities/user.entity';
import { ReportsModule } from './reports/reports.module';
import { Report } from './reports/entities/report.entity';
import { ArticlesModule } from './articles/articles.module';
import { Article } from './articles/entities/article.entity';

@Module({
  imports: [
    GraphQLModule.forRoot({
      driver: ApolloDriver,
      playground: true,
      autoSchemaFile: join(process.cwd(), 'src/schema.gql'),
      sortSchema: true,
    }),
    TypeOrmModule.forRoot({
      type: 'mysql',
      host: '5.39.222.209',
      port: 3306,
      username: 'mdr_Inshortdb',
      password: 't5uP4KLcBgt1rdvz',
      database: 'mdr_Inshortdb',
      entities: [News, User, Report, Article],
      synchronize: true,
    }),
    NewsModule,
    UsersModule,
    AuthModule,
    ReportsModule,
    ArticlesModule,
  ],
})
export class AppModule {}
