import { ApiTags } from '@nestjs/swagger';
import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
} from '@nestjs/common';
import { FastestLapsService } from './fastest-laps.service';
import { CreateFastestLapDto } from './dto/create-fastest-lap.dto';
import { UpdateFastestLapDto } from './dto/update-fastest-lap.dto';

@ApiTags('fastest-laps')
@Controller('fastest-laps')
export class FastestLapsController {
  constructor(private readonly fastestLapsService: FastestLapsService) {}

  @Get(':year')
  async findByYear(@Param('year') year: string) {
    return await this.fastestLapsService.findByYear(year);
  }
}
