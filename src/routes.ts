import { Router } from 'express'
import { MessageController } from './controllers/MessageController'
import { GetAllPostController } from './controllers/GetAllPostController'
import { DeletePostController, FindPostController, SavePostController, UpdatePostController } from './controllers/post'
import { ExtractNotesController } from './controllers/ai'

const router = Router()

// ===== POST CONTROLLERS
const messageController = new MessageController()
const savePostController = new SavePostController();
const findPostController = new FindPostController();
const getAllPostController = new GetAllPostController();
const updatePostController = new UpdatePostController();
const deletePostController = new DeletePostController();

// ===== AI POST CONTROLLERS
const extractNotesController = new ExtractNotesController();


// ===== POST ROUTES
router.get('/', messageController.handle);
router.post('/posts', savePostController.handle);
router.get('/posts', getAllPostController.handle);
router.get('/posts/:postId', findPostController.handle);
router.patch('/posts/:postId', updatePostController.handle);
router.delete('/posts/:postId', deletePostController.handle);

// ===== AI POST ROUTES
router.post('/posts/ai', extractNotesController.handle);

export { router };