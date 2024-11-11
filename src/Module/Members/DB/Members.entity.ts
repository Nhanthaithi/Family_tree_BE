import { Comment } from 'src/Module/Comments/DB/Comment.entity';
import { Like } from 'src/Module/Like/DB/Like.entity';
import { MediaFile } from 'src/Module/MediaFile/DB/MediaFile.entity';
import { Users } from 'src/Module/Users/DB/Users.entity';
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
export class PostArticle {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ nullable: true, type: 'text' })
  content: string;

  @CreateDateColumn()
  createdAt: Date;

  @UpdateDateColumn()
  updatedAt: Date;

  @ManyToOne(() => Users, (user) => user.posts)
  user: Users;

  @OneToMany(() => Comment, (comment) => comment.post)
  comments: Comment[];

  @OneToMany(() => Like, (like) => like.post)
  likes: Like[];

  @OneToMany(() => MediaFile, (mediaFile) => mediaFile.post, {
    cascade: true,
    onDelete: 'CASCADE',
  })
  mediaFiles: MediaFile[];
}
