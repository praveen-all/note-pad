const express=require('express');
const router=express.Router();
const authContoller=require('./../controllers/authContoller');


router.post('/createUser',authContoller.createUser);
router.post('/login',authContoller.login);
router.get('/getuser',authContoller.protect,authContoller.getuser);
module.exports=router;