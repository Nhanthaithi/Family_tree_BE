import { TypePostComment } from './DTO/Comment.DTO';
import { Body, Controller, Delete, Param, Post, Res } from '@nestjs/common';
import { CommentService } from './Comment.service';
import { Response } from 'express';

@Controller('api/v1/Comment')
export class CommentController {
  constructor(public CommentService: CommentService) {}

  // ======================================================================> post bình luận
  @Post('/postComment')
  async PostComment(@Body() body: TypePostComment, @Res() res: Response) {
    return await this.CommentService.PostComment(body, res);
  }

  // ======================================================================> xóa bình luận
  @Delete('/DeleteComment/:id')
  async DeleteComment(@Param('id') id: number, @Res() res: Response) {
    return await this.CommentService.DeleteComment(id, res);
  }
}
