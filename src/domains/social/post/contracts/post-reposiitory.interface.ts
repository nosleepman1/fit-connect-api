import { CreatePostDto } from '../dto/create-post.dto';
import { PostEntity } from '../entities/post.entity';
import { UpdatePostDto } from '../dto/update-post.dto';

export interface PostReposiitoryInterface {
  createPost(userId: string, createPostDto: CreatePostDto): Promise<PostEntity>;

  getMyPosts(userId: string): Promise<PostEntity[]>;

  getAllPosts(): Promise<PostEntity[]>;

  getPostById(id: string): Promise<PostEntity>;

  updatePost(userId: string, updatePostDto: UpdatePostDto): Promise<PostEntity>;

  deletePost(id: string): Promise<void>;
}