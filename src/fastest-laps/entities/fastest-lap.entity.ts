import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { HydratedDocument } from 'mongoose';

export type FastestLapDocument = HydratedDocument<FastestLap>;

@Schema({ timestamps: true })
export class FastestLap {
  @Prop({
    trim: true,
    maxLength: 150,
    default: '',
  })
  grandPrix: string;

  @Prop({
    trim: true,
    maxLength: 150,
    default: '',
  })
  driver: string;

  @Prop({
    trim: true,
    maxLength: 150,
    default: '',
  })
  car: string;

  @Prop({
    trim: true,
    maxLength: 150,
    default: '',
  })
  time: string;

  @Prop({
    trim: true,
    maxLength: 150,
    default: '',
    index: true,
  })
  year: string;
}

export const FastestLapSchema = SchemaFactory.createForClass(FastestLap);
