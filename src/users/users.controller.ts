import {
    Controller,
    Get,
    Post,
    Body,
    Patch,
    Param,
    Delete,
    ValidationPipe,
    UsePipes,
    ParseIntPipe, Query
} from '@nestjs/common';
import {UsersService} from './users.service';
import {CreateUserDto} from './dto/create-user.dto';
import {UpdateUserDto} from './dto/update-user.dto';
import {Public} from "../auth/decorators/public.decorator";

@Controller('users')
export class UsersController {
    constructor(private readonly usersService: UsersService) {
    }

    @Public()
    @Post()
    @UsePipes()
    async create(
        @Body(new ValidationPipe(
            {
                whitelist: true,
                transform: true
            }
        )) createUserDto: CreateUserDto) {
        console.log("UsersController - create - createUserDto:", createUserDto)
        return await this.usersService.create(createUserDto);
    }

    @Get()
    async findAll(
        @Query('name') name: string
    ) {
        console.log("UsersController - findAll - name:", name)
        return await this.usersService.findAll({name});
    }

    @Get(':id')
    findOne(@Param('id', ParseIntPipe) id: number) {
        return this.usersService.findOneById(id);
    }

    @Patch(':id')
    update(@Param('id') id: string, @Body() updateUserDto: UpdateUserDto) {
        return this.usersService.update(+id, updateUserDto);
    }

    @Delete(':id')
    remove(@Param('id') id: string) {
        return this.usersService.remove(+id);
    }
}
