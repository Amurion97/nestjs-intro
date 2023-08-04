import {
    Controller,
    Get,
    Post,
    Body,
    Patch,
    Param,
    Delete,
    Query,
    ParseIntPipe,
    DefaultValuePipe, ValidationPipe
} from '@nestjs/common';
import {SongsService} from './songs.service';
import {CreateSongDto} from './dto/create-song.dto';
import {UpdateSongDto} from './dto/update-song.dto';
import {Public} from "../auth/decorators/public.decorator";
import {User} from "../common/decorators/user.decorator";

@Controller('songs')
export class SongsController {
    constructor(private readonly songsService: SongsService) {
    }

    @Post()
    create(@Body(new ValidationPipe()) createSongDto: CreateSongDto,
           @User('sub') userId: string) {
        console.log("SongsController - create - createSongDto:", createSongDto);
        console.log("SongsController - create - userId:", userId)
        return this.songsService.create(createSongDto);
    }

    @Public()
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
