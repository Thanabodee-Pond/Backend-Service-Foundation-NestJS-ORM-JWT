import {
  Body,
  Controller,
  Get,
  HttpCode,
  Post,
  UseGuards,
  Request,
} from '@nestjs/common';
import { AuthService } from './auth.service';
import { RegisterDto } from './dto/register.dto';
import { LoginDto } from './dto/login.dto';
import { JwtAuthGuard } from './jwt-auth.guard';

@Controller({
  path: 'auth', // localhost:4000/api/v1/auth
  version: '1',
})
export class AuthController {
  constructor(private readonly auuthService: AuthService) {}

  // localhost:4000/api/v1/auth/register
  @Post('register')
  @HttpCode(201)
  async register(@Body() registerDto: RegisterDto) {
    await this.auuthService.register(registerDto);
    return {
      message: 'ลงทะเบียนสำเร็จ',
    };
  }

  // localhost:4000/api/v1/auth/login
  @Post('login')
  @HttpCode(200)
  async login(@Body() loginDto: LoginDto) {
    return await this.auuthService.login(loginDto);
  }

  // localhost:4000/api/v1/auth/profile
  @UseGuards(JwtAuthGuard)
  @Get('profile')
  async getProfile(@Request() req: any) {
    return await this.auuthService.getUserProfile(Number(req.user.user_id));
  }
}
