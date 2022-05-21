import { MiddlewareConsumer, Module, NestModule } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { HellofreshModule } from './hellofresh/hellofresh.module';
import { LoggerMiddleware } from './logger.middleware';
import { PlaceholderModule } from './placeholder/placeholder.module';

const oneDay = 60 * 60 * 24;

@Module({
  imports: [
    ConfigModule.forRoot(),
    // CacheModule.register({
    //   ttl: oneDay,
    //   store: redisStore,
    //   host: process.env.REDIS_URL,
    //   // family: 6,
    //   password: process.env.REDIS_PASS,
    // }),
    HellofreshModule,
    PlaceholderModule,
  ],
  controllers: [AppController],
  providers: [
    AppService,
    // { provide: APP_INTERCEPTOR, useClass: CacheInterceptor },
  ],
})
export class AppModule implements NestModule {
  configure(consumer: MiddlewareConsumer) {
    consumer.apply(LoggerMiddleware).forRoutes('*');
  }
}
