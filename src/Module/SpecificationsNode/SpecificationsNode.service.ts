import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { SpecificationsNode } from './DB/SpecificationsNode.entity';
import { SpecificationsNodeType } from './DTO/SpecificationsNode.DTO';
import { Response } from 'express';
import { SpecificationsEdge } from '../SpecificationsEdge/DB/SpecificationsEdge.entity';

@Injectable()
export class SpecificationsNodeService {
  constructor(
    @InjectRepository(SpecificationsNode)
    private SpecificationsNodeRepository: Repository<SpecificationsNode>,

    @InjectRepository(SpecificationsEdge)
    private edgeRepository: Repository<SpecificationsEdge>,
  ) {}

  //===================================================================================> POST all node
  async postAllSpecificationsNode(
    data: SpecificationsNodeType[],
    res: Response,
  ) {
    try {
      this.SpecificationsNodeRepository.create(data);
      await this.SpecificationsNodeRepository.save(data);
      return res.status(200).json({ message: 'Lưu dữ liệu thành công' });
    } catch (error) {
      return res.status(500).json({ message: 'Server Error' });
    }
  }

  //===================================================================================> cập nhật vị trí node
  async updatePositionNode(data: SpecificationsNodeType[], res: Response) {
    try {
      data.forEach(async (node) => {
        await this.SpecificationsNodeRepository.update(
          { id_node: node.id_node },
          { positionX: node.positionX, positionY: node.positionY },
        );
      });
      return res.status(200).json({ message: 'Lưu dữ liệu thành công' });
    } catch (error) {
      return res.status(500).json({ message: 'Server Error' });
    }
  }

  //===================================================================================> xóa node
  async deleteNode(id: string, res: Response) {
    try {
      const relatedEdges = await this.edgeRepository.find({
        where: [{ source_edge: id }, { target_edge: id }],
      });

      await this.edgeRepository.remove(relatedEdges);

      await this.SpecificationsNodeRepository.delete({ id_node: id });

      return res.status(200).json({ message: 'xóa dữ liệu thành công' });
    } catch (error) {
      return res.status(500).json({ message: 'Server Error' });
    }
  }

  //===================================================================================> get về sửa node
  async editNode(id: string, res: Response) {
    try {
      const data = await this.SpecificationsNodeRepository.findOne({
        where: { id_node: id },
      });
      return res.status(200).json({ data, message: 'lấy dữ liệu thành công' });
    } catch (error) {
      return res.status(500).json({ message: 'Server Error' });
    }
  }

  //===================================================================================> update nội dung node
  async UpdateNode(id: string, body: SpecificationsNodeType, res: Response) {
    try {
      await this.SpecificationsNodeRepository.update(
        { id_node: id },
        {
          name_node: body.name_node,
          day_node: body.day_node,
          nameWife_node: body.nameWife_node,
        },
      );

      return res.status(200).json({ message: 'sửa dữ liệu thành công' });
    } catch (error) {
      return res.status(500).json({ message: 'Server Error' });
    }
  }
}
