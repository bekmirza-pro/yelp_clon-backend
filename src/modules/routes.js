const { Router } = require('express')
const Restaurants = require('./restaurants/restaurant')
const Reviews = require("./reviews/reviews")

const router = new Router()

router
    .get('/api/v1/restaurants', Restaurants.RESTAURANTS)
    .get('/api/v1/restaurants/:id', Restaurants.RESTAURANT)
    .post('/api/v1/restaurants', Restaurants.NEW_RESTAURANT)
    .post('/api/v1/restaurants/:id/addReview', Reviews.NEW_REVIEWS)
    .put('/api/v1/restaurants/:id', Restaurants.UPDATE_RESTAURANT)
    .delete('/api/v1/restaurants/:id', Restaurants.DELETE_RESTAURANT)


module.exports = router