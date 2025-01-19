/*****************************************************************************************
* @Author: Luis Starlino
* @Date: 2025-01-18 16:15
*****************************************************************************************/

// ===== IMPORTS
import { PostRepository } from "../../repositories/PostRepository";
import { IFindPostService } from "../../interfaces";
import { getCustomRepository } from "typeorm";
import { Post } from "../../entities/Post";

export class FindPostService {
    private _postRepository: PostRepository;
    private _postId: string;

    constructor({
        postRepository = getCustomRepository(PostRepository), 
        postId
    } : IFindPostService) {
        this._postRepository = postRepository,
        this._postId = postId
    }

    async execute(): Promise<Post> {
        return await this._postRepository.findByPostId(this._postId);
    }
}