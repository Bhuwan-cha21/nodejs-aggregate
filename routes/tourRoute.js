const tourController = require('../controllers/tourController')
const express = require('express')
const router = express.Router();

router.post('/addtour', tourController.createTour)
router.get('/alltour',tourController.getAll)
router.get('/getone',tourController.getOne)
router.get('/getdata',tourController.getTourStats)
router.get('/getmontlyplan/:year',  tourController.getMonthlyPlan)

module.exports = router