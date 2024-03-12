import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import {
  IPaginationOptions,
  Pagination,
  paginate,
} from 'nestjs-typeorm-paginate';
// import { ERole } from 'src/common/role.enum';
import { User } from 'src/entities/user.entity';
import { Repository } from 'typeorm';

import { CreateUserDto } from './dto/create-user.dto';
import { GetAllUserDto } from './dto/get-all-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';

@Injectable()
export class UserService {
  constructor(
    @InjectRepository(User) private readonly userRepository: Repository<User>,
  ) {}

  async findAll(
    userInfo: User,
    options: IPaginationOptions,
  ): Promise<Pagination<GetAllUserDto>> {
    // if (userInfo.role !== ERole.ADMIN) {
    //   throw new HttpException(
    //     {
    //       code: HttpStatus.FORBIDDEN,
    //       message: 'You are not allowed to access this resource',
    //     },
    //     HttpStatus.FORBIDDEN,
    //   );
    // }
    const qb = await this.userRepository
      .createQueryBuilder('user')
      .select([
        'user.id',
        'user.email',
        'user.firstName',
        'user.lastName',
        'user.username',
        'user.phone',
        'user.avatar',
        'user.gender',
        'user.birthday',
        'user.role',
        'user.createdAt',
      ])
      .orderBy('user.id', 'DESC');

    return paginate<GetAllUserDto>(qb, options);
  }

  async findOne(userInfo: User, id: number) {
    const user = this.userRepository
      .createQueryBuilder('user')
      .where('user.id = :id', { id })
      .select('user');

    const result = await user.getOne();

    if (!result) {
      throw new HttpException(
        {
          code: HttpStatus.NOT_FOUND,
          message: 'User not found',
        },
        HttpStatus.NOT_FOUND,
      );
    }

    // if (userInfo.role !== ERole.ADMIN && userInfo.id !== result.id) {
    //   throw new HttpException(
    //     {
    //       code: HttpStatus.FORBIDDEN,
    //       message: 'You are not allowed to access this resource',
    //     },
    //     HttpStatus.FORBIDDEN,
    //   );
    // }
    return result;
  }

  async findById(id: number) {
    const user = this.userRepository
      .createQueryBuilder('user')
      .where('user.id = :id', { id })
      .select('user');

    const result = await user.getOne();

    if (!result) {
      throw new HttpException(
        {
          code: HttpStatus.NOT_FOUND,
          message: 'User not found',
        },
        HttpStatus.NOT_FOUND,
      );
    }

    return result;
  }

  async findWithEmail(email: string, includePassword = false) {
    const qb = this.userRepository
      .createQueryBuilder('user')
      .where({ email })
      .select([
        'user.id',
        'user.email',
        'user.lastName',
        'user.firstName',
        'user.username',
        'user.phone',
        'user.avatar',
        'user.gender',
        'user.birthday',
        'user.role',
      ]);

    if (includePassword) {
      qb.addSelect('user.password');
    }

    return qb.getOne();
  }

  async create(createUser: CreateUserDto) {
    return this.userRepository.save(createUser);
  }

  async update(userInfo: User, id: number, updateUser: UpdateUserDto) {
    const user = await this.findById(id);

    // if (userInfo.role !== ERole.ADMIN && userInfo.id !== user.id) {
    //   throw new HttpException(
    //     {
    //       code: HttpStatus.FORBIDDEN,
    //       message: 'You are not allowed to access this resource',
    //     },
    //     HttpStatus.FORBIDDEN,
    //   );
    // }

    // if (userInfo.role !== ERole.ADMIN && updateUser.role) {
    //   throw new HttpException(
    //     {
    //       code: HttpStatus.FORBIDDEN,
    //       message: 'You are not allowed to access this resource',
    //     },
    //     HttpStatus.FORBIDDEN,
    //   );
    // }

    // if (updateUser.role && !Object.values(ERole).includes(updateUser.role)) {
    //   throw new HttpException(
    //     {
    //       code: HttpStatus.BAD_REQUEST,
    //       message: 'Role is not valid',
    //     },
    //     HttpStatus.BAD_REQUEST,
    //   );
    // }

    const result = await this.userRepository.update(id, updateUser);

    return !!result;
  }

  async remove(userInfo: User, id: number) {
    const user = await this.findById(id);
    const result = await this.userRepository.softDelete(user.id);

    // if (userInfo.role !== ERole.ADMIN) {
    //   throw new HttpException(
    //     {
    //       code: HttpStatus.FORBIDDEN,
    //       message: 'You are not allowed to access this resource',
    //     },
    //     HttpStatus.FORBIDDEN,
    //   );
    // }

    return !!result;
  }
}
