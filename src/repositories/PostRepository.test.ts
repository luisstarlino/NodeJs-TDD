import { Post } from '../entities/Post'
import getManagerMock from '../__mocks__/getEntityManagerMock'
import { getMockContentList } from '../__mocks__/mockContentList'
import { getMockSinglePost } from '../__mocks__/getMockSinglePost'
import { PostRepository } from './PostRepository'

describe('PostRepository', () => {
  const mockPostList: Post[] = getMockContentList()

  it('should call getAll method and return all posts', async () => {
    const managerMock = await getManagerMock({
      findReturn: mockPostList
    })

    const postRepository = new PostRepository(managerMock)

    const result = await postRepository.getAll()

    expect(managerMock.find).toHaveBeenCalled()
    expect(result).toMatchObject(mockPostList)
  });

  it('should call save method and return a new post', async () => {

    // ===== ARRANGE
    const mockPost = getMockSinglePost();

    const managerMock = await getManagerMock({ saveReturn: mockPost });

    const postRepository = new PostRepository(managerMock);

    // ===== ACT
    const result = await postRepository.save(mockPost);

    // ==== ASSERT
    expect(managerMock.save).toHaveBeenCalled();
    expect(result).toMatchObject(mockPost);

  });

  it('Should call deleted method, receive the post_id and return the deleted post', async () => {

    // ===== ARRANGE
    const mockPost = getMockSinglePost();

    const managerMock = await getManagerMock({ deleteReturn: mockPost, findOneReturn: mockPost });

    const postRepository = new PostRepository(managerMock);

    // ===== ACT
    const result = await postRepository.delete(mockPost.post_id);

    // ==== ASSERT
    expect(managerMock.findOne).toHaveBeenCalled();
    expect(managerMock.delete).toHaveBeenCalled();
    expect(result).toMatchObject(mockPost);


  })
})
