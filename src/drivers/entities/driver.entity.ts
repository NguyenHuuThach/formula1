import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { HydratedDocument } from 'mongoose';

export type DriverDocument = HydratedDocument<Driver>;

@Schema({ timestamps: true })
export class Driver {
  @Prop({
    trim: true,
    maxLength: 150,
    default: '',
  })
  pos: string;

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
  nationality: string;

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
  pts: string;

  @Prop({
    default: [],
  })
  standings: Array<Object>;

  @Prop({
    trim: true,
    maxLength: 150,
    default: '',
    index: true,
  })
  year: string;
}

export const DriverSchema = SchemaFactory.createForClass(Driver);
