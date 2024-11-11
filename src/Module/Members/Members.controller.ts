import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Patch,
  Post,
  Res,
  UploadedFiles,
  UseInterceptors,
} from '@nestjs/common';
import { Response } from 'express';
import { FileFieldsInterceptor } from '@nestjs/platform-express';
import { multerUpload } from 'src/Config/Multer.config';
import { typeContent, typemedia } from './DTO/Member.DTO';
import { PostArticleService } from './Members.service';

@Controller('api/v1/Article')
export class PostArticleController {
  constructor(public PostArticleService: PostArticleService) {}

  //================================================================================================> đăng bài viết
  @Post('/postArticle')
  @UseInterceptors(
    FileFieldsInterceptor([{ name: 'mediaFiles', maxCount: 10 }], multerUpload),
  )
  async postContent(
    @UploadedFiles() files: { mediaFiles?: Express.Multer.File[] },
    @Res() res: Response,
    @Body() body: typeContent,
  ) {
    if (files.mediaFiles) {
      const mediaData: typemedia[] = files.mediaFiles.map((file) => ({
        type: file.mimetype.split('/')[0],
        url: file.path,
      }));

      body.mediaFiles = mediaData;
    }
    return await this.PostArticleService.postContent(body, res);
  }

  //================================================================================================> lấy tất cả bài viết
  @Get('/getAllArticle')
  async getAllArticle(@Res() res: Response) {
    return await this.PostArticleService.getAllArticle(res);
  }

  // ======================================================================> xóa bài viết
  @Delete('/DeleteArticle/:id')
  async DeleteArticle(@Param('id') id: number, @Res() res: Response) {
    return await this.PostArticleService.DeleteArticle(id, res);
  }

  // ======================================================================> lấy 1 bài viết
  @Get('/getOneArticle/:id')
  async getOneArticle(@Param('id') id: number, @Res() res: Response) {
    return await this.PostArticleService.getOneArticle(id, res);
  }

  //================================================================================================> sửa bài viết
  @Patch('/patchArticle/:id')
  @UseInterceptors(
    FileFieldsInterceptor([{ name: 'mediaFiles', maxCount: 10 }], multerUpload),
  )
  async patchArticle(
    @UploadedFiles() files: { mediaFiles?: Express.Multer.File[] },
    @Res() res: Response,
    @Body() body: typeContent,
    @Param('id') id: number,
  ) {
    if (files.mediaFiles) {
      const mediaData: typemedia[] = files.mediaFiles.map((file) => ({
        type: file.mimetype.split('/')[0],
        url: file.path,
      }));

      body.mediaFiles = mediaData;
    }
    return await this.PostArticleService.patchArticle(id, body, res);
  }
}
