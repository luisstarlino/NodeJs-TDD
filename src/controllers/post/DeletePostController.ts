/*****************************************************************************************
* @Author: Luis Starlino
* @Date: 2025-01-12 17:15
*****************************************************************************************/

import { Request, Response } from 'express';
import { HttpHelper } from '../../utils';
import { DeletePostService } from '../../services/post';

export class DeletePostController {
    async handle(req: Request, resp: Response): Promise<Response> {

        // ===== INITAL VALUES
        var repModel = new HttpHelper();
        const { postId } = req.params;

        
        try {

            const deletePostService = new DeletePostService({ postId });
            const postDeleted = await deletePostService.execute();

            if(postDeleted == null) repModel.noContent("Not found post with this ID");
            else repModel.ok({message: "Post deleted!", postDeleted});


        } catch (error) {
            repModel.serverError(error?.message ?? "INTERNAL SERVER ERROR");
        }

        return resp.status(repModel.code).json(repModel.data);
    }
}