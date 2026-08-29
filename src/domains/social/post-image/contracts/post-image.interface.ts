import { PostImageEntity } from '../entities/post-image.entity';

export interface PostImageInterface {
  createPostImage(
    userId: string,
    postId: string,
    imageUrl: string,
  ): Promise<void>;

  getPostImagesByPostId(postId: string): Promise<PostImageEntity[]>;

  getPostImagesByUserId(userId: string): Promise<PostImageEntity[]>;

  deletePostImage(postImageId: string): Promise<void>;
}
