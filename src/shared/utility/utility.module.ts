import { Module } from '@nestjs/common';
import { UtilityService } from './utility.service';

@Module({
  providers: [UtilityService],
  exports: [UtilityService], // ตอนนี้ Module อื่นที่ import UtilityModule จะใช้ UtilityService ได้
})
export class UtilityModule {}
