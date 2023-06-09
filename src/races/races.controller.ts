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

@Controller('races')
export class RacesController {
  constructor(private readonly racesService: RacesService) {}
}
