import { PostRepository } from "../repositories/PostRepository";

export interface ISavePostService {
    postRepository?: PostRepository,
    author: string,
    content: string
}

export interface IDeletePostService {
    postRepository?: PostRepository,
    postId: string   
}