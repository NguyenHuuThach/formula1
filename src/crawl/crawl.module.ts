import { Module } from '@nestjs/common';
import { CrawlService } from './crawl.service';
import { HttpModule } from '@nestjs/axios';
import { FastestLapsModule } from 'src/fastest-laps/fastest-laps.module';
import { RacesModule } from 'src/races/races.module';
import { CrawlController } from './crawl.controller';
import { TeamsModule } from 'src/teams/teams.module';
import { DriversModule } from 'src/drivers/drivers.module';

@Module({
  imports: [
    HttpModule,
    FastestLapsModule,
    RacesModule,
    TeamsModule,
    DriversModule,
  ],
  controllers: [CrawlController],
  providers: [CrawlService],
})
export class CrawlModule {}
