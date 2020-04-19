DELETE from "public"."user_x_room";
DELETE from "public"."user";
DELETE from "public"."room";

ALTER TABLE "public"."room"
ADD COLUMN current_turn VARCHAR(255) NOT NULL, -- "R" or "B"
ADD COLUMN colors VARCHAR(255) NOT NULL, -- Matrix of "R", "B", "N", and "A"
ADD COLUMN revealed_colors VARCHAR(255) NOT NULL, -- Matrix of true/false
ADD COLUMN words VARCHAR(255) NOT NULL; -- Matrix of strings

ALTER TABLE "public"."user_x_room"
ADD COLUMN role VARCHAR(255) NOT NULL; -- "ASKER" | "GUESSER"
