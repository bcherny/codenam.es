DELETE from "public"."user_x_room";
DELETE from "public"."user";
DELETE from "public"."room";

ALTER TABLE "public"."user_x_room"
ADD COLUMN color VARCHAR(255) NOT NULL; -- "R" | "B"
