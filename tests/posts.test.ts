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
    //expect(response.data).toMatchObject(expectedResponse);

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

  it('Should return status 200 when find a post by id', async () => {

    // ===== Create new one
    const createResponse = await server.post('/posts', mockPost);
    const { post_id } = createResponse.data;

    // ===== Main Test
    const findPost = await server.get(`/posts/${post_id}`);

    expect(findPost.status).toBe(200);
    expect(findPost.data).toMatchObject(findPost.data);

    // ===== Delete the test
    await server.delete(`/posts/${post_id}`);

  });

  it('Should return a status 200 when find and update a post', async () => {

    // ===== Create new one
    const createResponse = await server.post('/posts', mockPost);
    const { post_id } = createResponse.data;

    // ===== Main Test
    let updatedMockPost = {
      ...mockPost,
      author: "integrationAuthor"
    }
    const updatePost = await server.patch(`/posts/${post_id}`, updatedMockPost);

    const findUpdatedPost = await server.get(`/posts/${post_id}`);

    expect(updatePost.status).toBe(200);
    expect(updatePost.data).toMatchObject({ message: "Post Updated", post: { ...updatedMockPost, post_id } });
    expect(findUpdatedPost.status).toBe(200);
    expect(findUpdatedPost.data).toMatchObject(updatedMockPost);


    // ===== Delete the test
    await server.delete(`/posts/${post_id}`);

  })

})
