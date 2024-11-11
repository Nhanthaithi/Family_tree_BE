import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Comment } from './DB/Comment.entity';
import { TypePostComment } from './DTO/Comment.DTO';
import { Response } from 'express';

@Injectable()
export class CommentService {
  constructor(
    @InjectRepository(Comment)
    private CommentRepository: Repository<Comment>,
  ) {}

  // ==================================================================>  post bình luận
  async PostComment(data: TypePostComment, res: Response) {
    data.userId = Number(data.userId);
    data.postId = Number(data.postId);

    try {
      const newComment = this.CommentRepository.create({
        ...data,
        user: { id: data.userId },
        post: { id: data.postId },
      });
      await this.CommentRepository.save(newComment);
      return res.status(200).json({ message: 'bình luận thành công' });
    } catch (error) {
      return res.status(500).json({ message: 'Internal Server Error' });
    }
  }

  // ==================================================================>  delete bình luận
  async DeleteComment(id: number, res: Response) {
    const dataId = Number(id);

    try {
      const data = await this.CommentRepository.findOne({
        where: { id: dataId },
      });
      if (data) {
        await this.CommentRepository.delete(data.id);
      }

      return res.status(200).json({ message: 'xóa bình luận thành công' });
    } catch (error) {
      return res.status(500).json({ message: 'Internal Server Error' });
    }
  }
}
