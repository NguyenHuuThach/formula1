import { InjectModel } from '@nestjs/mongoose';
import { Injectable } from '@nestjs/common';
import { CreateRaceDto } from './dto/create-race.dto';
import { UpdateRaceDto } from './dto/update-race.dto';
import { Race } from './entities/race.entity';
import { Model } from 'mongoose';

@Injectable()
export class RacesService {
  constructor(@InjectModel(Race.name) private raceModel: Model<Race>) {}

  async createMany(data: any) {
    try {
      return await this.raceModel.insertMany(data);
    } catch (error) {
      console.log(error);
      return error;
    }
  }

  async deleteMany() {
    try {
      return await this.raceModel.deleteMany().exec();
    } catch (error) {
      console.log(error);
      return error;
    }
  }

  async count() {
    try {
      return await this.raceModel.countDocuments().exec();
    } catch (error) {
      console.log(error);
      return error;
    }
  }
}
