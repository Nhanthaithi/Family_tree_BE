import { LikeService } from './Like.service';
import { Body, Controller, Delete, Param, Post, Res } from '@nestjs/common';
import { Response } from 'express';
import { TypeLike } from './DTO/Like.DTO';

@Controller('api/v1/Likes')
export class LikeController {
  constructor(public LikeService: LikeService) {}

  // ======================================================================> post like
  @Post('/postLike')
  async postLike(@Body() body: TypeLike, @Res() res: Response) {
    return await this.LikeService.postLike(body, res);
  }

  // ======================================================================> delete like
  @Delete('/deleteLike/:id')
  async deleteLike(@Param('id') id: number, @Res() res: Response) {
    return await this.LikeService.deleteLike(id, res);
  }
}
