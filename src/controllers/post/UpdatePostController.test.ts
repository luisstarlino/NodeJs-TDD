/*****************************************************************************************
* @Author: Luis Starlino
* @Date: 2025-01-25 21:05
*****************************************************************************************/

// ===== IMPORTS
import { getMockSinglePost } from "../../__mocks__/getMockSinglePost";
import { makeMockResponse } from "../../__mocks__/mockResponse";
import { UpdatePostController } from "./UpdatePostController";
import { Request } from 'express';

// ===== mocking the service instead of call the real one
let mockExecute = jest.fn();

jest.mock('../../services/post/UpdatePostService', () => {
    return {
        UpdatePostService: jest.fn().mockImplementation(() => {
            return {
                execute: mockExecute
            }
        })
    }
})

describe('UpdatePostController', () => {
    const updatedPost = getMockSinglePost();

    it('Should return a status 200 when the post was found and updated', async () => {

        // ===== Arrange
        mockExecute = jest.fn().mockResolvedValue(updatedPost);
        const updatePostController = new UpdatePostController();

        // ===== moching the request and response
        const request = {
            params: {postId: updatedPost.post_id},
            body: {
                newPost: updatedPost
            }
        } as Partial<Request> as Request;

        const response = makeMockResponse();

        // ===== Act
        await updatePostController.handle(request, response);

        // ===== Assert
        expect(mockExecute).toHaveBeenCalled();
        expect(response.state.json).toMatchObject({message: "Post Updated", post: updatedPost});
        expect(response.state.status).toBe(200);
    })
})