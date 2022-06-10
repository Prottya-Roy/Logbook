const express = require('express');
const router = express.Router();
const blogController = require('../controllers/blog');
const checkAuthJwt = require('../middleWares/auth_jwt');
const checkAuthUploader = require('../middleWares/auth_uploader');

router.get('/',blogController.getAllBlogs);
router.get('/:blogID',blogController.getBlogsById);
router.get('/from/:blogUploader',blogController.getBlogsByUser);
router.post('/',checkAuthJwt,blogController.addBlog);
router.patch('/:blogEdit',checkAuthJwt,checkAuthUploader,blogController.EditBlog);
router.delete('/:blogDelete', checkAuthJwt,checkAuthUploader,blogController.deleteBlog);


module.exports = router;