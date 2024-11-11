import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { PostArticle } from './DB/Members.entity';
import { PostArticleController } from './Members.controller';
import { PostArticleService } from './Members.service';
import { MediaFileModule } from '../MediaFile/MediaFile.module';

@Module({
  imports: [TypeOrmModule.forFeature([PostArticle]), MediaFileModule],
  controllers: [PostArticleController],
  providers: [PostArticleService],
})
export class PostArticleModule {}
