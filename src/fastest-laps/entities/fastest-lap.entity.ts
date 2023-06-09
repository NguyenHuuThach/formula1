import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { HydratedDocument } from 'mongoose';

export type FastestLapDocument = HydratedDocument<FastestLap>;

@Schema({ timestamps: true })
export class FastestLap {
  @Prop({
    trim: true,
    maxLength: 150,
    required: true,
  })
  grandPrix: string;

  @Prop({
    trim: true,
    maxLength: 150,
    required: true,
  })
  driver: string;

  @Prop({
    trim: true,
    maxLength: 150,
    required: true,
  })
  car: string;

  @Prop({
    trim: true,
    maxLength: 150,
    required: true,
  })
  time: string;

  @Prop({
    trim: true,
    maxLength: 150,
    required: true,
  })
  year: string;
}

export const FastestLapSchema = SchemaFactory.createForClass(FastestLap);
