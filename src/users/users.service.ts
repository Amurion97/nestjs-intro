import * as bcrypt from 'bcrypt';

import {Inject, Injectable} from '@nestjs/common';
import {CreateUserDto} from './dto/create-user.dto';
import {UpdateUserDto} from './dto/update-user.dto';
import {Repository} from "typeorm";
import {User} from "./entities/user.entity";
import {GetUsersDto} from "./dto/get-users.dto";
import {RoleEnum} from "../roles/constants";

@Injectable()
export class UsersService {
    private hashRounds = 10;

    constructor(
        @Inject('USER_REPOSITORY')
        private userRepository: Repository<User>,
    ) {

    }

    async createUser(createUserDto: CreateUserDto) {
        let hashedPassword = await bcrypt.hash(createUserDto.password, this.hashRounds);
        createUserDto.password = hashedPassword;
        createUserDto['role'] = RoleEnum.User;
        await this.userRepository.save(createUserDto);
        return "User created successfully"
    }

    async createAdmin(createUserDto: CreateUserDto) {
        let hashedPassword = await bcrypt.hash(createUserDto.password, this.hashRounds);
        createUserDto.password = hashedPassword;
        createUserDto['role'] = RoleEnum.Admin;
        await this.userRepository.save(createUserDto);
        return "Admin created successfully"
    }

    async checkUsedEmail(email: string) {
        let user = await this.userRepository.findOneBy({
            email: email,
        });
        return !!(user);
    }

    async checkUsedUsername(username: string) {
        let user = await this.userRepository.findOneBy({
            username: username,
        });
        return !!(user);
    }

    async findAll(query: GetUsersDto) {
        return await this.userRepository.find();
    }

    async findOneById(id: number) {
        return await this.userRepository.findOne({
            where: {
                userId: id
            }
        });
    }

    async findOneByUsername(username: string) {
        return await this.userRepository.findOne({
            relations: {
                role: true
            },
            where: {
                username: username
            },
        })
    }

    async update(id: number, updateUserDto: UpdateUserDto) {
        return await this.userRepository.update({userId: id}, updateUserDto);
    }

    async remove(id: number) {
        return await this.userRepository.delete({userId: id});
    }
}
