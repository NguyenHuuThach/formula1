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
    await this.crawlService.crawlRaces();
    return 'ok';
  }

  @Get('fastest-laps')
  async crawlFastestLaps() {
    return await this.crawlService.crawlFastestLaps();
  }
}
