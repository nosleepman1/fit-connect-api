import { Injectable } from '@nestjs/common';
import { PostReposiitoryInterface } from '../contracts/post-reposiitory.interface';
import { CreatePostDto } from '../dto/create-post.dto';
import { UpdatePostDto } from '../dto/update-post.dto';
import { PostEntity } from '../entities/post.entity';
import { PrismaService } from '../../../../infrastructure/database/prisma/prisma.service';
import { NotFoundException } from '@nestjs/common';
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

  
  getMyPosts(userId: string): Promise<PostEntity[]> {
    return this.prisma.post.findMany({
      where: {
        userId: userId,
      },
      
    });
  }


  getAllPosts(): Promise<PostEntity[]> {
    //using pagination per 20 for all posts
    return this.prisma.post.findMany({
      take: 20,
      orderBy: {  
        createdAt: 'desc',
      },
    });
  }


  async getPostById(id: string): Promise<PostEntity> {
    const post = await this.prisma.post.findUnique({
      where: {
        id: id,
      },
      select: {
        id: true,
        title: true,
        description: true,
        createdAt: true,
        updatedAt: true,
        userId: true,
      },
    });

    if (!post) {
      throw new NotFoundException('Post not found');
    }

    return post;
  }


  updatePost(userId: string, updatePostDto: UpdatePostDto): Promise<PostEntity> {
    return this.prisma.post.update({
      where: {
        id: (updatePostDto as UpdatePostDto & { id: PostEntity['id'] }).id,
        userId: userId,
      },
      data: updatePostDto,
    });
  }


  async deletePost(id: string): Promise<void> {
    await  this.prisma.post.delete({
      where: {
        id: id,
      },
    })
  }
}