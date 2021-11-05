CREATE TYPE "movie_rank" AS ENUM (
  '1',
  '2',
  '3',
  '4',
  '5'
);
CREATE EXTENSION IF NOT EXISTS "uuid-ossp";

CREATE TABLE "users" (
  "id" uuid DEFAULT uuid_generate_v4() PRIMARY KEY NOT NULL,
  "first_name" varchar NOT NULL,
  "last_name" varchar NOT NULL,
  "password" varchar NOT NULL,
  "email" varchar UNIQUE NOT NULL
);

CREATE TABLE "user_favorites" (
  "id" uuid DEFAULT uuid_generate_v4() PRIMARY KEY NOT NULL,
  "user_id" uuid NOT NULL,
  "movie_id" integer  NOT NULL,
  "rank" movie_rank NOT NULL
);

ALTER TABLE "user_favorites" ADD FOREIGN KEY ("user_id") REFERENCES "users" ("id");

-- CREATE TABLE "movies" (
--   "id" uuid DEFAULT uuid_generate_v4() PRIMARY KEY NOT NULL,
--   "description" varchar,
--   "title" varchar NOT NULL,
--   "tmdb_id" bigint UNIQUE NOT NULL,
--   "poster_path" varchar
-- );


-- ALTER TABLE "movies" ADD FOREIGN KEY ("id") REFERENCES "user_favorites" ("movie_id");


-- UPDATE 
--   user_favorites AS uf 
-- SET 
--   movie_id = vals.m
-- FROM
--   (VALUES
--   (123, '1'),
--   (456, '2'),
--   (456, '3'),
--   (456, '4'),
--   (456, '5')
--   ) AS vals(m, r)
-- WHERE 
--   user_id = '1e618189-1c46-441d-ae26-0f46f2b1ca77' AND rank = vals.r;