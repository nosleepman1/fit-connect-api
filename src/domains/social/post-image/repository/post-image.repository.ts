import { PrismaService } from '../../../../infrastructure/database/prisma/prisma.service';
import { PostImageInterface } from '../contracts/post-image.interface';
import { PostImageEntity } from '../entities/post-image.entity';


export class PostImageRepository implements PostImageInterface {

    constructor(private readonly prisma: PrismaService) { }

    async createPostImage(userId: string, postId: string, imageUrl: string): Promise<void> {
        await this.prisma.postImage.create({
            data: {
                path: imageUrl,
                post: {
                    connect: {
                        id: postId,
                    },
                },
            }
        })
    }


    getPostImagesByPostId(postId: string): Promise<PostImageEntity[]> {
        return this.prisma.postImage.findMany({
            where: {
                postId,
            },
        });
    }


    getPostImagesByUserId(userId: string): Promise<PostImageEntity[]> {
        return this.prisma.postImage.findMany({
            where: {
                userId: userId,
            },
        });
    }


    async deletePostImage(postImageId: string): Promise<void> {

        await this.prisma.postImage.delete({
            where: {
                id: postImageId,
            },
        });
    }

}