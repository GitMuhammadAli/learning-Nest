import { Injectable, NotFoundException } from '@nestjs/common';
import { CreatePostDto } from './dto/create-post.dto';
import { UpdatePostDto } from './dto/update-post.dto';
import { Post } from './interfaces/post.interface';

@Injectable()
export class PostService {
  private posts: Post[] = [
    {
      id: 1,
      title: 'first',
      content: 'first post',
      authorname: 'ali',
    },
  ];

  private nextId = 2;

  create(createPostDto: CreatePostDto): Post {
    const newPost: Post = {
      id: this.nextId++,
      ...createPostDto,
    };
    this.posts.push(newPost);
    return newPost;
  }

  findAll(): Post[] {
    return this.posts;
  }

  findOne(id: number): Post {
    const post = this.posts.find(p => p.id === id);

    if (!post) {
      throw new NotFoundException(`Post with ID ${id} not found.`);
    }

    return post;
  }

  update(id: number, updatePostDto: UpdatePostDto): Post {
    const postIndex = this.posts.findIndex(p => p.id === id);

    if (postIndex === -1) {
      throw new NotFoundException(`Post with ID ${id} not found.`);
    }

    this.posts[postIndex] = { ...this.posts[postIndex], ...updatePostDto };
    return this.posts[postIndex];
  }

  remove(id: number): Post {
    const postIndex = this.posts.findIndex(p => p.id === id);

    if (postIndex === -1) {
      throw new NotFoundException(`Post with ID ${id} not found.`);
    }

    const removedPost = this.posts[postIndex];
    this.posts.splice(postIndex, 1);
    return removedPost;
  }
}
