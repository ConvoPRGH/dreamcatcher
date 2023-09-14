CREATE TABLE bins (
  id int PRIMARY KEY GENERATED ALWAYS AS IDENTITY,
  name varchar(100) NOT NULL,
  created_at timestamp NOT NULL,
  bin_path varchar(50) UNIQUE NOT NULL
);

CREATE TABLE requests (
  id int PRIMARY KEY GENERATED ALWAYS AS IDENTITY,
  bin_path varchar(100) REFERENCES bins(bin_path) ON DELETE CASCADE,
  mongo_id varchar(100) UNIQUE NOT NULL,
  received_at timestamp NOT NULL,
  http_method varchar(20) NOT NULL,
  http_path text NOT NULL
);
