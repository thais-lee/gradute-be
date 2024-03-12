import { ApiHideProperty } from '@nestjs/swagger';
import { IsOptional } from 'class-validator';
import {
  BaseEntity,
  Column,
  CreateDateColumn,
  DeleteDateColumn,
  UpdateDateColumn,
} from 'typeorm';

export class FullAuditedEntity extends BaseEntity {
  @CreateDateColumn()
  createdAt: Date;

  @Column({ type: 'int', nullable: true })
  createdById?: number;

  @UpdateDateColumn()
  updatedAt?: Date;

  @Column({ type: 'int', nullable: true })
  updatedById?: number;

  @DeleteDateColumn()
  deletedAt?: Date;

  @Column({ type: 'int', nullable: true })
  deletedById?: number;
}

export class CreatedById {
  @ApiHideProperty()
  @IsOptional()
  @Column({ type: 'int', nullable: true })
  createdById?: number;
}
