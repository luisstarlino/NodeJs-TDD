/*****************************************************************************************
* @Author: Luis Starlino
* @Date: 2025-01-05 17:50
*****************************************************************************************/

// ===== IMPORTS
import { getMockSinglePost } from '../../__mocks__/getMockSinglePost';
import mockConnection from '../../__mocks__/mockConnection';
import { SavePostService } from './SavePostService';
import { Post } from '../../entities/Post';
import { PostRepository } from '../../repositories/PostRepository';

// ===== setting to use mock instead off repository 
jest.mock('../../repositories/PostRepository')
const postRepositoryMock = require('../../repositories/PostRepository')


describe('SavePostService', () => {
    let savePostService;
    const mockPost: Post = getMockSinglePost();

    beforeEach(async () => {
        await mockConnection.create();
        postRepositoryMock.save = jest.fn().mockImplementation(() => Promise.resolve(mockPost));
        savePostService = new SavePostService({
            postRepository: postRepositoryMock,
            author: mockPost.author,
            content: mockPost.content
        })
    })

    afterEach(async () => {
        await mockConnection.close()
    })

    it('Create a new post and returm', async () => {
        const newPost = await savePostService.execute();

        expect(postRepositoryMock.save).toHaveBeenCalled();
        expect(newPost).toMatchObject(mockPost);
    });

});