import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { HydratedDocument } from 'mongoose';

export type TeamDocument = HydratedDocument<Team>;

@Schema({ timestamps: true })
export class Team {
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
  team: string;

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

export const TeamSchema = SchemaFactory.createForClass(Team);
