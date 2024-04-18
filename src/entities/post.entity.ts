import { EPostPrivacy, EPostStatus } from 'src/common/enums/post.enum';
import { FullAuditedEntity } from 'src/entities/full-audited.entity';
import { User } from 'src/entities/user.entity';
import {
  Column,
  Entity,
  ManyToOne,
  OneToMany,
  PrimaryGeneratedColumn,
} from 'typeorm';

import { CommentLike } from './comment-like.entity';
import { Comment } from './comment.entity';
import { PostLike } from './post-like.entity';

@Entity('posts')
export class Post extends FullAuditedEntity {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ type: 'text', nullable: false })
  title: string;

  @Column({ type: 'text', nullable: false })
  content: string;

  @Column({ type: 'text', array: true, nullable: true })
  imageUrls: string[];

  @Column({ type: 'int', default: EPostStatus.NEW })
  status: EPostStatus;

  @Column({ type: 'int', default: EPostPrivacy.PUBLIC })
  privacy: EPostPrivacy;

  @ManyToOne(() => User, (user) => user.posts)
  user: User;

  @Column({ type: 'int', nullable: false })
  userId: number;

  @OneToMany(() => Comment, (comment) => comment.post)
  comments: Comment[];

  @OneToMany(() => PostLike, (commentLike) => commentLike.post)
  likes: PostLike[];
}
