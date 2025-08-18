import { Injectable, NotFoundException } from '@nestjs/common';
import { CreatePostDto } from './dto/create-post.dto';
import { UpdatePostDto } from './dto/update-post.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Post } from './entities/post.entity';

@Injectable()
export class PostService {
  constructor(
    @InjectRepository(Post)
    private readonly postRepository: Repository<Post>,
  ) {}

  async create(createPostDto: CreatePostDto): Promise<Post> {
    const newPost = this.postRepository.create({
      title: createPostDto.title,
      content: createPostDto.content,
      authorName: createPostDto.authorName,
    });
    return this.postRepository.save(newPost);
  }

  // ✅ Get all Posts
  async findAll(): Promise<Post[]> {
    return this.postRepository.find();
  }

  // ✅ Get one Post by ID
  async findOne(id: number): Promise<Post> {
    const post = await this.postRepository.findOne({ where: { id } });

    if (!post) {
      throw new NotFoundException(`Post with ID ${id} not found.`);
    }

    return post;
  }

  // ✅ Update Post by ID
  async update(id: number, updatePostDto: UpdatePostDto): Promise<Post> {
    const post = await this.findOne(id);

    const updatedPost = Object.assign(post, updatePostDto);
    return this.postRepository.save(updatedPost);
  }

  // ✅ Delete Post by ID
  async remove(id: number): Promise<Post> {
    const post = await this.findOne(id);
    await this.postRepository.remove(post);
    return post;
  }
}
