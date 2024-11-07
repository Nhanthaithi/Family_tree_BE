import { Body, Controller, Get, Param, Patch, Post, Res } from '@nestjs/common';
import { GenealogyTreeService } from './GenealogyTree.service';
import {
  CreateGenealogyTree,
  GenealogyTreePayload,
} from './DTO/CreateGenealogyTree.DTO';
import { Response } from 'express';

@Controller('api/v1/GenealogyTree')
export class GenealogyTreeController {
  constructor(public GenealogyTreeService: GenealogyTreeService) {}

  // ======================================================================> POST TÊN CÂY GIA PHẢ
  @Post('/postNameGenealogyTree')
  async createGenealogyTree(
    @Body() body: CreateGenealogyTree,
    @Res() res: Response,
  ) {
    return await this.GenealogyTreeService.CreateGenealogyTree(body, res);
  }

  // ======================================================================> GET VỀ KIỂM TRA ĐỂ TẠO CÂY GIA PHẢ ADMIN
  @Get('/getGenealogyTree/:id')
  async TestGenealogyTree(@Param('id') id: string, @Res() res: Response) {
    return await this.GenealogyTreeService.TestGenealogyTree(id, res);
  }

  // ======================================================================> GET DỮ LIỆU CÂY GIA PHẢ
  @Get('/getGenealogyTreeAll')
  async getGenealogyTreeAll(@Res() res: Response) {
    return await this.GenealogyTreeService.getGenealogyTreeAll(res);
  }

  // ======================================================================> POST CẬP NHẬT TÊN CÂY GIA PHẢ
  @Patch('/UpdateGenealogyTree/:id')
  async UpdateGenealogyTree(
    @Param('id') id: number,
    @Body() body: CreateGenealogyTree,
    @Res() res: Response,
  ) {
    return await this.GenealogyTreeService.UpdateGenealogyTree(id, body, res);
  }
}
