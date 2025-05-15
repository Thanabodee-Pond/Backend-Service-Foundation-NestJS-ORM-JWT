import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  NotFoundException,
  BadRequestException,
  UseGuards,
} from '@nestjs/common';
import { CustomerService } from './customer.service';
import { CreateCustomerDto } from './dto/create-customer.dto';
import { UpdateCustomerDto } from './dto/update-customer.dto';
import { JwtAuthGuard } from 'src/auth/jwt-auth.guard';

@Controller({
  path: 'customer', // localhost: 4000/api/v1/customer
  version: '1',
})
export class CustomerController {
  constructor(private readonly customerService: CustomerService) {}

  @Post() // localhost: 4000/api/v1/customer
  async create(@Body() createCustomerDto: CreateCustomerDto) {
    const customer = await this.customerService.create(createCustomerDto)
    return {
      data: customer,
      message: 'เพิ่มข้อมูลสำเร็จ',
    };
  }

  @Get() // localhost: 4000/api/v1/customer
  findAll() {
    return this.customerService.findAll();
  }

  @Get(':id') // localhost: 4000/api/v1/customer/1
  findOne(@Param('id') id: string) {
    return this.customerService.findOne(+id);
  }

  @Patch(':id') // localhost: 4000/api/v1/customer/1
  async update(
    @Param('id') id: string,
    @Body() updateCustomerDto: UpdateCustomerDto,
  ) {
    const [affectedcount] = await this.customerService.update(
      +id,
      updateCustomerDto,
    );
    if (affectedcount === 0) {
      throw new BadRequestException('ไม่พบข้อมูลที่ต้องการแก้ไข'); // 400
    }
    return { message: 'แก้ไขข้อมูลสำเร็จ' };
  }

  @UseGuards(JwtAuthGuard)
  @Delete(':id') // localhost: 4000/api/v1/customer/1
  async remove(@Param('id') id: string) {
    const numberofDestroyRow = await this.customerService.remove(+id);
    if (numberofDestroyRow === 0) {
      throw new NotFoundException('ไม่พบข้อมูลที่ต้องการลบ'); // 404
    }
    return { message: 'ลบข้อมูลสำเร็จ' };
  }
}
