CREATE TABLE "public"."user" (
  id SERIAL PRIMARY KEY NOT NULL,
  name VARCHAR(255),
  pic VARCHAR(255)
);

CREATE TABLE "public"."room" (
  id SERIAL PRIMARY KEY NOT NULL,
  room_id VARCHAR(255) UNIQUE NOT NULL,
  state VARCHAR(255) NOT NULL,
  time_created TIMESTAMP NOT NULL DEFAULT now()
);

CREATE TABLE "public"."user_x_room" (
  id SERIAL PRIMARY KEY NOT NULL,
  state VARCHAR(255) NOT NULL,
  room_id INTEGER NOT NULL,
  user_id INTEGER NOT NULL,
  FOREIGN KEY (room_id) REFERENCES "public"."room"(id),
  FOREIGN KEY (user_id) REFERENCES "public"."user"(id)
);
