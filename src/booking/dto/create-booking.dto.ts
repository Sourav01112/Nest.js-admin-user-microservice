import { IsEmail, IsString, IsNotEmpty } from 'class-validator';
import { Type } from 'class-transformer';

export class CreateBookingDto {
  @IsString()
  @IsNotEmpty()
  name: string;

  @IsEmail()
  @IsNotEmpty()
  email: string;

  @IsString()
  @IsNotEmpty()
  phonenumber: string;

  @IsString()
  @IsNotEmpty()
  servicetype: string;

  @IsString()
  @IsNotEmpty()
  location: string;

  @IsString()
  @IsNotEmpty()
  ip: string;

  // @IsNotEmpty()
  // image: any; 
}
