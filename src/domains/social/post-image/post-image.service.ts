import { Inject, Injectable } from '@nestjs/common';
import { CreatePostImageDto } from './dto/create-post-image.dto';
import { UpdatePostImageDto } from './dto/update-post-image.dto';
import * as fs from "fs"
import { POST_IMAGE_TOKEN } from './contracts/token';
import { PostImageRepository } from './repository/post-image.repository';
import { randomUUID } from 'bullmq';

@Injectable()
export class PostImageService {
  constructor(
    @Inject(POST_IMAGE_TOKEN)
    private readonly postImageRepository: PostImageRepository
  ) { }

  async uploadFile(userId: string, postId: string, file: Express.Multer.File) {

    const path = await this.save(file, "posts");

    return this.postImageRepository.createPostImage(userId, postId, path)

  }

  async save(file: Express.Multer.File, purpose: string): Promise<string> {
    const dir = "./src/public/images"

    if (!fs.existsSync(dir)) fs.mkdirSync(dir, { recursive: true });

    const fileName = Date.now() + "_" + purpose +
      randomUUID() + '.' +
      file.originalname
        .split('.')
        .pop()

    const filePath = `${dir}/${fileName}`
    await fs.promises.writeFile(filePath, file.buffer)
    return filePath
  }

  create(createPostImageDto: CreatePostImageDto) {
    return 'This action adds a new postImage';
  }

  findAll() {
    return `This action returns all postImage`;
  }

  findOne(id: number) {
    return `This action returns a #${id} postImage`;
  }

  update(id: number, updatePostImageDto: UpdatePostImageDto) {
    return `This action updates a #${id} postImage`;
  }

  remove(id: number) {
    return `This action removes a #${id} postImage`;
  }
}
