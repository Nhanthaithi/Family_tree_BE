import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { MediaFile } from './DB/MediaFile.entity';
import { MediaFileController } from './MediaFile.controller';
import { MediaFileService } from './MediaFile.service';

@Module({
  imports: [TypeOrmModule.forFeature([MediaFile])],
  controllers: [MediaFileController],
  providers: [MediaFileService],
  exports: [MediaFileService, TypeOrmModule],
})
export class MediaFileModule {}
