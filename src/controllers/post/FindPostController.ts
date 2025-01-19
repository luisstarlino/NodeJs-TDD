/*****************************************************************************************
* @Author: Luis Starlino
* @Date: 2025-01-19 08:00
*****************************************************************************************/

// =====
import { Request, Response } from 'express';
import { HttpHelper } from '../../utils';
import { FindPostService } from '../../services/post';

export class FindPostController {
    async handle(req: Request, resp: Response): Promise<Response> {

        // ===== INITAL VALUES
        var repModel = new HttpHelper();
        const { postId } = req.params;

        try {
            const findPostService = new FindPostService({ postId });

            const foundPost = await findPostService.execute();

            if(!foundPost || foundPost == null) repModel.noContent();
            else repModel.ok(foundPost);

        } catch (error) {
            repModel.serverError(error?.message ?? "INTERNAL SERVER ERROR");
        }

        return resp.status(repModel.code).json(repModel.data);
    }
}