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
import { RacesService } from './races.service';
import { CreateRaceDto } from './dto/create-race.dto';
import { UpdateRaceDto } from './dto/update-race.dto';

@ApiTags('races')
@Controller('races')
export class RacesController {
  constructor(private readonly racesService: RacesService) {}

  @Get(':year')
  async findByYear(@Param('year') year: string) {
    return await this.racesService.findByYear(year);
  }
}
