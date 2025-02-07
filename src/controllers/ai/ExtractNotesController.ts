/*****************************************************************************************
* @Author: Luis Starlino
* @Date: 2025-02-02 18:00
*****************************************************************************************/

// ===== IMPORTS
import { Request, Response } from "express";
import { HttpHelper } from "../../utils";
import { ExtractNotesService } from "../../services/ai";

export class ExtractNotesController {

    async handle(req: Request, resp: Response): Promise<Response> {

        // ==== INITAL VALUES
        var responseModel = new HttpHelper();
        const { content, author } = req.body;


        try {

            if (!content || !author) responseModel.badRequest("content and author can't be null");
            else {


                const serviceAI = new ExtractNotesService({ content, author });
                const responseAI = await serviceAI.execute();



                if (responseAI) responseModel.ok({ message: `All done, created ${responseAI.length} ${responseAI.length == 1 ? 'task' : 'tasks'}`, tasks: responseAI })
                else responseModel.noContent();
            }


        } catch (error) {
            responseModel.serverError(error?.toString());
        }

        return resp.status(responseModel.code).json(responseModel.data);
    }
}