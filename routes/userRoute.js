const userController = require('../controllers/userController')
const express = require('express')
const router = express.Router();

router.post('/adduser', userController.createUser)
router.get('/alluser',userController.getAll)
router.get('/getone',userController.getOne)
router.patch('/changepassword/:id',userController.changepassowrd)

module.exports = router