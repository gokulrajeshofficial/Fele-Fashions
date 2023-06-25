
const express = require('express')
const router = express.Router()

const authMiddleware = require('../middlewares/authentication')
const inventoryController = require('../controllers/inventoryController')

//----------------------To list Categories ------------------------------//
router.get('/product/categories',authMiddleware , inventoryController.getCategories);

//-------------------List Category Products---------------------------//
router.get('/product/list',authMiddleware , inventoryController.getCategoyProducts)

//-------------------To Add Products -------------------------------//
router.post('/product/save',authMiddleware , inventoryController.addProducts)

module.exports = router;