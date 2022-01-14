const { fetch, fetchAll } = require('../../../lib/postgres');



const NEW_REVIEWS = `
   INSERT INTO
          reviews( restaurants_id, name, review, rating)
   VALUES($1, $2, $3, $4)
   RETURNING *
`

const newReviews = (id, name, review, rating) => fetch(
    NEW_REVIEWS,
    id,
    name,
    review,
    rating
)


module.exports = {
    newReviews
}