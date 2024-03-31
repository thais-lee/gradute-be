import { ECommentStatus, ECommentType } from 'src/common/enums/comment.enum';
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
import { Post } from './post.entity';

@Entity('comments')
export class Comment extends FullAuditedEntity {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ type: 'text', nullable: false })
  content: string;

  @Column({ type: 'text', nullable: true })
  imageUrl: string;

  @Column({ type: 'int', default: ECommentStatus.NEW })
  status: ECommentStatus;

  @Column({ type: 'int', default: ECommentType.COMMENT })
  type: ECommentType;

  @OneToMany(() => CommentLike, (comment) => comment.commentId)
  likes: CommentLike[];

  //parent
  @Column({ type: 'int', nullable: true })
  parentId: number;

  @OneToMany(() => Comment, (comment) => comment.parentId)
  comments: Comment[];

  //owner
  @ManyToOne(() => User, (user) => user.posts)
  user: User;

  @Column({ type: 'int', nullable: false })
  userId: number;

  //post
  @ManyToOne(() => Post, (post) => post.comments)
  post: Post;

  @Column({ type: 'int', nullable: false })
  postId: number;
}
