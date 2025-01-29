/*****************************************************************************************
* @Author: Luis Starlino
* @Date: 2025-01-12 20:30
*****************************************************************************************/

// ===== IMPORTS
import { getMockSinglePost } from '../../__mocks__/getMockSinglePost';
import mockConnection from '../../__mocks__/mockConnection';
import { UpdatePostService } from './UpdatePostService';
import { Post } from '../../entities/Post';

// ===== mocking the repository instead of the real repository 
jest.mock('../../repositories/PostRepository')
const postRepositoryMock = require('../../repositories/PostRepository')

describe('UpdatePostService', () => {

    let updatePostService;
    const mockPost: Post = getMockSinglePost();

    beforeEach(async () => {
        await mockConnection.create();
        postRepositoryMock.findAndUpdate = jest.fn().mockImplementation(() => Promise.resolve(mockPost))
        updatePostService = new UpdatePostService({
            postRepository: postRepositoryMock,
            newValues: mockPost,
            postId: mockPost.post_id
        })
    })

    afterEach(async () => {
        await mockConnection.close();
    })

    it('Find a post by id, update the content and return the element', async () => {

        const updatedPost = await updatePostService.execute();

        expect(postRepositoryMock.findAndUpdate).toHaveBeenCalled();
        expect(updatedPost).toMatchObject(updatedPost);

    });

});