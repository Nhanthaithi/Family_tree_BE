import { Response } from 'express';
import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Patch,
  Post,
  Res,
} from '@nestjs/common';
import { SpecificationsNodeService } from './SpecificationsNode.service';
import { SpecificationsNodeType } from './DTO/SpecificationsNode.DTO';

@Controller('api/v1/specificationsNode')
export class SpecificationsNodeController {
  constructor(public SpecificationsNodeService: SpecificationsNodeService) {}

  //============================================================================> POST all node
  @Post('/postallNode')
  async postAllNode(
    @Body() body: SpecificationsNodeType[],
    @Res() res: Response,
  ) {
    return await this.SpecificationsNodeService.postAllSpecificationsNode(
      body,
      res,
    );
  }

  //============================================================================> POST cập nhật vị trí node
  @Patch('/patchPositionNode')
  async updatePositionNode(
    @Body() body: SpecificationsNodeType[],
    @Res() res: Response,
  ) {
    return await this.SpecificationsNodeService.updatePositionNode(body, res);
  }

  //============================================================================> xóa node
  @Delete('/deleteNode/:id')
  async deleteNode(@Param('id') id: string, @Res() res: Response) {
    return await this.SpecificationsNodeService.deleteNode(id, res);
  }

  //============================================================================> get về sửa node
  @Get('/editNode/:id')
  async editNode(@Param('id') id: string, @Res() res: Response) {
    return await this.SpecificationsNodeService.editNode(id, res);
  }

  //============================================================================> get về sửa node
  @Patch('/UpdateNode/:id')
  async UpdateNode(
    @Param('id') id: string,
    @Body() body: SpecificationsNodeType,
    @Res() res: Response,
  ) {
    return await this.SpecificationsNodeService.UpdateNode(id, body, res);
  }
}
