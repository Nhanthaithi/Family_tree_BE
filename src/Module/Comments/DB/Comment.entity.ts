import { PostArticle } from 'src/Module/Members/DB/Members.entity';
import { Users } from 'src/Module/Users/DB/Users.entity';
import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  ManyToOne,
  CreateDateColumn,
} from 'typeorm';

@Entity()
export class Comment {
  @PrimaryGeneratedColumn()
  id: number;

  @Column('text')
  content: string;

  @CreateDateColumn()
  createdAt: Date;

  @ManyToOne(() => Users, (user) => user.comments)
  user: Users;

  @ManyToOne(() => PostArticle, (post) => post.comments, {
    onDelete: 'CASCADE',
  })
  post: PostArticle;
}
