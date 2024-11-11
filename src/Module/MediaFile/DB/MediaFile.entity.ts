import { PostArticle } from 'src/Module/Members/DB/Members.entity';
import { Entity, PrimaryGeneratedColumn, Column, ManyToOne } from 'typeorm';

@Entity()
export class MediaFile {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  type: string;

  @Column()
  url: string;

  @ManyToOne(() => PostArticle, (post) => post.mediaFiles, {
    onDelete: 'CASCADE',
  })
  post: PostArticle;
}
