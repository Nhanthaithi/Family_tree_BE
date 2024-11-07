import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { SpecificationsEdge } from './DB/SpecificationsEdge.entity';
import {
  postEdgeType,
  SpecificationsEdgeType,
} from './DTO/SpecificationsEdge.DTO';
import { Response } from 'express';

@Injectable()
export class SpecificationsEdgeService {
  constructor(
    @InjectRepository(SpecificationsEdge)
    private SpecificationsEdgeRepository: Repository<SpecificationsEdge>,
  ) {}

  //===================================================================================> POST all edges
  async postAllSpecificationsEdge(
    data: SpecificationsEdgeType[],
    res: Response,
  ) {
    try {
      this.SpecificationsEdgeRepository.create(data);
      await this.SpecificationsEdgeRepository.save(data);
      return res.status(200).json({ message: 'Lưu dữ liệu thành công' });
    } catch (error) {
      return res.status(500).json({ message: 'Server Error' });
    }
  }

  //===================================================================================> delete edge
  async deleteEdge(id: string, res: Response) {
    try {
      const findEdge = await this.SpecificationsEdgeRepository.findOne({
        where: { id_edge: id },
      });
      await this.SpecificationsEdgeRepository.delete(findEdge);
      return res.status(200).json({ message: 'Xóa dữ liệu thành công' });
    } catch (error) {
      return res.status(500).json({ message: 'Server Error' });
    }
  }

  //===================================================================================> post edge
  async postEdge(data: postEdgeType, res: Response) {
    const edgeId = data.id_edge;
    try {
      const findEdge = await this.SpecificationsEdgeRepository.findOne({
        where: { id_edge: edgeId },
      });
      if (!findEdge) {
        const newEdge = this.SpecificationsEdgeRepository.create(data);
        await this.SpecificationsEdgeRepository.save(newEdge);
        return res.status(200).json({ message: 'Lưu dữ liệu thành công' });
      }
    } catch (error) {
      return res.status(500).json({ message: 'Server Error' });
    }
  }
}
