import { GenealogyTree } from 'src/Module/GenealogyTree/DB/GenealogyTree.entity';
import { Entity, PrimaryGeneratedColumn, Column, ManyToOne } from 'typeorm';

@Entity()
export class Cashtracking {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ nullable: false })
  dayCash: Date;

  @Column({ type: 'decimal', precision: 12, scale: 2, nullable: false })
  money: number;

  @Column({ nullable: false })
  selectCash: number;

  @Column({ type: 'text', nullable: false })
  description: string;

  @ManyToOne(() => GenealogyTree, (genealogyTree) => genealogyTree.cashtracking)
  genealogyTree: GenealogyTree;
}
