import { ERole } from 'src/common/enums/role.enum';
import { Column, Entity, OneToMany, PrimaryGeneratedColumn } from 'typeorm';

import { FullAuditedEntity } from './full-audited.entity';

@Entity('user')
export class User extends FullAuditedEntity {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ length: 100 })
  firstName: string;

  @Column({ length: 100 })
  lastName: string;

  @Column({ type: 'varchar', nullable: false })
  email: string;

  @Column({ type: 'varchar', nullable: false })
  username: string;

  @Column({ type: 'varchar', nullable: false, select: false })
  password: string;

  @Column({ type: 'varchar', nullable: true })
  phone: string;

  @Column({ type: 'varchar', nullable: true })
  avatar: string;

  @Column({ type: 'varchar', nullable: true })
  gender: string;

  @Column({ type: 'timestamp', nullable: true })
  birthday: Date;

  @Column({ type: 'int', nullable: false })
  role: ERole;
}
