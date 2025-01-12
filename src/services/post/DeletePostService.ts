/*****************************************************************************************
* @Author: Luis Starlino
* @Date: 2025-01-12 07:55
*****************************************************************************************/

// ===== IMPORTS
import  { PostRepository } from "../../repositories/PostRepository";
import type { IDeletePostService } from "../../interfaces";
import { getCustomRepository } from "typeorm";
import { Post } from "../../entities/Post";

export class DeletePostService {
    private _postRepository: PostRepository;
    private _postId: string

    constructor({
        postRepository = getCustomRepository(PostRepository),
        postId,
    } : IDeletePostService) {
        this._postId = postId,
        this._postRepository = postRepository
    }

    async execute(): Promise<Post> {
        return await this._postRepository.delete(this._postId);
    }
}