import { Controller } from '@nestjs/common';
import { MediaFileService } from './MediaFile.service';

@Controller('api/v1/MediaFile')
export class MediaFileController {
  constructor(public MediaFileService: MediaFileService) {}
}
