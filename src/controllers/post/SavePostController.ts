/*****************************************************************************************
* @Author: Luis Starlino
* @Date: 2025-01-05 18:50
*****************************************************************************************/

// ===== IMPORTS
import { Request, Response } from 'express';
import { SavePostService } from '../../services/post';

export class SavePostController {
    async handle(req: Request, resp: Response): Promise<Response> {

        const { author, content } = req.body;

        if(content.length == 0 ) return resp.status(400).json({error: "content cannot be empyt!"});


        try {

            const savePostService = new SavePostService({ author, content });
            const newPostCreated = await savePostService.execute();

            return resp.status(201).json(newPostCreated);
        } catch (error) {
            return resp.status(500).json({ message: 'Error' })

        }


    }
}