import * as bcrypt from 'bcrypt';
import {bcryptConstants} from "../auth/constants";

import {Inject, Injectable} from '@nestjs/common';
import {CreateUserDto} from './dto/create-user.dto';
import {UpdateUserDto} from './dto/update-user.dto';
import {Repository} from "typeorm";
import {User} from "./entities/user.entity";
import {GetUsersDto} from "./dto/get-users.dto";


@Injectable()
export class UsersService {
    private hashRounds = bcryptConstants.rounds;
    constructor(
        @Inject('USER_REPOSITORY')
        private userRepository: Repository<User>,
    ) {

    }

    async create(createUserDto: CreateUserDto) {
        if (await this.checkUsedEmail(createUserDto.email)) {
            return "Email used"
        }
        let hashedPassword = await bcrypt.hash(createUserDto.password, this.hashRounds);
        createUserDto.password = hashedPassword;
        await this.userRepository.save(createUserDto);
        return "User created successfully"
    }

    async checkUsedEmail(email: string) {
        let user = await this.userRepository.findOneBy({
            email: email,
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
        return await this.userRepository.findOneBy({
            username: username
        })
    }

    async update(id: number, updateUserDto: UpdateUserDto) {
        return await this.userRepository.update({userId: id}, updateUserDto);
    }

    async remove(id: number) {
        return await this.userRepository.delete({userId: id});
    }
}
