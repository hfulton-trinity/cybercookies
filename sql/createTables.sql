CREATE TABLE address (
  id SERIAL PRIMARY KEY, 
  street_address varchar(50) NOT NULL, 
  city varchar(40) NOT NULL, 
  state varchar(40) NOT NULL, 
  country varchar(40) NOT NULL, 
  zip integer NOT NULL, 
  apartment_number integer
);

CREATE TABLE troop (
  id SERIAL PRIMARY KEY, 
  number integer NOT NULL, 
  address_id int4 REFERENCES address(id) ON DELETE CASCADE, 
  password varchar(20) NOT NULL, 
  next_restock date NOT NULL, 
  email varchar(40) NOT NULL
);

CREATE TABLE cookie (
  id SERIAL PRIMARY KEY, 
  name varchar(40) NOT NULL, 
  description varchar(1000) NOT NULL
);

CREATE TABLE users (
  id SERIAL PRIMARY KEY, 
  username varchar(20) NOT NULL, 
  password varchar(20) NOT NULL, 
  email varchar(40) NOT NULL, 
  full_name varchar(40) NOT NULL, 
  troop_to_buy_from int
);

CREATE TABLE troop_cookies (
  id SERIAL PRIMARY KEY, 
  troop_id int4 REFERENCES troop(id) ON DELETE CASCADE, 
  cookie_id int4 REFERENCES cookie(id) ON DELETE CASCADE, 
  quantity integer NOT NULL, 
  price double NOT NULL
);

CREATE TABLE troop_cookies (
  id SERIAL PRIMARY KEY, 
  troop_id int4 REFERENCES troop(id) ON DELETE CASCADE, 
  cookie_id int4 REFERENCES cookie(id) ON DELETE CASCADE, 
  quantity integer NOT NULL, 
  price double precision NOT NULL
);

CREATE TABLE transaction (
  id SERIAL PRIMARY KEY, 
  customer_id int4 REFERENCES users(id) ON DELETE CASCADE, 
  seller_id int4 REFERENCES troop(id) ON DELETE CASCADE, 
  delivery_method varchar(40) NOT NULL, 
  delivery_instructions varchar(100), 
  address_id int4 REFERENCES address(id) ON DELETE CASCADE, 
  date_ordered date NOT 
);

CREATE TABLE transaction_cookie (
  id SERIAL PRIMARY KEY, 
  transaction_id int4 REFERENCES transaction(id) ON DELETE CASCADE, 
  cookie_id int4 REFERENCES cookie(id) ON DELETE CASCADE, 
  quantity integer NOT NULL, 
  price double precision NOT NULL
);