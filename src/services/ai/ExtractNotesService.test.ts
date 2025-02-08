/*****************************************************************************************
* @Author: Luis Starlino
* @Date: 2025-01-31 19:41
*****************************************************************************************/

// ===== IMPORTS
import OpenAI from "openai";
import { SavePostService } from '../post';
import { ExtractNotesService } from './ExtractNotesService';
import mockConnection from "../../__mocks__/mockConnection";
import { Post } from "../../entities/Post";
import { getMockSinglePost } from "../../__mocks__/getMockSinglePost";

// ===== mocking the repository instead of the real repository 
jest.mock("openai");
jest.mock('../../repositories/PostRepository');
const postRepositoryMock = require('../../repositories/PostRepository');

describe('ExtractNotesFromTextSerice', () => {
    let extractNotesService: ExtractNotesService;
    const mockPost: Post = getMockSinglePost();
    let savePostService: SavePostService;
    let mockOpenAI: jest.Mocked<OpenAI>;




    beforeEach(async () => {
        await mockConnection.create();
        postRepositoryMock.save = jest.fn().mockImplementation(() => Promise.resolve(mockPost));
        savePostService = new SavePostService({
            postRepository: postRepositoryMock,
            author: mockPost.author,
            content: mockPost.content
        })

        // ===== MOCK THE OPENAI INSTANCE
        mockOpenAI = new OpenAI({ apiKey: process.env.OPENAI_API_KEY }) as jest.Mocked<OpenAI>

        // ===== INICIALIZE THE SERVICE WITH MOCKS
        extractNotesService = new ExtractNotesService({
            content: "Tomorrow i need go to supermarket and pick up my children in the school", author: "luisTest@test.ai.com"
        });

        // ===== MOCK OPENAI RESPONSE
        (mockOpenAI.chat.completions.create as jest.Mock).mockResolvedValue({
            choices: [
                {
                    message: {
                        content: JSON.stringify({ tasks: [{ content: 'Go to supermarket' }, { content: 'Pick up kid from school' }] })
                    }
                }
            ]
        })


    });

    // it('Generate a post by a random text and return a created post', async () => {
    //     const extractNotes = await extractNotesService;
    // })
})