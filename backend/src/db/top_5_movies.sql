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

CREATE TABLE "movies" (
  "id" uuid DEFAULT uuid_generate_v4() PRIMARY KEY NOT NULL,
  "description" varchar,
  "title" varchar NOT NULL,
  "movie_id" varchar NOT NULL
);

CREATE TABLE "user_favorites" (
  "id" uuid DEFAULT uuid_generate_v4() PRIMARY KEY NOT NULL,
  "user_id" uuid UNIQUE NOT NULL,
  "movie_id" uuid UNIQUE NOT NULL,
  "rank" movie_rank NOT NULL
);

ALTER TABLE "user_favorites" ADD FOREIGN KEY ("user_id") REFERENCES "users" ("id");

ALTER TABLE "movies" ADD FOREIGN KEY ("id") REFERENCES "user_favorites" ("movie_id");
