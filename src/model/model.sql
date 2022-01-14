CREATE TABLE yelp;

CREATE TABLE restaurants(
    restaurant_id BIGSERIAL NOT NULL PRIMARY KEY,
    restaurant_name VARCHAR(50) NOT NULL,
    location VARCHAR(50) NOT NULL,
    price_range INT NOT NULL check(price_range >= 1 and price_range <= 5)
);

INSERT INTO restaurants (restaurant_name, location, price_range) VALUES ('Nur', 'Toshkent', 3);
INSERT INTO restaurants (restaurant_name, location, price_range) VALUES ('McDonalds', 'New York', 2);

CREATE TABLE reviews (
    id BIGSERIAL NOT NULL PRIMARY KEY,
    restaurants_id INT,
   CONSTRAINT fk_restaurant
      FOREIGN KEY(restaurants_id) 
	  REFERENCES restaurants(restaurant_id)
	  ON DELETE CASCADE,
    name VARCHAR(50) NOT NULL,
    review TEXT NOT NULL,
    rating INT NOT NULL check(
        rating >= 1
        and rating <= 5
    )
);

INSERT INTO reviews (restaurants_id, name, review, rating) VALUES (2, 'Jhon', 'bad restaurant', 2);
INSERT INTO reviews (restaurants_id, name, review, rating) VALUES (1, 'Bekmirza', 'good restaurant', 4);
INSERT INTO reviews (restaurants_id, name, review, rating) VALUES (1, 'Sit', 'bad restaurant', 3);
INSERT INTO reviews (restaurants_id, name, review, rating) VALUES (1, 'Ilon', 'bad restaurant', 1);


select *
from restaurants
    left join(
        select restaurants_id,
            count(*),
            TRUNC(AVG(rating, 1)) as average_rating
        from reviews
        group by restaurants_id
    ) reviews on restaurants.restaurant_id = reviews.restaurant_id;