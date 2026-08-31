import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  UseGuards,
} from '@nestjs/common';
import { PostService } from './post.service';
import { CreatePostDto } from './dto/create-post.dto';
import { UpdatePostDto } from './dto/update-post.dto';
import { CurrentUser } from 'src/infrastructure/decorators/current-user.decorator';
import { JwtAuthGuard } from 'src/domains/identity/strategy/jwt-auth.guard';

@Controller('post')
export class PostController {
  constructor(private readonly postService: PostService) { }

  @Post()
  @UseGuards(JwtAuthGuard)
  create(@CurrentUser('sub') userId: string, @Body() createPostDto: CreatePostDto) {
    return this.postService.create(userId, createPostDto);
  }

  @Get()
  @UseGuards(JwtAuthGuard)
  findAll(@CurrentUser('sub') userId: string) {
    return this.postService.findAll(userId);
  }

  @Get(':id')
  @UseGuards(JwtAuthGuard)
  findOne(@Param('id') id: string) {
    return this.postService.findOne(id);
  }

  @Patch(':id')
  @UseGuards(JwtAuthGuard)
  update(@Param('id') id: string, @Body() updatePostDto: UpdatePostDto) {
    return this.postService.update(id, updatePostDto);
  }

  @Delete(':id')
  @UseGuards(JwtAuthGuard)
  remove(@Param('id') id: string) {
    return this.postService.remove(id);
  }
}
