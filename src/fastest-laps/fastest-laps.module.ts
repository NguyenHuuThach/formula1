import { MongooseModule } from '@nestjs/mongoose';
import { Module } from '@nestjs/common';
import { FastestLapsService } from './fastest-laps.service';
import { FastestLapsController } from './fastest-laps.controller';
import { FastestLap, FastestLapSchema } from './entities/fastest-lap.entity';

@Module({
  imports: [
    MongooseModule.forFeature([
      { name: FastestLap.name, schema: FastestLapSchema },
    ]),
  ],
  controllers: [FastestLapsController],
  providers: [FastestLapsService],
  exports: [FastestLapsService],
})
export class FastestLapsModule {}
