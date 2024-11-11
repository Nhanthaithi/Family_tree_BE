import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { MediaFile } from './DB/MediaFile.entity';

@Injectable()
export class MediaFileService {
  constructor(
    @InjectRepository(MediaFile)
    private MediaFileRepository: Repository<MediaFile>,
  ) {}
}
