import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Patch,
  Post,
  Query,
  Res,
} from '@nestjs/common';
import { CashTrackingService } from './CashTracking.service';
import {
  CashTrackingType,
  CashTrackingTypegetAll,
} from './DTO/CashTracking.DTO';
import { Response } from 'express';

@Controller('api/v1/CashTracking')
export class CashTrackingController {
  constructor(public CashTrackingService: CashTrackingService) {}

  // =================================================================> get tất cả sổ quỹ
  @Get('/getAllCashTracking')
  async getAllCashTracking(
    @Query('startDate') startDate: string,
    @Query('endDate') endDate: string,
    @Res() res: Response,
  ) {
    return await this.CashTrackingService.getAllCashTracking(
      startDate,
      endDate,
      res,
    );
  }

  // =================================================================> post sổ quỹ
  @Post('/postCashTracking')
  async postCashTracking(@Body() body: CashTrackingType, @Res() res: Response) {
    return await this.CashTrackingService.postCashTracking(body, res);
  }

  // =================================================================> delete sổ quỹ
  @Delete('/deleteCashTracking/:id')
  async deleteCashTracking(@Param('id') id: number, @Res() res: Response) {
    return await this.CashTrackingService.deleteCashTracking(id, res);
  }

  // =================================================================> sửa sổ quỹ
  @Patch('/patchCashTracking')
  async patchCashTracking(
    @Body() body: CashTrackingType,
    @Res() res: Response,
  ) {
    return await this.CashTrackingService.patchCashTracking(body, res);
  }
}
