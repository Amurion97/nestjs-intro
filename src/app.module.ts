import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { TextModule } from './text/text.module';
import { SongsModule } from './songs/songs.module';
import { UsersModule } from './users/users.module';

@Module({
  imports: [TextModule, SongsModule, UsersModule],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
