import { EntityRepository, EntityManager } from 'typeorm'
import { Post } from '../entities/Post'

@EntityRepository(Post)
export class PostRepository {
  private manager: EntityManager;

  constructor(manager: EntityManager) {
    this.manager = manager
  }

  getAll = async (): Promise<Array<Post>> => {
    const posts: Post[] = await this.manager.find(Post)
    return posts
  }

  //@LuisStarlino 2025-01-05
  save = async (newP: Post): Promise<Post> => {
    const newPost: Post = await this.manager.save(newP);
    return newPost;
  }

  //@LuisStarlino 2025-01-11
  delete = async (post_id: string): Promise<Post> => {

    // ===== FIND FIRST
    const postToDelete = await this.manager.findOne(Post, { where: { post_id } });

    if(!postToDelete) return null;

    await this.manager.delete(Post, {post_id});

    return postToDelete;

  }

}
