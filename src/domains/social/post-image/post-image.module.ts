import { Module } from '@nestjs/common';
import { PostImageService } from './post-image.service';
import { PostImageController } from './post-image.controller';
import { POST_IMAGE_TOKEN } from './contracts/token';
import { PostImageRepository } from './repository/post-image.repository';

@Module({
  controllers: [PostImageController],
  providers: [
    {
      provide: POST_IMAGE_TOKEN,
      useClass: PostImageRepository,
    },
    PostImageService,
  ],
})
export class PostImageModule { }
