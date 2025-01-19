/*****************************************************************************************
* @Author: Luis Starlino
* @Date: 2025-01-18 11:53
*****************************************************************************************/



// ===== IMPORTS
import { getMockSinglePost } from '../../__mocks__/getMockSinglePost';
import mockConnection from '../../__mocks__/mockConnection';
import { FindPostService } from './FindPostService';
import { Post } from '../../entities/Post';

// ===== mocking the repository instead of the real repository 
jest.mock('../../repositories/PostRepository')
const postRepositoryMock = require('../../repositories/PostRepository')

describe('FindPostService', () => {
    let findPostService;
    const mockPost: Post = getMockSinglePost();

    beforeEach(async () => {
        await mockConnection.create();
        postRepositoryMock.findByPostId = jest.fn().mockImplementation(() => Promise.resolve(mockPost));
        findPostService = new FindPostService({
            postId: mockPost.post_id,
            postRepository: postRepositoryMock
        })
    });

    afterEach(async () => {
        await mockConnection.close();
    })

    it('Find post by post_id and return the post', async () => {

        const foundPost = await findPostService.execute();

        expect(postRepositoryMock.findByPostId).toHaveBeenCalled();
        expect(foundPost).toMatchObject(mockPost);

    })


})