/*****************************************************************************************
* @Author: Luis Starlino
* @Date: 2025-01-19 07:56
*****************************************************************************************/

// ===== IMPORTS
import { getMockSinglePost } from "../../__mocks__/getMockSinglePost";
import { makeMockResponse } from "../../__mocks__/mockResponse";
import { FindPostController } from './index';
import { Request } from 'express';

// ===== mocking the service instead of call the real one
let mockExecute = jest.fn();


jest.mock('../../services/post/FindPostService', () => {
    return {
        FindPostService: jest.fn().mockImplementation(() => {
            return {
                execute: mockExecute
            }
        })
    }
})

describe('FindPostController', () => {
    const foundPost = getMockSinglePost();

    it('Should return a status 200 when the post was found by id', async () => {
        // ===== Arrange
        mockExecute = jest.fn().mockResolvedValue(foundPost);
        const findPostController = new FindPostController();

        // ===== mocking the request and response
        const request = {
            params: { postId: foundPost.post_id },
            get: jest.fn(),
        } as Partial<Request> as Request;


        const response = makeMockResponse();

        // ===== Act
        await findPostController.handle(request, response);

        // ===== Assert
        expect(mockExecute).toHaveBeenCalled();
        expect(response.state.json).toMatchObject(foundPost);
        expect(response.state.status).toBe(200);

    })
});