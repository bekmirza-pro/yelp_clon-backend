const model = require('./model')

module.exports = {
    NEW_REVIEWS: async(req, res) => {
        try {
            try {
                const { name, review, rating } = req.body
                const { id } = req.params

                const newReviews = await model.newReviews(id, name, review, rating)
                res.json(newReviews)
            } catch (err) {
                console.log(err.message);
            }
        } catch (err) {
            console.log(err.message);
        }
    }
}