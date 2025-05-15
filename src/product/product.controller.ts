import { Controller, Get, Version } from '@nestjs/common';
import { GlobalHelperService } from 'src/shared/global-helper/global-helper.service';
import { UtilityService } from 'src/shared/utility/utility.service';

@Controller({
  path: 'product',
  version: '1',
})
export class ProductController {
  constructor(
    private readonly utilityService: UtilityService,
    private readonly globalHelperService: GlobalHelperService,
  ) {}

  @Get('/') //localhost:4000/api/v1/product/
  findall() {
    return [];
  }

  @Get('/date') //localhost:4000/api/v1/product/date
  getDate() {
    // throw new HttpException(
    //   'เกิดข้อผิดพลาดแสดงวันที่ไม่ได้',
    //   HttpStatus.BAD_REQUEST,
    // );
    return {
      sever_date: this.utilityService.getServerDate(),
    };
  }

  @Version('2')
  @Get('/thaidate') //localhost:4000/api/v2/product/thaidate
  getThaiDate() {
    // build-in-exception
    // throw new BadRequestException('เกิดข้อผิดพลาดแสดงวันที่ไม่ได้');
    return {
      sever_thai_date: this.globalHelperService.getServerThaiDate(),
    };
  }
}
