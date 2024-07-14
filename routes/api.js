const express = require('express');
const {
    getAllRestaurants,
    saveRestaurant,
    getAParticularRestaurant,
    updateAParticularRestaurant,
    deleteAParticularRestaurant
} = require('../controllers/restaurantController');
const { tryCatch } = require('../utils/tryCatch');


//initialize the router
const router = express.Router();

//register all our routes

router.get('/', tryCatch(getAllRestaurants));
router.post('/', tryCatch(saveRestaurant));
router.get('/:id', tryCatch(getAParticularRestaurant));
router.patch('/:id', tryCatch(updateAParticularRestaurant));
router.delete('/:id', tryCatch(deleteAParticularRestaurant));


module.exports = router;