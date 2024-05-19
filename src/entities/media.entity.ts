import { Column, Entity, ManyToOne, PrimaryGeneratedColumn } from "typeorm";
import { CreatedById } from "./full-audited.entity";
import { User } from "./user.entity";

@Entity('medias')
export class Media extends CreatedById {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ type: 'text', nullable: false })
  fileUrl: string;

  @ManyToOne(() => User, (user) => user.posts)
  user: User;

  @Column({ type: 'int', nullable: false })
  userId: number;
}
