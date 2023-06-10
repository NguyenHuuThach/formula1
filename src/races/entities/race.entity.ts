import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { HydratedDocument } from 'mongoose';

export type RaceDocument = HydratedDocument<Race>;

@Schema({ timestamps: true })
export class Race {
  @Prop({
    trim: true,
    maxLength: 150,
    default: '',
  })
  grandPrix: string;

  @Prop({
    default: '',
  })
  date: Date;

  @Prop({
    trim: true,
    maxLength: 150,
    default: '',
  })
  winner: string;

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
  laps: string;

  @Prop({
    trim: true,
    maxLength: 150,
    default: '',
  })
  time: string;

  @Prop({
    default: [],
  })
  results: Array<Object>;

  @Prop({
    default: [],
  })
  fastestLaps: Array<Object>;

  @Prop({
    default: [],
  })
  pitStopSummary: Array<Object>;

  @Prop({
    default: [],
  })
  startingGrid: Array<Object>;

  @Prop({
    default: [],
  })
  qualifying: Array<Object>;

  @Prop({
    default: [],
  })
  practice1: Array<Object>;

  @Prop({
    default: [],
  })
  practice2: Array<Object>;

  @Prop({
    default: [],
  })
  practice3: Array<Object>;

  @Prop({
    trim: true,
    maxLength: 150,
    default: '',
    index: true,
  })
  year: string;
}

export const RaceSchema = SchemaFactory.createForClass(Race);
