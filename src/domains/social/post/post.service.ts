import { Inject, Injectable } from '@nestjs/common';
import { CreatePostDto } from './dto/create-post.dto';
import { UpdatePostDto } from './dto/update-post.dto';
import { PostReposiitoryInterface } from './contracts/post-reposiitory.interface';
import { POST_TOKEN } from './contracts/tokens';

@Injectable()
export class PostService {

  constructor(
    @Inject(POST_TOKEN)
    private readonly postRepository: PostReposiitoryInterface
  ) { }

  create(userId: string, createPostDto: CreatePostDto) {
    return this.postRepository.createPost(userId, createPostDto);
  }

  findAll(userId: string) {
    return this.postRepository.getAllPosts();
  }

  findOne(id: string) {
    return this.postRepository.getPostById(id);
  }

  update(id: string, updatePostDto: UpdatePostDto) {
    return this.postRepository.updatePost(id, updatePostDto);
  }

  remove(id: string) {
    return this.postRepository.deletePost(id);
  }
}
