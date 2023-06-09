import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';

import { CreateFastestLapDto } from './dto/create-fastest-lap.dto';
import { UpdateFastestLapDto } from './dto/update-fastest-lap.dto';
import { FastestLap } from './entities/fastest-lap.entity';
import { Model } from 'mongoose';

@Injectable()
export class FastestLapsService {
  constructor(
    @InjectModel(FastestLap.name) private fastestLapModel: Model<FastestLap>,
  ) {}

  async createMany(data: any) {
    try {
      return await this.fastestLapModel.insertMany(data);
    } catch (error) {
      console.log(error);
      return error;
    }
  }

  async deleteMany() {
    try {
      return await this.fastestLapModel.deleteMany().exec();
    } catch (error) {
      console.log(error);
      return error;
    }
  }

  async count() {
    try {
      return await this.fastestLapModel.countDocuments().exec();
    } catch (error) {
      console.log(error);
      return error;
    }
  }
}
