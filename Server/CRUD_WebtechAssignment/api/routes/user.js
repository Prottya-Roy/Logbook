const express = require('express');
const router = express.Router();
const userController = require('../controllers/user');
const checkAuthJwt = require('../middleWares/auth_jwt');

router.get('/',userController.getAllUsers);
router.get('/byId/:userId',userController.getuserById);
router.get('/auth',checkAuthJwt,userController.authUser);
router.post('/register', userController.registerUser);
router.post('/login',userController.loginUser);
router.post('/check',userController.userNameAvailable);
router.patch('/',checkAuthJwt,userController.updateUser);



module.exports = router;