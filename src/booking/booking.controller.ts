import {
  Controller, Post, Body, Req, Res, Logger, UploadedFile, UseInterceptors
} from '@nestjs/common';
import { BookingService } from './booking.service';
import { Request, Response } from 'express';
import { CreateBookingDto } from './dto/create-booking.dto';
import { FileInterceptor } from '@nestjs/platform-express';


@Controller('api/bookings')
export class BookingController {
  private readonly logger = new Logger('BookingController');
  constructor(private readonly bookingService: BookingService) { }

  @Post() 
  @UseInterceptors(FileInterceptor('image'))
  async create(
    @Body() body: CreateBookingDto,
    @UploadedFile() file: Express.Multer.File,
    @Req() req: Request,
    @Res() res: Response,) {
    try {
      this.logger.log(`Incoming booking from IP: ${req.ip}`);
      this.logger.debug(`Request body: ${JSON.stringify(body)}`);

      const result = await this.bookingService.createBooking(body, req.baseUrl, req.method);
      res.status(201).json(result);
    } catch (error) {
      res.status(error.status || 500).json({ message: error.message });
    }
  }
}
