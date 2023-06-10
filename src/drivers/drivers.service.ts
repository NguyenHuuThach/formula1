import { InjectModel } from '@nestjs/mongoose';
import { Injectable } from '@nestjs/common';
import { CreateDriverDto } from './dto/create-driver.dto';
import { UpdateDriverDto } from './dto/update-driver.dto';
import { Driver } from './entities/driver.entity';
import { Model } from 'mongoose';

@Injectable()
export class DriversService {
  constructor(@InjectModel(Driver.name) private driverModel: Model<Driver>) {}

  async createMany(data: any) {
    try {
      return await this.driverModel.insertMany(data);
    } catch (error) {
      console.log(error);
      return error;
    }
  }

  async deleteMany() {
    try {
      return await this.driverModel.deleteMany().exec();
    } catch (error) {
      console.log(error);
      return error;
    }
  }

  async count() {
    try {
      return await this.driverModel.countDocuments().exec();
    } catch (error) {
      console.log(error);
      return error;
    }
  }

  async findByYear(year: string = '2023') {
    try {
      return await this.driverModel.find({ year }).lean().exec();
    } catch (error) {
      console.log(error);
      return error;
    }
  }
}
