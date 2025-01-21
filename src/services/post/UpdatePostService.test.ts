/*****************************************************************************************
* @Author: Luis Starlino
* @Date: 2025-01-12 20:30
*****************************************************************************************/

// ===== IMPORTS
import { getMockSinglePost } from '../../__mocks__/getMockSinglePost';
import mockConnection from '../../__mocks__/mockConnection';
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
    })
});