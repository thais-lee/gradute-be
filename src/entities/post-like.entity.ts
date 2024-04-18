import { ECommentLike } from 'src/common/enums/comment.enum';
import { FullAuditedEntity } from 'src/entities/full-audited.entity';
import { User } from 'src/entities/user.entity';
import { Column, Entity, ManyToOne, PrimaryGeneratedColumn } from 'typeorm';

import { Comment } from './comment.entity';
import { Post } from './post.entity';

@Entity('postLikes')
export class PostLike extends FullAuditedEntity {
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
  @ManyToOne(() => Post, (post) => post.likes)
  post: Comment;

  @Column({ type: 'int', nullable: false })
  postId: number;
}
