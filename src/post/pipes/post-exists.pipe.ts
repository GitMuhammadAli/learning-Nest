import {
  ArgumentMetadata,
  Injectable,
  NotFoundException,
  PipeTransform,
} from '@nestjs/common';
import { PostService } from '../post.service';
import { NotFoundError } from 'rxjs';

@Injectable()
export class PostExitsPipe implements PipeTransform {
  constructor(private readonly PostService: PostService) {}

  transform(value: any, metadata: ArgumentMetadata) {
    try {
      this.PostService.findOne(value);
    } catch (error) {
      throw new NotFoundException(`Post id ${value} no Found`);
    }
    return value;
  }
}
