import {
  BadRequestException,
  Injectable,
  UnauthorizedException,
} from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { hash, genSalt, compare } from 'bcrypt';
import { User } from './entities/user.entities';
import { InjectModel } from '@nestjs/sequelize';
import { RegisterDto } from './dto/register.dto';
import { LoginDto } from './dto/login.dto';

@Injectable()
export class AuthService {
  constructor(
    @InjectModel(User)
    private readonly userModel: typeof User,
    private jwtService: JwtService,
  ) {}

  async register(registerDto: RegisterDto) {
    // เช็คอีเมลซ้ำ ว่ามีในระบบหรือไม่
    const user = await this.userModel.findOne({
      where: { email: registerDto.email },
    });
    if (user) {
      throw new BadRequestException('มีอีเมล์นี้ในระบบแล้ว โปรดลองใหม่');
    }
    // hash password
    const salt = await genSalt(10);
    const hashedPassword = await hash(registerDto.password, salt);
    // เพิ่ม user ใหม่ไปยัง table
    const newUser = await this.userModel.create({
      fullname: registerDto.fullname,
      email: registerDto.email,
      password: hashedPassword,
    });
    return newUser;
  }

  // login
  async login(loginDto: LoginDto) {
    // เช็คว่ามี email ในระบบหรือไม่
    const user = await this.userModel.findOne({
      where: { email: loginDto.email },
    });
    if (!user) {
      throw new UnauthorizedException('ไม่พบผู้ใช้นี้ในระบบ'); // 401
    }
    console.log('User object:', user); // เพิ่มบรรทัดนี้เพื่อดู object user ทั้งหมด
    console.log('User password from DB:', user.password); // เพิ่มบรรทัดนี้
    // เปรียบเทียบรหัสผ่าน
    const isValid = await compare(loginDto.password, user.password);
    if (!isValid) {
      throw new UnauthorizedException('รหัสผ่านไม่ถูกต้อง'); // 401
    }
    // gen jwt token
    const payload = { user_id: user.id };
    const token = await this.jwtService.signAsync(payload, {
      secret: process.env.JWT_SECRET,
    });
    return { acess_token: token };
  }

  // get user profile
  async getUserProfile(id: number) {
    const user = await this.userModel.findByPk(id, {
      attributes: ['id', 'fullname', 'email'],
    });
    return user;
  }
}
