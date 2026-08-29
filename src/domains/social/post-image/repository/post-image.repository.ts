import { PrismaService } from '../../../../infrastructure/database/prisma/prisma.service';
import { PostImageInterface } from '../contracts/post-image.interface';
import { PostImageEntity } from '../entities/post-image.entity';

export class PostImageRepository implements PostImageInterface {
  constructor(private readonly prisma: PrismaService) {}

  async createPostImage(
    userId: string,
    postId: string,
    imageUrl: string,
  ): Promise<void> {
    await this.prisma.postImage.create({
      data: {
        path: imageUrl,
        post: {
          connect: {
            id: postId,
          },
        },
      },
    });
  }

  async getPostImagesByPostId(postId: string): Promise<PostImageEntity[]> {
    const images = await this.prisma.postImage.findMany({
      where: {
        postId,
      },
      include: {
        post: true,
      },
    });

    return images.map((img) => ({
      id: img.id,
      postId: img.postId,
      userId: img.post.userId,
      imageUrl: img.path,
    }));
  }

  async getPostImagesByUserId(userId: string): Promise<PostImageEntity[]> {
    const images = await this.prisma.postImage.findMany({
      where: {
        post: {
          userId,
        },
      },
      include: {
        post: true,
      },
    });

    return images.map((img) => ({
      id: img.id,
      postId: img.postId,
      userId: img.post.userId,
      imageUrl: img.path,
    }));
  }

  async deletePostImage(postImageId: string): Promise<void> {
    await this.prisma.postImage.delete({
      where: {
        id: postImageId,
      },
    });
  }
}
