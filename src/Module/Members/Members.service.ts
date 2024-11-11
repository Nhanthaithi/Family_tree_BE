import { Injectable } from '@nestjs/common';
import { Response } from 'express';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { PostArticle } from './DB/Members.entity';
import { MediaFile } from '../MediaFile/DB/MediaFile.entity';

@Injectable()
export class PostArticleService {
  constructor(
    @InjectRepository(PostArticle)
    private PostArticleRepository: Repository<PostArticle>,

    @InjectRepository(MediaFile)
    private MediaFileRepository: Repository<MediaFile>,
  ) {}

  // ==================================================================> POST bài viết
  async postContent(data: any, res: Response) {
    data.userId = Number(data.userId);

    try {
      const post = this.PostArticleRepository.create({
        ...data,
        user: { id: data.userId },
      });
      const savedPost = await this.PostArticleRepository.save(post);
      return res.status(200).json({ message: 'đăng bài thành công' });
    } catch (error) {
      console.log(error);

      return res.status(500).json({ message: 'Internal Server Error' });
    }
  }

  // ==================================================================> lấy tất cả bài viết
  async getAllArticle(res: Response) {
    try {
      const data = await this.PostArticleRepository.find({
        relations: ['user', 'comments', 'likes', 'mediaFiles'],
      });

      const result = data.map((post) => {
        if (post.user) {
          post.user.password = undefined;
        }
        return post;
      });

      return res.status(200).json({ data, message: 'lấy bài viết thành công' });
    } catch (error) {
      return res.status(500).json({ message: 'Internal Server Error' });
    }
  }

  // ==================================================================>  delete bài viết
  async DeleteArticle(id: number, res: Response) {
    const dataId = Number(id);

    try {
      const data = await this.PostArticleRepository.findOne({
        where: { id: dataId },
      });
      if (data) {
        await this.PostArticleRepository.delete(data.id);
      }

      return res.status(200).json({ message: 'xóa bài đăng thành công' });
    } catch (error) {
      return res.status(500).json({ message: 'Internal Server Error' });
    }
  }

  // ==================================================================> lấy 1 bài viết
  async getOneArticle(id: number, res: Response) {
    try {
      const data = await this.PostArticleRepository.findOne({
        where: { id: id },
        relations: ['mediaFiles'],
      });

      return res.status(200).json({ data, message: 'lấy bài viết thành công' });
    } catch (error) {
      return res.status(500).json({ message: 'Internal Server Error' });
    }
  }

  // ==================================================================> sửa bài viết
  async patchArticle(id: number, data: any, res: Response) {
    const dataUpdate = { content: data.content };
    const oldMedia = JSON.parse(data.oldMediaFiles);

    try {
      await this.PostArticleRepository.update({ id: id }, dataUpdate);

      // Lấy danh sách id của các hình ảnh cũ từ `oldMediaFiles` (sau khi parse)
      const oldMediaFileIds = oldMedia.map((file) => file.id);

      // Lấy các hình ảnh đang tồn tại trong database
      const existingMediaFiles = await this.MediaFileRepository.find({
        where: { post: { id: id } },
      });

      // Xác định các hình ảnh cần xóa
      const filesToDelete = existingMediaFiles.filter(
        (file) => !oldMediaFileIds.includes(file.id),
      );

      if (filesToDelete.length > 0) {
        const deleteIds = filesToDelete.map((file) => file.id);
        await this.MediaFileRepository.delete(deleteIds);
      }

      if (data.mediaFiles) {
        // Thêm hoặc cập nhật các mediaFiles mới
        data.mediaFiles.forEach(async (file) => {
          const newMediaFile = this.MediaFileRepository.create({
            type: file.type,
            url: file.url,
            post: { id: id },
          });
          await this.MediaFileRepository.save(newMediaFile);
        });
      }

      return res.status(200).json({ message: 'Sửa dữ liệu thành công' });
    } catch (error) {
      console.log(error);

      return res.status(500).json({ message: 'Internal Server Error' });
    }
  }
}
