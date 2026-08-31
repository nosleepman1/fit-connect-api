import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  UseInterceptors,
  UploadedFile,
  UseGuards,
} from '@nestjs/common';
import { PostImageService } from './post-image.service';
import { CreatePostImageDto } from './dto/create-post-image.dto';
import { UpdatePostImageDto } from './dto/update-post-image.dto';
import { FileInterceptor } from '@nestjs/platform-express';
import { JwtAuthGuard } from 'src/domains/identity/strategy/jwt-auth.guard';
import { CurrentUser } from 'src/infrastructure/decorators/current-user.decorator';

@Controller('post-image')
export class PostImageController {
  constructor(private readonly postImageService: PostImageService) { }

  @Post()
  @UseGuards(JwtAuthGuard)
  @UseInterceptors(FileInterceptor('file'))
  create(
    @CurrentUser('sub') userId: string,
    @Body('postId') postId: string,
    @UploadedFile() file: Express.Multer.File) {
    return this.postImageService.uploadFile(userId, postId, file);
  }

  @Get()
  findAll() {
    return this.postImageService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.postImageService.findOne(+id);
  }

  @Patch(':id')
  update(
    @Param('id') id: string,
    @Body() updatePostImageDto: UpdatePostImageDto,
  ) {
    return this.postImageService.update(+id, updatePostImageDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.postImageService.remove(+id);
  }
}
