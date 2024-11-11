import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Like } from './DB/Like.entity';
import { TypeLike } from './DTO/Like.DTO';
import { Response } from 'express';

@Injectable()
export class LikeService {
  constructor(
    @InjectRepository(Like)
    private LikeRepository: Repository<Like>,
  ) {}

  // ==================================================================>  post like
  async postLike(data: TypeLike, res: Response) {
    data.userId = Number(data.userId);
    data.postId = Number(data.postId);

    try {
      const newLike = this.LikeRepository.create({
        ...data,
        user: { id: data.userId },
        IdUser: data.userId,
        post: { id: data.postId },
      });
      await this.LikeRepository.save(newLike);
      return res.status(200).json({ message: 'post like thành công' });
    } catch (error) {
      return res.status(500).json({ message: 'Internal Server Error' });
    }
  }

  // ==================================================================>  delete like
  async deleteLike(id: number, res: Response) {
    const dataId = Number(id);

    try {
      const data = await this.LikeRepository.findOne({
        where: { id: dataId },
      });
      if (data) {
        await this.LikeRepository.delete(data.id);
      }

      return res.status(200).json({ message: 'xóa like thành công' });
    } catch (error) {
      return res.status(500).json({ message: 'Internal Server Error' });
    }
  }
}
