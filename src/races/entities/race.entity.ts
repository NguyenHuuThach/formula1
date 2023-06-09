import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { HydratedDocument } from 'mongoose';

export type RaceDocument = HydratedDocument<Race>;

@Schema({ timestamps: true })
export class Race {
  @Prop({
    trim: true,
    maxLength: 150,
    required: true,
  })
  grandPrix: string;

  @Prop({
    required: true,
  })
  date: Date;

  @Prop({
    trim: true,
    maxLength: 150,
    required: true,
  })
  winner: string;

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
  laps: string;

  @Prop({
    trim: true,
    maxLength: 150,
    required: true,
  })
  time: string;
}

export const RaceSchema = SchemaFactory.createForClass(Race);
