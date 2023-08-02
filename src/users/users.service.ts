import {Inject, Injectable} from '@nestjs/common';
import {CreateUserDto} from './dto/create-user.dto';
import {UpdateUserDto} from './dto/update-user.dto';
import {Repository} from "typeorm";
import {User} from "./entities/user.entity";

@Injectable()
export class UsersService {
    constructor(
        @Inject('USER_REPOSITORY')
        private userRepository: Repository<User>,
    ) {
    }

    async create(createUserDto: CreateUserDto) {
        if (await this.checkUsedEmail(createUserDto.email)) {
            return "Email used"
        }
        await this.userRepository.save(createUserDto);
        return "User created successfully"
    }

    async checkUsedEmail(email: string) {
        let user = await this.userRepository.findOneBy({
            email: email,
        });
        return !!(user);
    }

    async findAll() {
        return await this.userRepository.find();
    }

    async findOne(id: number) {
        return await this.userRepository.findOne({
            where: {
                id: id
            }
        });
    }

    async update(id: number, updateUserDto: UpdateUserDto) {
        return await this.userRepository.update({id: id}, updateUserDto);
    }

    async remove(id: number) {
        return await this.userRepository.delete({id: id});
    }
}
