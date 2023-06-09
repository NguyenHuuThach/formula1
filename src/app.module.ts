import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { RacesModule } from './races/races.module';
import { MongooseModule } from '@nestjs/mongoose';
import { CrawlService } from './crawl/crawl.service';
import { CrawlModule } from './crawl/crawl.module';

@Module({
  imports: [
    MongooseModule.forRoot('mongodb://localhost:27017/formula1', {}),
    RacesModule,
    CrawlModule,
  ],
  controllers: [AppController],
  providers: [AppService, CrawlService],
})
export class AppModule {}
