/*****************************************************************************************
* @Author: Luis Starlino
* @Date: 2025-01-05 17:42
*****************************************************************************************/

// ===== IMPORTS
import { PostRepository } from "../../repositories/PostRepository";
import type { ISavePostService } from "../../interfaces";
import { getCustomRepository } from "typeorm";
import { Post } from "../../entities/Post";



export class SavePostService {
    private _postRepository: PostRepository
    private _post: Post;

    constructor({
        postRepository = getCustomRepository(PostRepository),
        author,
        content
    }: ISavePostService) {
        this._postRepository = postRepository
        this._post = new Post(author, content)

    }

    async execute(): Promise<Post> {
        return await this._postRepository.save(this._post);
    }

}