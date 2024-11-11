import { Comment } from 'src/Module/Comments/DB/Comment.entity';
import { GenealogyTree } from 'src/Module/GenealogyTree/DB/GenealogyTree.entity';
import { Like } from 'src/Module/Like/DB/Like.entity';
import { PostArticle } from 'src/Module/Members/DB/Members.entity';
import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  ManyToOne,
  CreateDateColumn,
  UpdateDateColumn,
  OneToMany,
} from 'typeorm';

@Entity()
export class Users {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ nullable: true })
  imgavatar: string;

  @Column({ nullable: false })
  fullname: string;

  @Column({ nullable: false })
  email: string;

  @Column({ nullable: false })
  password: string;

  @Column({ default: 1 })
  role: number;

  @Column({ nullable: false })
  phoneNumber: string;

  @Column({ nullable: true })
  Genealogy_id: number;

  @OneToMany(() => PostArticle, (post) => post.user)
  posts: PostArticle[];

  @OneToMany(() => Comment, (comment) => comment.user)
  comments: Comment[];

  @OneToMany(() => Like, (like) => like.user)
  likes: Like[];

  @CreateDateColumn()
  createdAt: Date;

  @UpdateDateColumn()
  updatedAt: Date;

  @ManyToOne(() => GenealogyTree, (genealogyTree: any) => genealogyTree.users)
  genealogyTree: GenealogyTree;
}
