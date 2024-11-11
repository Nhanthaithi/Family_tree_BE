import {
  Entity,
  PrimaryGeneratedColumn,
  ManyToOne,
  CreateDateColumn,
  Column,
} from 'typeorm';
import { Users } from 'src/Module/Users/DB/Users.entity';
import { PostArticle } from 'src/Module/Members/DB/Members.entity';

@Entity()
export class Like {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  IdUser: number;

  @CreateDateColumn()
  createdAt: Date;

  @ManyToOne(() => Users, (user) => user.likes)
  user: Users;

  @ManyToOne(() => PostArticle, (post) => post.likes, {
    onDelete: 'CASCADE',
  })
  post: PostArticle;
}
