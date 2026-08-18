import { Module } from '@nestjs/common';
import { PostService } from './post.service';
import { PostController } from './post.controller';
import { POST_TOKEN } from './contracts/tokens';
import { PostRepository } from './Repositories/Post.repository';

@Module({
  controllers: [PostController],
  providers: [
    PostService,
    {
      provide: POST_TOKEN,
      useClass: PostRepository,
    },
  ],
})
export class PostModule {}
