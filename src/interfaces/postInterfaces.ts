import { Post } from "../entities/Post";
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

export interface IFindPostService {
    postRepository?: PostRepository,
    postId: string   
}

export interface IUpdatePostService {
    postRepository?: PostRepository,
    postId: string,
    newValues: Post
}
