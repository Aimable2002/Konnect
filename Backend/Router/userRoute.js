import express from 'express'
import { getHistory, getHistory2, getLogUser, getOnPeople, getPeople, getUsersTask } from '../Controller/userController.js';
import { protectRoute } from '../middleware/protectRoute.js';


const router = express.Router();


router.get('/people', protectRoute, getPeople)
router.get('/onPeople', protectRoute, getOnPeople)
router.get('/users-task', protectRoute, getUsersTask)
router.get('/history', protectRoute, getHistory)
router.get('/history/invitee', protectRoute, getHistory2)

router.get('/log/user', protectRoute, getLogUser)


export default router;