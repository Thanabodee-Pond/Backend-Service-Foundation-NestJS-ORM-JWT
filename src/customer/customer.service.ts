import { Injectable, NotFoundException } from '@nestjs/common';
import { CreateCustomerDto } from './dto/create-customer.dto';
import { UpdateCustomerDto } from './dto/update-customer.dto';
import { InjectModel } from '@nestjs/sequelize';
import { Customer } from './entities/customer.entity';
import { where } from 'sequelize';

@Injectable()
export class CustomerService {
  constructor(
    @InjectModel(Customer)
    private readonly customerModel: typeof Customer,
  ) {}

  async create(createCustomerDto: CreateCustomerDto) {
    return await this.customerModel.create(
      createCustomerDto as Partial<Customer>,
    );
  }

  async findAll(): Promise<Customer[]> {
    return await this.customerModel.findAll({
      order: [['id', 'desc']],
    });
  }

  async findOne(id: number) {
    const customer = await this.customerModel.findByPk(id);
    if (!customer) {
      throw new NotFoundException('ไม่พบข้อมูลนี้ในระบบ'); // 404
    }
    return customer;
  }

  async update(id: number, updateCustomerDto: UpdateCustomerDto) {
    const affectedcount = await this.customerModel.update(updateCustomerDto, {
      where: { id: id },
    });
    return affectedcount;
  }

  async remove(id: number) {
    const numberofDestroyRow = await this.customerModel.destroy({
      where: { id: id },
    });
    return numberofDestroyRow;
  }
}
