const Joi = require('joi');
const Restaurant = require('../models/Restaurant');
const getAllRestaurants = async (req, res, next) => {
    //query the db and get all restaurants
    const restaurants = await Restaurant.find();
    if (restaurants.length === 0) {
        throw new Error("No restaurant Found");
    }
    res.status(200).json(restaurants);

}

//add a restaurant to the database
const saveRestaurant = async (req, res, next) => {

    //Validating using Joi
    const RestaurantSchema = Joi.object({
        'name': Joi.string().required(),
        'location': Joi.string().required(),
        'address': Joi.string().required(),
        'owner': Joi.string().required(),
        'customercount': Joi.number().integer().required(),
    });

    //validate
    const { error, value } = RestaurantSchema.validate(req.body, { abortEarly: false });

    if (error) {
        console.log(error);
        throw new Error(error);
    }

    const restaurant = new Restaurant(value);

    const result = await restaurant.save();

    if (!result) {
        throw new Error("Something went wrong, could not create restaurant");
    }
    res.status(200).json(result);
}

const getAParticularRestaurant = async (req, res, next) => {
    const restaurantId = req.params.id;

    const restaurant = await Restaurant.findById(restaurantId);

    if (!restaurant) {
        throw new Error(`Could not find restaurant with id ${restaurantId}`);
    }

    res.status(200).json(restaurant);
}

const updateAParticularRestaurant = async (req, res, next) => {

    const DetailsUserWantsToUpdate = req.body;

    const restaurantId = req.params.id;

    const restaurant = await Restaurant.findById(restaurantId);

    if (!restaurant) {
        throw new Error(`Could not find restaurant with id ${restaurantId}`);
    }

    Object.keys(DetailsUserWantsToUpdate).forEach(key => {
        restaurant[key] = DetailsUserWantsToUpdate[key];
    });

    const result = await restaurant.save();

    if (!result) {
        throw new Error("Something went wrong, could not create restaurant");
    }
    res.status(200).json(result);

}


const deleteAParticularRestaurant = async (req, res, next) => {
    const restaurantId = req.params.id;

    const restaurant = await Restaurant.findByIdAndDelete(restaurantId);

    if (!restaurant) {
       throw new Error("Restaurant not found");
    }

    res.status(200).json({
        message:   `${restaurant.name} deleted successfully`,
    });
}

module.exports = {
    getAllRestaurants,
    saveRestaurant,
    getAParticularRestaurant,
    updateAParticularRestaurant,
    deleteAParticularRestaurant
}

