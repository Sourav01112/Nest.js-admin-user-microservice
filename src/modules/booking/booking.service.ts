import { Injectable, HttpException, HttpStatus } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Booking } from './schemas/booking.schema';
import { Model } from 'mongoose';
import { MetricsService } from '../metrics/metrics.service';
import { sendMail } from '../../common/utils/mail';
import { ConfigService } from '@nestjs/config';
import { BookingPayload } from './interface/booking.interface';

@Injectable()
export class BookingService {
  constructor(
    @InjectModel(Booking.name) private bookingModel: Model<Booking>,
    private metricsService: MetricsService,
    private configService: ConfigService,
  ) { }

  async createBooking(data: BookingPayload, apiPath: string, method: string) {
    console.log('Booking data in service:', data);
    const end = this.metricsService.startTimer();
    const { name, email, phonenumber, servicetype, location, image, ip } = data;

    const prevBooking = await this.bookingModel.findOne({
      ip,
      createdAt: { $gt: new Date(Date.now() - 120000) },
    });

    if (prevBooking) {
      this.metricsService.increment('Booking Blocked', '400');
      end({ route: apiPath, code: 400, method });
      throw new HttpException('Please wait for a while', HttpStatus.BAD_REQUEST);
    }

    const booking = await this.bookingModel.create({
      name,
      email,
      phonenumber,
      servicetype,
      location,
      image,
      ip,
    });

    if (booking) {
      await sendMail(email, name, 'user');
      await sendMail(this.configService.get<string>('ADMIN_EMAIL')!, name, 'admin');
      this.metricsService.increment('Booking Success', '201');
      end({ route: apiPath, code: 201, method });
      return { booking };
    } else {
      this.metricsService.increment('Booking Error Occured', '400');
      end({ route: apiPath, code: 400, method });
      throw new HttpException('Error occurred', HttpStatus.BAD_REQUEST);
    }
  }
}
// configService.get<string>('MONGO_URL'),
