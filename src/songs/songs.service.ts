import { Injectable } from '@nestjs/common';
import { CreateSongDto } from './dto/create-song.dto';
import { UpdateSongDto } from './dto/update-song.dto';
import {SongInterface} from "./interfaces/song.interface";

@Injectable()
export class SongsService {
  private readonly songs: SongInterface[] = []
  create(createSongDto: CreateSongDto) {
    this.songs.push(createSongDto)
    return 'This action adds a new song';
  }

  findAll() {
    return this.songs;
  }

  findOne(id: number) {
    return `This action returns a #${id} song`;
  }

  update(id: number, updateSongDto: UpdateSongDto) {
    return `This action updates a #${id} song`;
  }

  remove(id: number) {
    return `This action removes a #${id} song`;
  }
}
