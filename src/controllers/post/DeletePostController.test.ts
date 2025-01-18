/*****************************************************************************************
* @Author: Luis Starlino
* @Date: 2025-01-12 12:30
*****************************************************************************************/

// ===== IMPORTS
import { getMockSinglePost } from "../../__mocks__/getMockSinglePost";
import { makeMockResponse } from "../../__mocks__/mockResponse";
import { DeletePostController } from './index';
import { Request } from 'express';

// ===== mocking the service instead of call the real one
let mockExecute = jest.fn();

jest.mock('../../services/post/DeletePostService', () => {
    return {
        DeletePostService: jest.fn().mockImplementation(() => {
            return {
                execute: mockExecute
            }
        })
    }
})

describe('DeletePostController', () => {
    const deletedPost = getMockSinglePost();

    it('Should return a status 200 when the post was found and deleted', async () => {
        // ===== Arrange
        mockExecute = jest.fn().mockResolvedValue(deletedPost);
        const deletePostoController = new DeletePostController();

        // ===== mocking the request and response
        const request = {
            params: { postId: "123" },
            get: jest.fn(),
        } as Partial<Request> as Request;
        

        const response = makeMockResponse();

        // ===== Act
        await deletePostoController.handle(request, response);

        // ===== Assert
        expect(mockExecute).toHaveBeenCalled();
        expect(response.state.json).toMatchObject({message: "Post deleted!", postDeleted: deletedPost});
        expect(response.state.status).toBe(200);

    })
});