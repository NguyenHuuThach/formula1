import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
} from '@nestjs/common';
import { CrawlService } from './crawl.service';
import { ApiTags } from '@nestjs/swagger';

@ApiTags('crawl')
@Controller('crawl')
export class CrawlController {
  constructor(private readonly crawlService: CrawlService) {}

  @Get('races')
  async crawlRaces() {
    return await this.crawlService.crawlRaces();
  }

  @Get('fastest-laps')
  async crawlFastestLaps() {
    return await this.crawlService.crawlFastestLaps();
  }

  @Get('teams')
  async crawlTeams() {
    return await this.crawlService.crawlTeams();
  }

  @Get('drivers')
  async crawlDrivers() {
    return await this.crawlService.crawlDrivers();
  }
}
