const router = require('express').Router()
const authController = require('../controllers/auth.controller');
const userController = require('../controllers/user.controller')

router.post('/register', authController.signUp)
router.get('/', userController.getAllUser)
router.get('/:id', userController.getUserInfo);
router.put("/:id", userController.updateUser );
router.delete("/:id" , userController.deleteUser);
module.exports = router