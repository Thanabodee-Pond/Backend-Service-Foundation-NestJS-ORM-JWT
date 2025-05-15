import { Module } from '@nestjs/common';
import { ProductController } from './product.controller';
import { UtilityModule } from 'src/shared/utility/utility.module';

@Module({
  imports: [UtilityModule], // ไม่ใช่ import Service (ระวัง)
  controllers: [ProductController],
})
export class ProductModule {}
