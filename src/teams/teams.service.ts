import { InjectModel } from '@nestjs/mongoose';
import { Injectable } from '@nestjs/common';
import { CreateTeamDto } from './dto/create-team.dto';
import { UpdateTeamDto } from './dto/update-team.dto';
import { Team } from './entities/team.entity';
import { Model } from 'mongoose';

@Injectable()
export class TeamsService {
  constructor(@InjectModel(Team.name) private teamModel: Model<Team>) {}

  async createMany(data: any) {
    try {
      return await this.teamModel.insertMany(data);
    } catch (error) {
      console.log(error);
      return error;
    }
  }

  async deleteMany() {
    try {
      return await this.teamModel.deleteMany().exec();
    } catch (error) {
      console.log(error);
      return error;
    }
  }

  async count() {
    try {
      return await this.teamModel.countDocuments().exec();
    } catch (error) {
      console.log(error);
      return error;
    }
  }

  async findByYear(year: string = '2023') {
    try {
      return await this.teamModel.find({ year }).lean().exec();
    } catch (error) {
      console.log(error);
      return error;
    }
  }
}
