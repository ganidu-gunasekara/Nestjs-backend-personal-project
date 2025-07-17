import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { PrismaModule } from './prisma/prisma.module';
import { ProductsModule } from './products/products.module';
import { ConfigModule } from '@nestjs/config';
import { ServeStaticModule } from '@nestjs/serve-static';
import { join } from 'path';

@Module({
  imports: [
    ConfigModule.forRoot({
      envFilePath: process.env.NODE_ENV === 'production' ? '.env.production' : '.env',
      isGlobal: true, // makes ConfigService available app-wide
    }),
    PrismaModule, 
    ProductsModule,
    ServeStaticModule.forRoot({
      rootPath: join(__dirname, '..', 'uploads'),// path to your upload directory
      serveRoot: '/uploads', // route under which files are served
    }),
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
