import express from "express"
import getUsers from "../controller/user.controller.js";
import verifyToken from "../middleware/verifyToken.js";


const router = express.Router();

router.get('/' , verifyToken ,  getUsers)


export default router;