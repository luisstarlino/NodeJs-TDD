import axios from 'axios'
import createConnection from '../src/database/index';

const server = axios.create({
  baseURL: 'http://localhost:5001/v1'
})

describe('/posts', () => {


  // ===== CONSTS
  const mockPost = {
    "author": "luis@starlino.com",
    "content": "integration test"
  }

  it('Should return status 200 and list of posts', async () => {
    const expectedResponse = [
      {
        post_id: 'b0f3d72a-b8a9-45ec-a8f0-a14f65f3597d',
        author: 'some@email.dio',
        content: 'Some tuit about that'
      },
      {
        post_id: '11f8ad35-c86c-49dc-9c8b-ef31cb1e758f',
        author: 'user@dio.me',
        content: 'User about DIO'
      }
    ]

    const response = await server.get('/posts');
    expect(response.status).toBe(200);
    expect(response.data).toMatchObject(expectedResponse);

  })

  // @LuisStarlino
  it('Should return status 200 when post saved', async () => {
    const response = await server.post('/posts', mockPost)

    // TODO: Make the correct integration with the delete route!
    const connection = await createConnection();
    await connection.query(`DELETE FROM posts WHERE post_id = '${response.data.post_id}'`);
    await connection.close();

    expect(response.status).toBe(201);
    expect(response.data).toMatchObject({
      "author": "luis@starlino.com",
      "content": "integration test"
    });
  })

  it('Should return status 200 when delete a post', async () => {
    const createResponse = await server.post('/posts', mockPost);

    const deleteResp = await server.delete(`/posts/${createResponse.data?.post_id}`);

    expect(deleteResp.status).toBe(200);
    expect(deleteResp.data).toMatchObject({
      "message": "Post deleted!",
      "postDeleted": {
        ...mockPost,
        post_id: createResponse.data?.post_id
      }
    });


  });
})
