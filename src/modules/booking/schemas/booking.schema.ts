import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';

@Schema({ timestamps: true })
export class Booking extends Document {
  @Prop() name: string;
  @Prop() email: string;
  @Prop() phonenumber: string;
  @Prop() servicetype: string;
  @Prop() location: string;
  @Prop() image: string;
  @Prop() ip: string;
}

export const BookingSchema = SchemaFactory.createForClass(Booking);
