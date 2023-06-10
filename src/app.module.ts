import { Module, NestModule, MiddlewareConsumer } from '@nestjs/common';
import * as compression from 'compression';

import { AppController } from './app.controller';
import { AppService } from './app.service';
import { RacesModule } from './races/races.module';
import { MongooseModule } from '@nestjs/mongoose';
import { CrawlService } from './crawl/crawl.service';
import { CrawlModule } from './crawl/crawl.module';
import { HttpModule } from '@nestjs/axios';
import { FastestLapsModule } from './fastest-laps/fastest-laps.module';
import { DriversModule } from './drivers/drivers.module';
import { TeamsModule } from './teams/teams.module';

@Module({
  imports: [
    MongooseModule.forRoot('mongodb://localhost:27017/formula1', {}),
    HttpModule,
    RacesModule,
    CrawlModule,
    FastestLapsModule,
    DriversModule,
    TeamsModule,
  ],
  controllers: [AppController],
  providers: [AppService, CrawlService],
})
// export class AppModule {}
export class AppModule implements NestModule {
  configure(consumer: MiddlewareConsumer) {
    consumer.apply(compression()).forRoutes('*');
  }
}
