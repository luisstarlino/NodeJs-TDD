/*****************************************************************************************
* @Author: Luis Starlino
* @Date: 2025-01-25 20:55
*****************************************************************************************/

// ===== IMPORTS
import { PostRepository } from "../../repositories/PostRepository";
import { IUpdatePostService } from "../../interfaces";
import { getCustomRepository } from "typeorm";
import { Post } from "../../entities/Post";

export class UpdatePostService {
    private _postRepository: PostRepository;
    private _updatedPost: Post;
    private _postId: string;

    constructor({
        postRepository = getCustomRepository(PostRepository),
        postId,
        newValues
    }: IUpdatePostService) {
        this._postId = postId,
        this._postRepository = postRepository,
        this._updatedPost = newValues
    }

    async execute(): Promise<Post> {
        return await this._postRepository.findAndUpdate(this._postId, {
            author: this._updatedPost.author,
            content: this._updatedPost.content,
        })
    }
}