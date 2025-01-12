/*****************************************************************************************
* @Author: Luis Starlino
* @Date: 2025-01-12 23:07
*****************************************************************************************/

// ===== IMPORTS
import { getMockSinglePost } from '../../__mocks__/getMockSinglePost';
import { DeletePostService } from './DeletePostService';
import mockConnection from '../../__mocks__/mockConnection';
import { Post } from '../../entities/Post';

// ===== mocking the repository instead of the real repository 
jest.mock('../../repositories/PostRepository')
const postRepositoryMock = require('../../repositories/PostRepository')

describe('DeletePostService', () => {
    let deletePostService;
    const mockPost: Post = getMockSinglePost();

    beforeEach(async () => {
        await mockConnection.create();
        postRepositoryMock.delete = jest.fn().mockImplementation(() => Promise.resolve(mockPost));
        deletePostService = new DeletePostService({
            postId: mockPost.post_id,
            postRepository: postRepositoryMock
        })
    });

    afterEach(async () => {
        await mockConnection.close();
    })

    it('Find a post by post_id and return the element deleted', async () => {
        const deletedPost = await deletePostService.execute();

        expect(postRepositoryMock.delete).toHaveBeenCalled();
        expect(deletedPost).toMatchObject(mockPost);
    })


})