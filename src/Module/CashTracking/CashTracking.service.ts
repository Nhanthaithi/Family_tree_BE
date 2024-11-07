import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Between, Repository } from 'typeorm';
import { Cashtracking } from './DB/CashTracking.entity';
import {
  CashTrackingType,
  CashTrackingTypegetAll,
} from './DTO/CashTracking.DTO';
import { Response } from 'express';

@Injectable()
export class CashTrackingService {
  constructor(
    @InjectRepository(Cashtracking)
    private CashTrackingRepository: Repository<Cashtracking>,
  ) {}

  async getAllCashTracking(startDate: string, endDate: string, res: Response) {
    try {
      if (startDate && endDate) {
        const currentYear = startDate.split('-')[0];

        //========================================================================> Truy vấn để lấy danh sách các bản ghi
        const records = await this.CashTrackingRepository.createQueryBuilder(
          'Cashtracking',
        )
          .where('Cashtracking.dayCash BETWEEN :startDate AND :endDate', {
            startDate: startDate,
            endDate: endDate,
          })
          .orderBy('Cashtracking.dayCash', 'DESC')
          .getMany();

        //==========================================================================> Truy vấn để tính tổng tiền thu và tiền chi theo lọc
        const totalsFilter =
          await this.CashTrackingRepository.createQueryBuilder('Cashtracking')
            .select([
              'SUM(CASE WHEN Cashtracking.selectCash = 1 THEN Cashtracking.money ELSE 0 END) AS totalIncome',
              'SUM(CASE WHEN Cashtracking.selectCash = 2 THEN Cashtracking.money ELSE 0 END) AS totalExpense',
            ])
            .where('Cashtracking.dayCash BETWEEN :startDate AND :endDate', {
              startDate: startDate,
              endDate: endDate,
            })
            .getRawOne();

        //==========================================================================> Truy vấn để tính tổng tiền thu và tiền chi
        const totals = await this.CashTrackingRepository.createQueryBuilder(
          'Cashtracking',
        )
          .select([
            'SUM(CASE WHEN Cashtracking.selectCash = 1 THEN Cashtracking.money ELSE 0 END) AS totalIncome',
            'SUM(CASE WHEN Cashtracking.selectCash = 2 THEN Cashtracking.money ELSE 0 END) AS totalExpense',
          ])
          .where('YEAR(Cashtracking.dayCash) = :year', { year: currentYear })
          .getRawOne();

        //========================================================================> Truy vấn để tính tổng tiền thu và tiền chi cho tất cả các năm
        const totalResult =
          await this.CashTrackingRepository.createQueryBuilder('Cashtracking')
            .select([
              'SUM(CASE WHEN Cashtracking.selectCash = 1 THEN Cashtracking.money ELSE 0 END) AS totalIncome',
              'SUM(CASE WHEN Cashtracking.selectCash = 2 THEN Cashtracking.money ELSE 0 END) AS totalExpense',
            ])
            .getRawOne();

        const totalIncome = totalResult.totalIncome || 0;
        const totalExpense = totalResult.totalExpense || 0;

        const actualBalance = totalIncome - totalExpense;
        return res.status(200).json({
          currentYear,
          startDate,
          endDate,
          totalsFilter,
          records,
          totalIncome: totals.totalIncome,
          totalExpense: totals.totalExpense,
          actualBalance: actualBalance,
          message: 'Lấy dữ liệu thành công',
        });
      } else {
        const currentYear = new Date().getFullYear();

        //========================================================================> Truy vấn để lấy danh sách các bản ghi
        const records = await this.CashTrackingRepository.createQueryBuilder(
          'Cashtracking',
        )
          .where('YEAR(Cashtracking.dayCash) = :year', { year: currentYear })
          .orderBy('Cashtracking.dayCash', 'DESC')
          .getMany();

        //==========================================================================> Truy vấn để tính tổng tiền thu và tiền chi
        const totals = await this.CashTrackingRepository.createQueryBuilder(
          'Cashtracking',
        )
          .select([
            'SUM(CASE WHEN Cashtracking.selectCash = 1 THEN Cashtracking.money ELSE 0 END) AS totalIncome',
            'SUM(CASE WHEN Cashtracking.selectCash = 2 THEN Cashtracking.money ELSE 0 END) AS totalExpense',
          ])
          .where('YEAR(Cashtracking.dayCash) = :year', { year: currentYear })
          .getRawOne();

        //========================================================================> Truy vấn để tính tổng tiền thu và tiền chi cho tất cả các năm
        const totalResult =
          await this.CashTrackingRepository.createQueryBuilder('Cashtracking')
            .select([
              'SUM(CASE WHEN Cashtracking.selectCash = 1 THEN Cashtracking.money ELSE 0 END) AS totalIncome',
              'SUM(CASE WHEN Cashtracking.selectCash = 2 THEN Cashtracking.money ELSE 0 END) AS totalExpense',
            ])
            .getRawOne();

        const totalIncome = totalResult.totalIncome || 0;
        const totalExpense = totalResult.totalExpense || 0;

        const actualBalance = totalIncome - totalExpense;
        return res.status(200).json({
          currentYear,
          records,
          totalIncome: totals.totalIncome,
          totalExpense: totals.totalExpense,
          actualBalance: actualBalance,
          message: 'Lấy dữ liệu thành công',
        });
      }
    } catch (error) {
      res.status(500).json({ message: 'Internal Server Error' });
    }
  }

  // ==================================================================> post sổ quỹ
  async postCashTracking(data: CashTrackingType, res: Response) {
    try {
      this.CashTrackingRepository.create(data);
      const savedGenealogyTree = await this.CashTrackingRepository.save(data);
      if (savedGenealogyTree) {
        res.status(200).json({ message: 'Lưu dữ liệu thành công' });
      } else {
        res.status(404).json({ message: 'Lưu dữ liệu thất bại' });
      }
    } catch (error) {
      res.status(500).json({ message: 'Internal Server Error' });
    }
  }

  // ==================================================================> delete sổ quỹ
  async deleteCashTracking(id: number, res: Response) {
    try {
      const data = await this.CashTrackingRepository.findOne({
        where: { id: id },
      });
      await this.CashTrackingRepository.delete(data);
      return res.status(200).json({ message: 'Xóa dữ liệu thành công' });
    } catch (error) {
      res.status(500).json({ message: 'Internal Server Error' });
    }
  }

  // ==================================================================> sửa sổ quỹ
  async patchCashTracking(body: CashTrackingType, res: Response) {
    const id = body.id;
    try {
      await this.CashTrackingRepository.update(
        { id: id },
        {
          dayCash: body.dayCash,
          money: body.money,
          description: body.description,
          selectCash: body.selectCash,
        },
      );
      return res.status(200).json({ message: 'Sửa dữ liệu thành công' });
    } catch (error) {
      res.status(500).json({ message: 'Internal Server Error' });
    }
  }
}
