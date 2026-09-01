import { Module } from '@nestjs/common';
import { PostImageService } from './post-image.service';
import { PostImageController } from './post-image.controller';
import { POST_IMAGE_TOKEN } from './contracts/token';
import { PostImageRepository } from './repository/post-image.repository';
import { StorageModule } from 'src/infrastructure/storage/storage.module';
import { PostImageListerner } from './listenners/post-image.listerner';
import { BullModule } from '@nestjs/bullmq';
import { ImageUploadProcessor } from './processors/image-upload.processor';

@Module({
  controllers: [PostImageController],
  providers: [
    {
      provide: POST_IMAGE_TOKEN,
      useClass: PostImageRepository,
    },
    PostImageService,
    PostImageListerner,
    ImageUploadProcessor,
  ],
  imports: [
    StorageModule,
    BullModule.registerQueue({
      name: 'upload-post-image',

    })
  ],

})
export class PostImageModule { }
