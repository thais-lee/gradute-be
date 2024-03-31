import { ECommentLike } from 'src/common/enums/comment.enum';
import { FullAuditedEntity } from 'src/entities/full-audited.entity';
import { User } from 'src/entities/user.entity';
import { Column, Entity, ManyToOne, PrimaryGeneratedColumn } from 'typeorm';

import { Comment } from './comment.entity';

@Entity('commentLikes')
export class CommentLike extends FullAuditedEntity {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ type: 'int', nullable: false, default: ECommentLike.LIKE })
  content: number;

  //owner
  @ManyToOne(() => User, (user) => user.posts)
  user: User;

  @Column({ type: 'int', nullable: false })
  userId: number;

  //comment
  @ManyToOne(() => Comment, (comment) => comment.likes)
  comment: Comment;

  @Column({ type: 'int', nullable: false })
  commentId: number;
}
