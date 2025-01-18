/*****************************************************************************************
* @Author: Luis Starlino
* @Date: 2025-01-05 22:40
*****************************************************************************************/

// ===== IMPORTS
import { getMockSinglePost } from '../../__mocks__/getMockSinglePost';
import { makeMockResponse } from '../../__mocks__/mockResponse';
import { SavePostController } from '../post';
import { Request } from 'express';

// ===== mocking the service instead of call the real one
let mockExecute = jest.fn();


jest.mock('../../services/post/SavePostService', () => {
    return {
        SavePostService: jest.fn().mockImplementation(() => {
            return {
                execute: mockExecute
            }
        })
    }
})

describe('SavePostController', () => {

    const newPostMock = getMockSinglePost();

    it('Should return a status 201 when new post saved', async () => {

        // ===== Arrange
        mockExecute = jest.fn().mockResolvedValue(newPostMock);
        const savePostController = new SavePostController()

        // ===== mocking the request and response
        const request = {
            body: {
                author: newPostMock.author,
                content: newPostMock.content
            }
        } as Request;

        const response = makeMockResponse();

        // ===== Act
        await savePostController.handle(request, response);

        // ===== Assert
        expect(mockExecute).toHaveBeenCalled();
        expect(response.state.json).toMatchObject(newPostMock);
        expect(response.state.status).toBe(201);


    });

    it('Should return a status 400 when body dont have a content', async () => {
        
        // ===== Arrange
        const savePostController = new SavePostController()

        // ===== mocking the request and response
        const request = {
            body: {
                author: newPostMock.author,
                content: ''
            }
        } as Request;

        const response = makeMockResponse();

        // ===== Act
        await savePostController.handle(request, response);

        // ===== Assert
        expect(mockExecute).not.toHaveBeenCalled();
        expect(response.state.json).toMatchObject({error: "content cannot be empyt!"});
        expect(response.state.status).toBe(400);
    })

})