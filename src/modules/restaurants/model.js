const { fetch, fetchAll } = require('../../../lib/postgres');

const RESTAURANTS = `
    SELECT
      *
   FROM
       restaurants
   LEFT JOIN
   (select restaurants_id, COUNT(*), TRUNC(AVG(rating), 1) as average_rating from reviews group by restaurants_id)
   reviews on restaurants.restaurant_id = reviews.restaurants_id;    
`

const REVIEWS = `
   SELECT
      *
   FROM
       reviews
   WHERE restaurants_id = $1;
`

const RESTAURANT_RATING = `
   SELECT
      *
   FROM
       restaurants
   LEFT JOIN
   (select restaurant_id, COUNT(*), TRUNC(AVG(rating), 1) as average_rating from reviews group by restaurant_id)
   reviews on restaurants.restaurant_id = reviews.restaurant_id    
   WHERE restaurants.restaurant_id = $1;
`

const RESTAURANT = `
SELECT
*
FROM
 restaurants
LEFT JOIN
(select restaurants_id, COUNT(*), TRUNC(AVG(rating), 1) as average_rating from reviews group by restaurants_id)
reviews on restaurants.restaurant_id = reviews.restaurants_id
WHERE restaurants.restaurant_id = $1;  
`

const NEW_RESTAURANT = `
   INSERT INTO
          restaurants(restaurant_name, location, price_range)
   VALUES($1, $2, $3)
   RETURNING *
`

const UPDATE_RESTAURANT = `
   UPDATE
          restaurants SET restaurant_name = $1, location = $2, price_range = $3
   WHERE restaurant_id = $4       
   RETURNING *
`

const DELETE_RESTAURANT = `
   DELETE
   FROM
       restaurants
   WHERE restaurant_id = $1
   RETURNING *
`

const restaurants = () => fetchAll(RESTAURANTS)
const review = (id) => fetchAll(REVIEWS, id)
const rating = (id) => fetchAll(RESTAURANT_RATING, id)
const restaurant = (restaurantID) => fetch(RESTAURANT, restaurantID)

const newRestaurant = (restaurantName, location, priceRange) => fetch(
    NEW_RESTAURANT,
    restaurantName,
    location,
    priceRange
)

const UpdateRestaurant = (restaurantName, location, priceRange, restaurantID) => fetch(
    UPDATE_RESTAURANT,
    restaurantName,
    location,
    priceRange,
    restaurantID
)

const DeleteRestaurant = (restaurantID) => fetch(DELETE_RESTAURANT, restaurantID)

module.exports = {
    restaurants,
    review,
    rating,
    restaurant,
    newRestaurant,
    UpdateRestaurant,
    DeleteRestaurant
}