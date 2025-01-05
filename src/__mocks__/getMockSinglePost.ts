/*****************************************************************************************
* @Author: Luis Starlino
* @Date: 2023-05-03 22:53
*****************************************************************************************/

// ===== IMPORTS
import { Post } from '../entities/Post';
import { v4 as uuid } from 'uuid';

export const getMockSinglePost = (): Post => (
    {
        post_id: uuid(),
        author: 'mock@email.com',
        content: 'mock test luis-starlino'
    }
)
