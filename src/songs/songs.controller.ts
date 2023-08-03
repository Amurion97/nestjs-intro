import {
    Controller,
    Get,
    Post,
    Body,
    Patch,
    Param,
    Delete,
    Req,
    HttpCode,
    Query,
    ParseIntPipe,
    DefaultValuePipe, ValidationPipe
} from '@nestjs/common';
import {SongsService} from './songs.service';
import {CreateSongDto} from './dto/create-song.dto';
import {UpdateSongDto} from './dto/update-song.dto';
import {Request} from "express";
// import {ValidationPipe} from "../common/pipes/validation.pipe";

@Controller('songs')
export class SongsController {
    constructor(private readonly songsService: SongsService) {
    }

    @Post()
    create(@Body(new ValidationPipe()) createSongDto: CreateSongDto) {
        console.log("createSongDto:", createSongDto)
        return this.songsService.create(createSongDto);
    }

    @Get()
    findAll(
        @Query('sortOrder', new DefaultValuePipe('ASC')) sortOrder: string,
        @Query('sortKey', new DefaultValuePipe(0)) sortKey: number) {
        console.log(sortOrder, sortKey)
        return this.songsService.findAll();
    }

    @Get(':id')
    findOne(
        @Param('id', ParseIntPipe) id: number
    ) {
        // throw "incorrect id"
        return this.songsService.findOne(id);
    }

    @Patch(':id')
    update(@Param('id') id: string, @Body() updateSongDto: UpdateSongDto) {
        return this.songsService.update(+id, updateSongDto);
    }

    @Delete(':id')
    remove(@Param('id') id: string) {
        return this.songsService.remove(+id);
    }
}
