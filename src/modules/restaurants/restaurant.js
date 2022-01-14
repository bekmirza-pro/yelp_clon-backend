const model = require('./model')

module.exports = {
    RESTAURANTS: async(req, res) => {
        try {
            const restaurants = await model.restaurants()
            res.json(restaurants)
        } catch (err) {
            console.log(err.message);
        }
    },
    RESTAURANT: async(req, res) => {
        try {
            const { id } = req.params
            const restaurant = await model.restaurant(id)
            const review = await model.review(id)

            res.json({ restaurant, review })

        } catch (err) {
            console.log(err.message);
        }
    },
    NEW_RESTAURANT: async(req, res) => {
        try {
            try {
                const { restaurantName, location, priceRange } = req.body
                const newRestaurant = await model.newRestaurant(restaurantName, location, priceRange)
                res.json(newRestaurant)
            } catch (err) {
                console.log(err.message);
            }
        } catch (err) {
            console.log(err.message);
        }
    },
    UPDATE_RESTAURANT: async(req, res) => {
        try {
            try {
                const { restaurantName, location, priceRange } = req.body
                const { id } = req.params

                const UpdateRestaurant = await model.UpdateRestaurant(restaurantName, location, priceRange, id)
                res.json(UpdateRestaurant)
            } catch (err) {
                console.log(err.message);
            }
        } catch (err) {
            console.log(err.message);
        }
    },
    DELETE_RESTAURANT: async(req, res) => {
        try {
            const { id } = req.params

            const DeleteRestaurant = await model.DeleteRestaurant(id)
            res.json(DeleteRestaurant)
        } catch (err) {
            console.log(err.message);
        }
    }

}