import { Module } from '@nestjs/common';
import { CrawlService } from './crawl.service';
import { HttpModule } from '@nestjs/axios';
import { FastestLapsModule } from 'src/fastest-laps/fastest-laps.module';
import { RacesModule } from 'src/races/races.module';
import { CrawlController } from './crawl.controller';

@Module({
  imports: [HttpModule, FastestLapsModule, RacesModule],
  controllers: [CrawlController],
  providers: [CrawlService],
})
export class CrawlModule {}
