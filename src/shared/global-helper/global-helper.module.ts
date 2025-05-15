import { Global, Module } from '@nestjs/common';
import { GlobalHelperService } from './global-helper.service';

@Global() // Global Module เราสามารถเอา module (service) นี้ไปใช้ได้เลย ไม่ต้อง import module นี้
@Module({
  providers: [GlobalHelperService],
  exports: [GlobalHelperService],
})
export class GlobalHelperModule {}
