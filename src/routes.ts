import { Router } from 'express'
import { MessageController } from './controllers/MessageController'
import { GetAllPostController } from './controllers/GetAllPostController'
import { DeletePostController, SavePostController } from './controllers/post'

const router = Router()

// ===== DELETE CONTROLLERS
const messageController = new MessageController()
const getAllPostController = new GetAllPostController()
const savePostController = new SavePostController();
const deletePostController = new DeletePostController();


// ===== DELETE ROUTES
router.get('/', messageController.handle);
router.post('/posts',savePostController.handle);
router.get('/posts', getAllPostController.handle);
router.delete('/posts/:postId', deletePostController.handle);

export { router }
