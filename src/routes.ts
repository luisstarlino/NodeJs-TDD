import { Router } from 'express'
import { MessageController } from './controllers/MessageController'
import { GetAllPostController } from './controllers/GetAllPostController'
import { DeletePostController, FindPostController, SavePostController } from './controllers/post'

const router = Router()

// ===== DELETE CONTROLLERS
const messageController = new MessageController()
const savePostController = new SavePostController();
const findPostController = new FindPostController();
const getAllPostController = new GetAllPostController()
const deletePostController = new DeletePostController();


// ===== DELETE ROUTES
router.get('/', messageController.handle);
router.post('/posts',savePostController.handle);
router.get('/posts', getAllPostController.handle);
router.get('/posts/:postId', findPostController.handle);
router.delete('/posts/:postId', deletePostController.handle);

export { router }
