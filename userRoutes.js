import { createUser } from "../Controller/userController.js";
import express from 'express'
const router = express.Router();

router.post('/createuser',createUser);


export default router;