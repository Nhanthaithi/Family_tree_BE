import { Body, Controller, Delete, Param, Post, Res } from '@nestjs/common';
import { SpecificationsEdgeService } from './SpecificationsEdge.service';
import {
  postEdgeType,
  SpecificationsEdgeType,
} from './DTO/SpecificationsEdge.DTO';
import { Response } from 'express';

@Controller('api/v1/specificationsEdge')
export class SpecificationsEdgeController {
  constructor(public SpecificationsEdgeService: SpecificationsEdgeService) {}

  //============================================================================> POST all edge
  @Post('/postallEdge')
  async postAllEdge(
    @Body() body: SpecificationsEdgeType[],
    @Res() res: Response,
  ) {
    return await this.SpecificationsEdgeService.postAllSpecificationsEdge(
      body,
      res,
    );
  }

  //============================================================================> delete edge
  @Delete('/deleteEdge/:id')
  async deleteEdge(@Param('id') id: string, @Res() res: Response) {
    return await this.SpecificationsEdgeService.deleteEdge(id, res);
  }

  //============================================================================> POST edge
  @Post('/postEdge')
  async postEdge(@Body() body: postEdgeType, @Res() res: Response) {
    return await this.SpecificationsEdgeService.postEdge(body, res);
  }
}
