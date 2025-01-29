/*****************************************************************************************
* @Author: Luis Starlino
* @Date: 2025-01-29 19:50
*****************************************************************************************/

import { Request, Response } from "express";
import { HttpHelper } from "../../utils";
import { UpdatePostService } from "../../services/post";

export class UpdatePostController {
    async handle(req: Request, resp: Response): Promise<Response> {

        var responseModel = new HttpHelper();
        const { content, author } = req.body;
        const { postId } = req.params;

        try {

            const postService = new UpdatePostService({
                postId: postId,
                newValues: {
                    content,
                    author,
                    post_id: postId
                }
            });

            const postUpdated = await postService.execute();

            if(postUpdated === null) responseModel.noContent("Post not found!");
            else responseModel.ok({message: "Post Updated", post: postUpdated});

        } catch (error) {
            console.error("--- UPDATE POST CONTROLLER ERROR ---");
            console.error(error);
            responseModel.serverError(error.toString());
        }


        return resp.json(responseModel.data).status(responseModel.code);
    }
}
