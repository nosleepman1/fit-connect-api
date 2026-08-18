import { Injectable } from '@nestjs/common';
import { PostReposiitoryInterface } from '../contracts/post-reposiitory.interface';
import { CreatePostDto } from '../dto/create-post.dto';
import { UpdatePostDto } from '../dto/update-post.dto';
import { PostEntity } from '../entities/post.entity';
import { PrismaService } from '../../../../infrastructure/database/prisma/prisma.service';

@Injectable()
export class PostRepository implements PostReposiitoryInterface {
  constructor(private readonly prisma: PrismaService) {}

  createPost(
    userId: string,
    createPostDto: CreatePostDto,
  ): Promise<PostEntity> {
    return this.prisma.post.create({
      data: {
        ...createPostDto,
        user: {
          connect: {
            id: userId,
          },
        },
      },
    });
  }
  getMyPosts(): Promise<PostEntity[]> {
    throw new Error('Method not implemented.');
  }
  getAllPosts(): Promise<PostEntity[]> {
    throw new Error('Method not implemented.');
  }
  getPostById(id: string): Promise<PostEntity> {
    throw new Error('Method not implemented.');
  }
  updatePost(updatePostDto: UpdatePostDto): Promise<PostEntity> {
    throw new Error('Method not implemented.');
  }
  deletePost(id: string): Promise<void> {
    throw new Error('Method not implemented.');
  }
}